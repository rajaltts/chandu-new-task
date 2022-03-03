import React from "react";
import reportStyles from "./reportStyles";
const ReportTableBody = ({rowData}) => {
  return (
    <tr style={reportStyles["tableTr"]}>
      {rowData.map((item, index) => {
        return (
          <td
            style={{
              ...reportStyles["tableTd"],
              ...reportStyles[item.styleType],
              ...(item.isBold ? reportStyles["bold"] : reportStyles["normal"]),
              ...((item.positionType === "left") ? reportStyles["spaceBetween"] : reportStyles["justifycenter"])
            }}
          >
            <span>
              {item.primaryText["value"] ? item.primaryText["value"] : ""}
              {item.primaryText["supValue"] ? (
                <sup> {item.primaryText["supValue"]}</sup>
              ) : (
                ""
              )}
              {item.primaryText["subValue"] ? (
                <sub> {item.primaryText["subValue"]} </sub>
              ) : (
                ""
              )}
            </span>
            {item.secondaryText["value"] ? (
              <span>
                {item.secondaryText["value"]}
                {item.secondaryText["supValue"] ? (
                  <sup> {item.secondaryText["supValue"]}</sup>
                ) : (
                  ""
                )}
                {item.secondaryText["subValue"] ? (
                  <sub> {item.secondaryText["subValue"]} </sub>
                ) : (
                  ""
                )}
              </span>
            ) : (
              ""
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default ReportTableBody;
