/**
 * 畫布區塊
 */
import { useEffect, useState, useRef } from "react";
import { Wrapper, MainCanvas } from "./style";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeColorState, toolState } from "../../data/atom";

let lastPoint: { x?: number; y?: number } | null = {}; // 滑鼠移動的上一個點
let pointsArray: any = []; // 被記錄的點陣列
let initialPoint: { x: number; y: number } = { x: 0, y: 0 }; // 點擊位置

const CanvasBox = () => {
  const [activeColor, setActiveColor] = useRecoilState(activeColorState);
  const tool = useRecoilValue(toolState);

  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [savedData, setSavedData] = useState<HTMLImageElement>(new Image());

  const canvasRef = useRef<any>(null);
  const canvasWrapRef = useRef<any>(null);

  useEffect(() => {
    const handleDrawCanvas = (point: { x: number; y: number }) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
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
  }, [isDrawing, canvasRef, activeColor, tool]);

  /**
   * 滑鼠點下畫布
   */
  const handleMouseDown = (event: any) => {
    setIsDrawing(true);
    switch (tool) {
      case "fillColor":
        fillCanvas();
        break;
      case "pickColor":
        pickColor(event);
        break;
      case "line":
        const point = getClientOffset(event);
        initialPoint = { x: point?.x, y: point?.y };
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
      lastPoint = null;
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

  /**
   * 提取顏色
   */
  const pickColor = (e: any) => {
    const point = getClientOffset(e);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const p = ctx.getImageData(point?.x, point?.y, 1, 1).data;
      const color = `rgba(${p[0]}, ${p[1]}, ${p[2]}, ${p[3]})`;
      setActiveColor(color);
    }
  };

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

  /** 還原畫布 */
  const restore = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(savedData, 0, 0);
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
