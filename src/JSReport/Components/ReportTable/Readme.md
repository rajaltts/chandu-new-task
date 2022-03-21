# Content Table
It is combination of report table title and report table body component

## Props passable to Component
titleInformation = an object which is used to display title of table(
  for more information please refer the /JSReport/Components/ReportTableTitle/Readme.md file
),
TableData = array of  objects used to display table row information (
    for more information please refer the /JSReport/Components/ReportTableBody/Readme.md file file
),

## Usage:
import in js file like below:
```
import { ReportTable } from '@carrier/ngecat-reactcomponents';
```
Use below reference to use it in your component
```
const tableData = [
  [
    {
      primaryText: {
        value: "Mode",
        style:{fontSize:"7px",color:"red"}
      },
      headerType: "h6",
    },
    {
      primaryText: {
        value: "Cooling",
        style:{color:"blue"}
      },
      bgType: "bgLightBlue",
      positionType: "center",
      headerType: "h6",
    },
  ]
]
const titleInformation = {
    title: "Title Information",
    style : {fontSize : "14px",color:"red"}
};

<ReportTable
  TableData={tableData}
  titleInformation={titleInformation}
/>

```
When props are not passed, report table will not load.
```