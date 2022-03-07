import React from "react";
import reportStyles from "../reportStyles";

const ContentList = (props) => {
  const {
    content = [{ label: "Lorem text 1", value: "Ipsum value 1" }],
    header = "Lorem Ipsum",
    classes = {}
  } = props;
  const { container = {}, labelStyle = {}, valueStyle = {} } = classes

  const createContentList = () => {
    return content.map((item, index) => {
      const { label, value } = item;
      return (
        <div style={reportStyles['listContainer']} key={index}>
          <div style={labelStyle}>{`${label}:`}</div>
          <div style={reportStyles["flexGrow"]}>
            <hr style={reportStyles['dottedBorder']}/>
          </div>
          <div style={{...reportStyles['boldFont'], ...valueStyle}}>{value}</div>
        </div>
      );
    });
  };
  return (
    <>
      <h6 style={{...reportStyles['h4'], ...reportStyles['zeroMargin']}}>{header}</h6>
      <div style={{...reportStyles['contentListContainer'], ...reportStyles['nonBoldH5'], ...container}}>{createContentList()}</div>
    </>
  );
};

export default ContentList;