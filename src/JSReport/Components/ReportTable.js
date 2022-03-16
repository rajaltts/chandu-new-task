import React from "react";
import ReportTableTitle from "./ReportTableTitle";
import ReportTableBody from "./ReportTableBody";
import reportStyles from "./reportStyles";
const ReportTable = ({
  TableData = [],
  titleInformation = {}
}) => {
  return (
    <>
      {titleInformation["title"] && (
        <ReportTableTitle titleInformation={titleInformation} />
      )}
      {
        TableData && TableData.length != 0 &&
        <table style={reportStyles["table"]}>
          {TableData.map((rowData, index) => {
            return <ReportTableBody rowData={rowData} />;
          })}
        </table>
      }
    </>
  );
};

export default ReportTable;
