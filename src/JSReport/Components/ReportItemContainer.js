import React from "react";
import reportStyles from "./reportStyles";
const ReportItemContainer = ({ width, children, style = {} }) => {
  const {
    reportItemContainer
  } = reportStyles;
  return (
    <div style={{ ...reportItemContainer, ...width, ...style }}>
      {children}
    </div>
  );
};
export default ReportItemContainer;
