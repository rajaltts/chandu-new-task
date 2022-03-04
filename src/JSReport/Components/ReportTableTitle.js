import React from "react";
import reportStyles from "./reportStyles";

const ReportTableTitle = ({
  titleInformation
}) => {
  const styleType = titleInformation.styleType ? reportStyles[titleInformation.styleType] : reportStyles["tableTitle"];
  const style = titleInformation.style ? titleInformation.style : "";
  return (
    
    <div
      style={{
        ...styleType,
        ...style,
      }}
    >
      {titleInformation.title}
    </div>
  );
};

export default ReportTableTitle;
