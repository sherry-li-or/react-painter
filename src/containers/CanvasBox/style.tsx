import styled from "styled-components";
import find from "lodash/find";
import toolsMap from "../../data/toolsMap";

const Wrapper = styled("div")`
  background: var(--AppWorkspace);
  border: 1px inset;
  flex: 1 1 0%;
  position: relative;
  overflow: auto;
  padding: 3px;
  direction: ltr;
  display: block !important;
  height: 80vh;
`;

const MainCanvas = styled("canvas")<{ cursor: any }>`
  background: #fff;
  cursor: ${(props: { cursor: string }) => {
    const active = find(toolsMap, { name: props?.cursor });
    return `url(${active?.cursor}) 9 22, crosshair`;
  }};
`;

export { Wrapper, MainCanvas };
