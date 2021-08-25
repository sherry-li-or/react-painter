/**
 * 畫布區塊
 */
import { useEffect, useState, useRef } from "react";
import { Wrapper, MainCanvas } from "./style";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeColorState, toolState } from "../../data/atom";

let lastPoint: { x?: number; y?: number } | null = {}; // 滑鼠移動的上一個點
let pointsArray: any = []; // 被記錄的點陣列

const CanvasBox = () => {
  const [activeColor, setActiveColor] = useRecoilState(activeColorState);
  const tool = useRecoilValue(toolState);

  const canvasRef = useRef<any>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  useEffect(() => {
    const handleDrawCanvas = (point: { x: number; y: number }) => {
      const ctx = canvasRef.current.getContext("2d");
      switch (tool) {
        case "eraser":
          ctx.clearRect(point?.x, point?.y, 10, 10);
          break;
        case "pencil":
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
      default:
        break;
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
    let rect = canvasRef.current.getBoundingClientRect();
    const point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const p = ctx.getImageData(point?.x, point?.y, 1, 1).data;
      const color = `rgba(${p[0]}, ${p[1]}, ${p[2]}, ${p[3]})`;
      console.log("p", p, color);
      setActiveColor(color);
    }
  };

  /**
   * 提起畫筆
   */
  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      lastPoint = null;
    }
  };

  return (
    <Wrapper>
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
