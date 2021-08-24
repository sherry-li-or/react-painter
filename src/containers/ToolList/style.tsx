import styled, { css } from "styled-components";
import toolsImg from "../../images/tools.png";

const Wrapper = styled("div")`
  display: flex;
  flex: 0 0 auto;
  position: relative;
  flex-direction: column;
`;

const Component = styled("div")`
  height: 273px;
  align-items: center;
  padding-left: 4px;
  padding-right: 2px;
  display: flex;
  flex-flow: column;
`;

const List = styled("div")`
  height: 200px;
  width: 50px;
  display: flex;
  flex-flow: row wrap;
`;

const isActive = (props: { active: boolean; index: number }) => {
  if (props.active)
    return css`
      background: var(--checker);
      padding-bottom: 2px;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      border-top: 1px solid var(--ButtonDkShadow);
      border-left: 1px solid var(--ButtonDkShadow);
      border-right: 1px solid var(--ButtonHilight);
      border-bottom: 1px solid var(--ButtonHilight);
    `;
};

const ToolIcon = styled("div")`
  margin: 0;
  padding: 0;
  width: 25px;
  height: 25px;
  border: 0;
  border-right: 1px solid var(--ButtonDkShadow);
  border-bottom: 1px solid var(--ButtonDkShadow);
  background: transparent;
  outline: 0;

  box-sizing: border-box;
  position: relative;
  display: block !important;

  ${isActive}

  ::before {
    content: " ";
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border-top: 1px solid var(--ButtonHilight);
    border-left: 1px solid var(--ButtonHilight);
    border-right: 1px solid var(--ButtonShadow);
    border-bottom: 1px solid var(--ButtonShadow);
  }

  > span {
    display: block;
    position: absolute;
    left: 4px;
    top: 4px;
    width: 16px;
    height: 16px;
    background-image: url("${toolsImg}");
    background-position: ${(props: { index: number }) =>
      `${-16 * props.index}px 0px`};
  }
`;

export { Wrapper, Component, List, ToolIcon };
