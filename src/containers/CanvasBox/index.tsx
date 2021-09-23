/**
 * 畫布區塊
 */
import { useEffect, useState, useRef, useCallback } from "react";
import { Wrapper, MainCanvas } from "./style";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeColorState, toolState } from "../../data/atom";
import roundRect from "../../utils/roundRect";
import pickColor from "../../utils/pickColor";
import drawOval from "../../utils/drawOval";

interface pointIF {
  x?: number | undefined;
  y?: number | undefined;
}
let lastPoint: { x?: number; y?: number } | null = {}; // 滑鼠移動的上一個點
let pointsArray: any = []; // 被記錄的點陣列

const CanvasBox = () => {
  const [activeColor, setActiveColor] = useRecoilState(activeColorState);
  const tool = useRecoilValue(toolState);

  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [savedData, setSavedData] = useState<HTMLImageElement>(new Image());
  const [initialPoint, setInitialPoint] = useState<pointIF | null>({
    x: undefined,
    y: undefined,
  }); // 滑鼠移動的上一個點
  const [secondPoint, setSecondPoint] = useState<pointIF | null>({
    x: undefined,
    y: undefined,
  }); // 滑鼠移動的上一個點

  const canvasRef = useRef<any>(null);
  const canvasWrapRef = useRef<any>(null);

  useEffect(() => {
    const handleDrawCanvas = (point: pointIF) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let width, height;

      if (point?.x && initialPoint?.x) {
        width = point?.x - initialPoint?.x;
      }
      if (point?.y && initialPoint?.y) {
        height = point?.y - initialPoint?.y;
      }

      switch (tool) {
        case "eraser": // 橡皮擦
          ctx.clearRect(point?.x, point?.y, 10, 10);
          break;
        case "pencil": // 鉛筆
          ctx.strokeStyle = activeColor;
          ctx.lineWidth = 1;
          ctx.lineCap = "round"; // 頭尾圓弧的線條
          ctx.lineJoin = "round"; // 交會時圓角
          ctx.beginPath();
          ctx.moveTo(lastPoint?.x, lastPoint?.y); // 下筆位置
          ctx.lineTo(point?.x, point?.y);
          ctx.stroke();
          lastPoint = { x: point?.x, y: point?.y };
          ctx.closePath();
          pointsArray = [...pointsArray, point];
          break;
        case "line": // 直線
          clearCanvas();
          restore();
          // draw the current line
          ctx.beginPath();
          ctx.strokeStyle = activeColor;
          ctx.lineWidth = 1;
          ctx.moveTo(initialPoint?.x, initialPoint?.y);
          ctx.lineTo(point?.x, point?.y);
          ctx.stroke();
          break;
        case "curve": // 曲線
          clearCanvas();
          restore();
          //curve toward mouse
          ctx.beginPath();
          ctx.moveTo(secondPoint?.x, secondPoint?.y);
          ctx.quadraticCurveTo(
            point?.x,
            point?.y,
            initialPoint?.x,
            initialPoint?.y
          );
          ctx.stroke();
          break;
        case "rectangle":
          clearCanvas();
          restore();
          ctx.beginPath();
          ctx.strokeStyle = activeColor;
          ctx.strokeRect(initialPoint?.x, initialPoint?.y, width, height);
          break;
        case "roundedRectangle":
          clearCanvas();
          restore();
          ctx.strokeStyle = activeColor;
          roundRect({
            ctx,
            x: initialPoint?.x,
            y: initialPoint?.y,
            width,
            height,
            r: 10,
          });
          break;
        case "ellipse":
          clearCanvas();
          restore();
          ctx.strokeStyle = activeColor;
          drawOval(
            ctx,
            initialPoint?.x || 0,
            initialPoint?.y || 0,
            point?.x || 0,
            point?.y || 0
          );
          break;
        default:
          break;
      }
    };

    /**
     * 移動時處理每一個點
     * @param {Object} e 移動事件
     */
    const handleMouseMove = (e: MouseEvent) => {
      if (isDrawing) {
        const point = { x: e.offsetX, y: e.offsetY };
        handleDrawCanvas(point);
      }
    };

    if (canvasRef && canvasRef.current) {
      canvasRef.current.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      canvasRef.current.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDrawing, canvasRef, activeColor, tool, initialPoint, secondPoint]);

  /**
   * 滑鼠點下畫布
   */
  const handleMouseDown = (event: any) => {
    setIsDrawing(true);
    const point = getClientOffset(event);
    setInitialPoint({ ...point });
    switch (tool) {
      case "fillColor":
        fillCanvas();
        break;
      case "pickColor":
        const ctx = canvasRef.current.getContext("2d");
        pickColor(ctx, point, setActiveColor);
        break;
      case "line":
        saveCanvas();
        break;
      case "rectangle":
        saveCanvas();
        break;
      case "roundedRectangle":
        saveCanvas();
        break;
      case "ellipse":
        saveCanvas();
        break;
      case "curve":
        saveCanvas();
        break;
      default:
        break;
    }
  };

  /**
   * 提起畫筆
   */
  const handleMouseUp = (event: any) => {
    if (isDrawing) {
      setIsDrawing(false);
      setInitialPoint(null);
      lastPoint = null;
      switch (tool) {
        case "curve":
          const point = getClientOffset(event);
          setSecondPoint(point);
          break;
        default:
          break;
      }
    }
  };

  /**
   * 填滿色彩
   */
  const fillCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = activeColor;
    ctx.fillRect(0, 0, 500, 500);
  };

  /** 還原畫布 */
  const restore = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(savedData, 0, 0);
  }, [savedData]);

  /** 取得位置 */
  const getClientOffset = (event: any) => {
    let rect = canvasRef.current.getBoundingClientRect();
    const point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    return point;
  };

  /** 清空畫布 */
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  /** 儲存畫布 */
  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const saved = new Image();
    saved.src = canvas.toDataURL("image/png");
    setSavedData(saved);
  };

  return (
    <Wrapper ref={canvasWrapRef}>
      <MainCanvas
        ref={canvasRef}
        height={500}
        width={500}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseOver={handleMouseUp}
        cursor={tool}
      ></MainCanvas>
    </Wrapper>
  );
};

export default CanvasBox;
