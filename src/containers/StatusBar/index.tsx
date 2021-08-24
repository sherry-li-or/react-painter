/**
 * 底部狀態列表
 */
import React from "react";
import { Area, StatusText, StatusCoordinates } from "./style";

const StatusBar = () => {
  return (
    <Area>
      <StatusText>
        如需說明，請按一下「說明」功能表中的「說明主題」。
      </StatusText>
      <StatusCoordinates></StatusCoordinates>
      <StatusCoordinates></StatusCoordinates>
    </Area>
  );
};

export default StatusBar;
