import { atom } from "recoil";

/**
 * 全局正在編輯ID
 */
const activeColorState = atom({
  key: "activeColorState",
  default: "#000",
});

const subColorState = atom({
  key: "subColorState",
  default: "#FFF",
});

const toolState = atom({
  key: "toolState",
  default: "pencil",
});

export { activeColorState, subColorState, toolState };
