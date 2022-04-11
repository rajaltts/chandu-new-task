import React from "react";
import reportStyles from "../reportStyles";

const ReportItemContainer = ({ children, style = {} }) => {
  const { reportItemContainer } = reportStyles;

  return (
    <div style={{ ...reportItemContainer, ...style }}>
      {children}
    </div>
  );
};
export default ReportItemContainer;
