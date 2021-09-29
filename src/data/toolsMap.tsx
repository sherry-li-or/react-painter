import airbrush from "../images/cursors/airbrush.png";
import eyeDropper from "../images/cursors/eye-dropper.png";
import fillBucket from "../images/cursors/fill-bucket.png";
import precise from "../images/cursors/precise.png";
import pencil from "../images/cursors/pencil.png";
import preciseDotted from "../images/cursors/precise-dotted.png";
import magnifier from "../images/cursors/magnifier.png";

const toolsMap = [
  { name: "freeFormSelec", title: "選擇任意範圍", cursor: precise },
  { name: "select", title: "選擇", cursor: precise },
  { name: "eraser", title: "橡皮擦/彩色橡皮擦", cursor: precise },
  { name: "fillColor", title: "填入色彩", cursor: fillBucket },
  { name: "pickColor", title: "挑選顏色", cursor: eyeDropper },
  { name: "magnifier", title: "放大鏡", cursor: magnifier },
  { name: "pencil", title: "鉛筆", cursor: pencil },
  { name: "brush", title: "粉刷", cursor: preciseDotted },
  { name: "airbrush", title: "噴槍", cursor: airbrush },
  { name: "text", title: "文字", cursor: precise },
  { name: "line", title: "直線", cursor: precise },
  { name: "curve", title: "曲線", cursor: precise },
  { name: "rectangle", title: "矩形", cursor: precise },
  { name: "polygon", title: "多邊形", cursor: precise },
  { name: "ellipse", title: "橢圓形", cursor: precise },
  { name: "roundedRectangle", title: "圓角矩形", cursor: precise },
];

export default toolsMap;
