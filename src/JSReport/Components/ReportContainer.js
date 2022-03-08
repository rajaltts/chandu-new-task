import React from "react";
import reportStyles from "./reportStyles";
const ReportContainer = ({children}) => {
  const {
    reportContainer
  } = reportStyles;
  return (
    <div style={{...reportContainer}}>
      {children}
    </div>
  );
};
export default ReportContainer;
