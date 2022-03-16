import React from "react";
import reportStyles from "./reportStyles";
import {Format} from '../Reports/page/Format';
const ReportTableBody = ({ rowData }) => {
  const {
    ST1,
    spaceBetween,
    justifycenter,
    justifyend,
    paddingLeftRight,
    tableTd,
    whiteSpace,
    tableTr,
    rowContainer
  } = reportStyles;

  const showTableElements = (text,textData,item) => {
    const textStyle = textData["style"] || {};
    return(
      <span style={{ ...paddingLeftRight, ...textStyle,
      ...(text === "secondaryText" ? whiteSpace : {}), }}>
        {tableTdData(textData,item)}
      </span>
    )
  }
  const tableTdData = (textData,item) => {
    if(!textData["value"]){
      if(item.hideLoader){
        return "";
      }
      return <Format loading>{''}</Format>
    }
    else {
      return (
         <>
          {textData["value"]}
          {textData["supValue"] ? <sup> {textData["supValue"]}</sup> : ""}
          {textData["subValue"] ? <sub> {textData["subValue"]} </sub> : ""}
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
          ...(positionType === "left" ? spaceBetween : positionType === "right" ? justifyend : justifycenter)
          }}>
            
            {item.primaryText ? (
              showTableElements("primaryText",item.primaryText,item)
            ) : "" }
            {item.secondaryText ? (
              showTableElements("secondaryText",item.secondaryText,item)
            ) : "" }
          </div>
        </td>
      })}
    </tr>
  );
};
export default ReportTableBody;