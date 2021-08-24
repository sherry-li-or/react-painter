import styled from "styled-components";

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

const MainCanvas = styled("canvas")`
  background: #fff;
`;

export { Wrapper, MainCanvas };
