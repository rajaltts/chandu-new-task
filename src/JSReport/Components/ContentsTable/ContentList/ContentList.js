import React from "react";
import reportStyles from "../../reportStyles";

const ContentList = (props) => {
  const {
    content = [{ label: "Lorem text 1", value: "Ipsum value 1" }],
    header = "Lorem Ipsum",
    classes = {}
  } = props;
  const { container = {}, labelStyle = {}, valueStyle = {}, headerStyle =  {} } = classes

  const createContentList = () => {
    return content.map((item, index) => {
      const { label, value } = item;
      const labelValue = `${label}${label ? ":" : ""}`
      return (
        <div style={reportStyles['listContainer']} key={index}>
          <div style={labelStyle}>{labelValue}</div>
          <div style={reportStyles["flexGrow"]}>
            <hr style={reportStyles['dottedBorder']} />
          </div>
          <div style={{ ...reportStyles['boldFont'], ...valueStyle }}>{value}</div>
        </div>
      );
    });
  };
  return (
    <>
      <h6 style={{ ...reportStyles['smallFont'], ...reportStyles['zeroMargin'], ...headerStyle }}>{header}</h6>
      <div style={{ ...reportStyles['contentListContainer'], ...reportStyles['smallerFont'], ...container }}>{createContentList()}</div>
    </>
  );
};

export default ContentList;