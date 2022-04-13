import React from 'react'
import ReportTableBody from './ReportTableBody';
import reportStyles from '../reportStyles';

export default {
    title: 'Report Table Body',
    component: ReportTableBody
}

const performanceData = [
    [
      {
        primaryText: {
          value: "Mode",
        },
        headerType: "h6",
      },
      {
        primaryText: {
          value: "Cooling",
        },
        bgType: "bgLightBlue",
        positionType: "center",
        headerType: "h6",
      },
    ],
    [
      {
        primaryText: {
          value: "Cooling Capacity",
          supValue: "(1)",
          headerType: "h5",
        },
        secondaryText: {
          value: "KW",
        },
        positionType: "left",
      },
      {
        primaryText: {
          value: "806",
          headerType: "h5",
        },
        bgType: "bgLightBlue",
        positionType: "center",
      },
    ],
    [
      {
        primaryText: {
          value: "Cooling Efficiency (EER)",
          supValue: "(1)",
        },
        secondaryText: {
          value: "kW/kW",
        },
      },
      {
        primaryText: {
          value: "",
        },
        bgType: "bgLightBlue",
        positionType: "center",
        hideLoader: true,
      },
    ],
    [
      {
        primaryText: {
          value: "Unit Power Input ",
          supValue: "(1)",
        },
        secondaryText: {
          value: "kW",
        },
      },
      {
        primaryText: {
          value: "",
        },
        bgType: "bgLightBlue",
        positionType: "center",
      },
    ],
    [
      {
        primaryText: {
          value: "Sound power level (LwA)",
          supValue: "(1)",
        },
        secondaryText: {
          value: "dB(A)",
        },
      },
      {
        primaryText: {
          value: "98.0",
        },
        bgType: "bgLightBlue",
        positionType: "center",
      },
    ],
    [
      {
        primaryText: {
          value: "Sound Pressure Level at 10.0m (LpA) ",
          supValue: "(1)",
        },
        secondaryText: {
          value: "dB(A)",
        },
      },
      {
        primaryText: {
          value: "65.5",
        },
        bgType: "bgLightBlue",
        positionType: "center",
      },
    ],
    [
      {
        primaryText: {
          value: "Minimum Capacity",
          supValue: "(2)",
        },
        secondaryText: {
          value: "kW",
        },
      },
      {
        primaryText: {
          value: "81.2",
        },
        bgType: "bgLightBlue",
        positionType: "center",
      },
    ],
  ];

const ReportTableBodyTemplate = ({TableData, ...args}) => {
    return (
        <table style={reportStyles["table"]}>
            {TableData.map((rowData, index) => {
                if (rowData && !rowData.length) {
                    return null;
                }
                return <ReportTableBody rowData={rowData} {...args} />;
            })}
        </table>
    )
}

export const ReportTableBodyWithProps = ReportTableBodyTemplate.bind({})
ReportTableBodyWithProps.args = {
    TableData: performanceData
}