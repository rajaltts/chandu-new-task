import React from "react";
import reportStyles from "./reportStyles";
const ReportItemContainer = ({width,children}) => {
  const {
    reportItemContainer
  } = reportStyles;
  return (
    <div style={{...reportItemContainer,...width}}>
      {children}
    </div>
  );
};
export default ReportItemContainer;
