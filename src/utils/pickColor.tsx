/**
 * 提取顏色
 */
const pickColor = (
  ctx: any,
  point: { x: number; y: number },
  setActiveColor: (x: string) => void
) => {
  const p = ctx.getImageData(point?.x, point?.y, 1, 1).data;
  const color = `rgba(${p[0]}, ${p[1]}, ${p[2]}, ${p[3]})`;
  setActiveColor(color);
};

export default pickColor;
