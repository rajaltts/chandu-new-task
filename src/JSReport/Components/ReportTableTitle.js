import React from "react";
import reportStyles from "./reportStyles";

const ReportTableTitle = ({
  titleInformation
}) => {
  return (
    <div
      style={{
        ...reportStyles[titleInformation.styleType],
        ...reportStyles[titleInformation.brand],
      }}
    >
      {titleInformation.title}
    </div>
  );
};

export default ReportTableTitle;
