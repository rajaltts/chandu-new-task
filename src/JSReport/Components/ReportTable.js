import React from "react";
import ReportTableTitle from "./ReportTableTitle";
import ReportTableBody from "./ReportTableBody";
import reportStyles from "./reportStyles";
const ReportTable = ({
  TableData = [{}],
  titleInformation = {}
}) => {
  return (
    <div style={reportStyles["tableReport"]}>
      {titleInformation["title"] && <ReportTableTitle titleInformation={titleInformation} />}
      <div style={reportStyles["tableData"]}>
        
            <table style={reportStyles["table"]}>
              <tbody style={reportStyles["tbody"]}>
              {TableData.map((rowData, index) => {
                return (<ReportTableBody rowData={rowData} />)
              })}
              </tbody>
            </table>
          
       
      </div>
    </div>
  );
};

export default ReportTable;
