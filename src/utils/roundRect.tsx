interface propsIF {
  ctx?: any;
  x: any;
  y: any;
  width?: any;
  height?: any;
  r: number;
}

const roundRect = ({
  ctx,
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  r,
}: propsIF) => {
  if (width && width < 2 * r) r = width / 2;
  if (height && height < 2 * r) r = height / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.stroke();
};

export default roundRect;
