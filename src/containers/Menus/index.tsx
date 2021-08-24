/**
 * 上方工具列
 */

import { Wrapper, Button } from "./style";
import map from "lodash/map";

const list = [
  { label: "檔案", hotKeyword: "F" },
  { label: "編輯", hotKeyword: "E" },
  { label: "檢視", hotKeyword: "V" },
  { label: "影像", hotKeyword: "I" },
  { label: "色彩", hotKeyword: "C" },
  { label: "說明", hotKeyword: "H" },
  { label: "Extars", hotKeyword: "" },
];

const Menus = () => {
  return (
    <Wrapper>
      {map(list, (el) => (
        <Button key={el?.label}>
          {el?.label}(<span>{el?.hotKeyword}</span>)
        </Button>
      ))}
    </Wrapper>
  );
};

export default Menus;
