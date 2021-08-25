/**
 * 側邊工具列
 */
import { Wrapper, Component, ToolIcon, List } from "./style";
import map from "lodash/map";
import toolsMap from "../../data/toolsMap";
import { toolState } from "../../data/atom";
import { useRecoilState } from "recoil";

const ToolList = () => {
  const [tool, setTool] = useRecoilState<string>(toolState);

  return (
    <Wrapper>
      <Component>
        <List className="tools">
          {map(toolsMap, (item, index) => (
            <ToolIcon
              onClick={() => setTool(item?.name)}
              key={item?.title}
              title={item?.title}
              index={index}
              active={tool === item?.name}
            >
              <span></span>
            </ToolIcon>
          ))}
        </List>
      </Component>
    </Wrapper>
  );
};

export default ToolList;
