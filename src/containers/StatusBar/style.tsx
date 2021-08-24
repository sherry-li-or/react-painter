import styled from "styled-components";

const Area = styled("div")`
  font-family: "Segoe UI", sans-serif;
  font-size: 12px;
  color: var(--ButtonText);
  padding: 3px 2px;
  padding-top: 4px;
  border-top: 1px solid var(--ButtonShadow);
  outline: 1px solid var(--ButtonShadow);
  outline-offset: 1px;
`;

const StatusText = styled("div")`
  flex: 1 0 auto;
  padding-right: 2px;
  overflow: hidden;
`;

const StatusCoordinates = styled("div")`
  flex: 0 0 114px;
  min-width: 0px;
  padding-left: 3px;
  border-left: 1px solid rgb(123, 123, 123);
`;
export { Area, StatusText, StatusCoordinates };
