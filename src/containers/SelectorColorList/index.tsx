/**
 * 顏色列表
 */
import { useRecoilState } from "recoil";
import { activeColorState, subColorState } from "../../data/atom";
import colorList from "./defalutColorList.json";
import map from "lodash/map";
import {
  Wrapper,
  CurrentColorBox,
  ListBox,
  Item,
  ActiveColor,
  SubColor,
} from "./style";

const SelectorColorList = () => {
  const [activeColor, setActiveColor] = useRecoilState<string>(
    activeColorState
  );
  const [subColor, setSubColor] = useRecoilState<string>(subColorState);

  const handleUpdateColor = (type: string, color: string) => {
    if (type === "active") {
      setActiveColor(color);
    } else {
      setSubColor(color);
    }
  };

  return (
    <Wrapper>
      <CurrentColorBox>
        <ActiveColor color={activeColor}></ActiveColor>
        <SubColor color={subColor}></SubColor>
      </CurrentColorBox>
      <ListBox>
        {map(colorList, (item) => (
          <Item
            color={item}
            key={item}
            onClick={() => handleUpdateColor("active", item)} // 左鍵選擇顏色
            onContextMenu={() => handleUpdateColor("sub", item)} // 右鍵選擇顏色
          ></Item>
        ))}
      </ListBox>
    </Wrapper>
  );
};

export default SelectorColorList;
