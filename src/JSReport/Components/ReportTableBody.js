import React from "react";
import reportStyles from "./reportStyles";
const ReportTableBody = ({ rowData }) => {
  const {
    ST1,
    spaceBetween,
    justifycenter,
    paddingLeftRight,
    tableTd,
    whiteSpace,
    tableTr,
  } = reportStyles;

  const tableTdData = (item) => {
    return (
      <>
        {item["value"] ? item["value"] : ""}
        {item["supValue"] ? <sup> {item["supValue"]}</sup> : ""}
        {item["subValue"] ? <sub> {item["subValue"]} </sub> : ""}
      </>
    );
  };
  return (
    <tr style={tableTr}>
      {rowData.map((item, index) => {
        const styleType = item.styleType ? reportStyles[item.styleType] : ST1;
        const style = item.style ? item.style : {};
        const positionType = item.positionType ? item.positionType : "left";
        return (
          <td
            style={{
              ...tableTd,
              ...styleType,
              ...style,
              ...(positionType === "left" || positionType === "right"
                ? spaceBetween
                : justifycenter),
            }}
          >
            <span style={{ ...paddingLeftRight,...reportStyles[item.headerType] }}>
                {tableTdData(item.primaryText)}
              </span>
            {item.secondaryText ? (
              <span style={{ ...reportStyles[item.headerType], ...paddingLeftRight, ...whiteSpace }}>
                {tableTdData(item.secondaryText)}
              </span>
            ) : (
              ""
            )}
          </td>
        )
      })}
    </tr>
  );
};

export default ReportTableBody;
