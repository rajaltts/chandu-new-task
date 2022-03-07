import React from "react";
import reportStyles from "./reportStyles";
import {Format} from '../../Components/Reports/page/Format';
const ReportTableBody = ({ rowData }) => {
  const {
    ST1,
    spaceBetween,
    justifycenter,
    paddingLeftRight,
    tableTd,
    whiteSpace,
    tableTr,
    rowContainer
  } = reportStyles;

  const showTableElements = (text,item,hideLoader) => {
    const textStyle = item["style"] || {};
    return(
      <span style={{ ...paddingLeftRight, ...textStyle,
      ...(text === "secondaryText" ? whiteSpace : {}), }}>
        {tableTdData(item,hideLoader)}
      </span>
    )
  }
  const tableTdData = (item,hideLoader) => {
    if(!item["value"]){
      if(hideLoader){
        return "";
      }
      return <Format loading>{''}</Format>
    }
    else {
      return (
         <>
          {item["value"]}
          {item["supValue"] ? <sup> {item["supValue"]}</sup> : ""}
          {item["subValue"] ? <sub> {item["subValue"]} </sub> : ""}
          </>
      );
    }
  };
  return (
    <tr style={{...tableTr}}>
      {rowData.map((item, index) => {
        const styleType = item.styleType ? reportStyles[item.styleType] : ST1;
        const rowSpan = item.rowSpan || 1;
        const colSpan = item.colSpan || 1;
        const style = item.style ? item.style : {};
        const headerType = item.headerType ? item.headerType : {};
        const positionType = item.positionType ? item.positionType : "left";
        return <td colSpan={colSpan} rowSpan={rowSpan} 
        style={{
          ...tableTd,
          ...styleType,
          ...reportStyles[headerType],
          ...style,
        }}>
          <div style={{...rowContainer,
          ...(positionType === "left" || positionType === "right"? spaceBetween : justifycenter),
          }}>
            {item.primaryText ? (
              showTableElements("primaryText",item.primaryText,item.hideLoader)
            ) : "" }
            {item.secondaryText ? (
              showTableElements("secondaryText",item.secondaryText,item.hideLoader)
            ) : "" }
          </div>
        </td>
      })}
    </tr>
  );
};
export default ReportTableBody;
