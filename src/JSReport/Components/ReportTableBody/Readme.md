# Report Table Body usage:
Report Table Body component is used to display table row data in reports.

## Props which can be passed to report table Body component:
rowData = array of objects used to display table rows in table( format as follows: 
     [
      {
        primaryText: {
        value: "Mode",
        subValue: "",
        supValue: "(1)",
        style:{color:"red"}
      },
        secondaryText: {
          value: "Cooling",
          subValue: "",
          supValue: "",
          style:{color:"blue"}
        },
        headerType: "h4",
        positionType:"left",
        bgType: "bgSeaBlue",
        hideLoader:"",
        colSpan:"1",
        rowSpan:"1",
        style:{width:"500px"},
      }
    ]
),

primaryText = object with value,subValue,supValue and style.format as below :
 {
   primaryText : {
     value : "test",
     subValue:"test",
     supValue: "(1)",
     style: {fontSize:"9px",backgroundColor:"red"} 
   }
 }
value : can be string or number or react component for using hyperlinks.
subValue: can be string or number
supValue : can be string or number
if no desired values are available, pass empty object to primaryText

secondaryText = object with value,subValue,supValue,style. format as below :
 {
   secondaryText : {
     value : "test", 
     subValue:"test",
     supValue: "(1)",
     style: {fontSize:"9px",backgroundColor:"red"} 
   }
 }
value : can be string or number or react component for using hyperlinks.
subValue: can be string or number
supValue : can be string or number
if no desired values are available, pass empty object to secondaryText

To create any text hyperlink or image hyperlink, (
   for more information please refer the /JSReport/Components/HyperLinks/Readme.md file file
)
headerType = pass value from h1 to h9 (format for headerType = "h1")
positionType =  by default positiontype is left it can be either left,right, center (format as positionType = "right")
bgType = displays the background color (format as bgType = "bgWhite")
hideLoader = display loading spinner if value is true, if value is "" it will not show loading spinner. (format as hideLoader = true)
colSpan = by default value is 1 , when we have multiple columns we can use it (format as colSpan = 1)
rowSpan = by default value is 1 , when we have multiple rows we can use it(format as rowSpan = 1)
style = inline styles as an object(name value pairs) to be applied to respective value

## Usage:
```
<ReportTableBody
    rowData={rowData}
/>