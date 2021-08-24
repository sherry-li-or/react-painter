import styled from "styled-components";

const Wrapper = styled("div")`
  background-color: #c0c0c0;
  display: flex;
  padding: 2px 5px;
`;

const Button = styled("div")`
  padding: 2px 6px;
  font-family: "Segoe UI", sans-serif;
  font-size: 13px;
  cursor: pointer;
  > span {
    text-decoration: underline;
  }
  :hover {
    box-shadow: 1px 1px 0 var(--ButtonHilight) inset,
      -1px -1px 0 var(--ButtonShadow) inset;
  }
`;

export { Wrapper, Button };
