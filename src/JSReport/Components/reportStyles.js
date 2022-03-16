const flexColumn = {
  "display": "flex",
  "flexDirection": "column",
}

const flexRow = {
  "display": "flex",
  "flexDirection": "row",
}

const reportStyles = {
  jsreportPageWrapper: {
    "width": "793px",
    "height": "1120px",
    "max-width": "793px",
    "max-height": "1120px",
    "background-color": "white",
    "page-break-after": "always",
    "overflow": "hidden"
  },
  page: {
    ...flexColumn,
    "flexWrap": "nowrap",
    "padding": "3mm",
    "height": "calc(100% - 6mm)",
    "width": "calc(100% - 6mm)",
    "maxHeight": "calc(100% - 6mm)",
    "maxWidth": "calc(100% - 6mm)",
    "backgroundColor": "#f8f8f8",
    "justifyContent": "flex-start",
    "alignContent": "center"
  },
  roundBorder: {
    "border-radius": "10px",
    "background-color": "#ffffff",
    "box-shadow": "0px 0px 4px #dedede"
  },
  pageHeader: {
    ...flexRow,
    "justifyContent": "space-between",
    "alignItems": "center",
    "minHeight": "1.7cm",
    "maxHeight": "1.7cm",
    "padding": "9px",
    "marginBottom": "6px"
  },
  pageHeaderLeftArea: {
    ...flexColumn,
    "justifyContent": "space-between",
    "alignItems": "flex-start",
    "flex": "1"
  },
  pageHeaderBrandLogo: {
    "maxWidth": "2.5cm",
    "maxHeight": "1.2cm"
  },
  pageHeaderSubInfos: {
    "fontSize": "11px"
  },
  pageHeaderSubInfosPreparatorName: {
    "marginRight": "5px",
    "fontWeight": "600"
  },
  pageHeaderReportTitle: {
    ...flexColumn,
    "alignItems": "center",
    "fontSize": "19px",
    "fontWeight": "700",
    "justifyContent": "flex-start",
    "flex": "1"
  },
  pageHeaderReportTitleCarrier: {
    "color": "#152c73"
  },
  pageHeaderReportTitleCiat: {
    "color": "grey"
  },
  pageHeaderMainTitle: {
    ...flexColumn,
    "justifyContent": "flex-start",
    "alignItems": "flex-start"
  },
  pageHeaderMainTitleModel: {
    "fontSize": "19px",
    "fontWeight": "bold"
  },
  pageHeaderInfoWrapper: {
    ...flexColumn,
    "flex": "1",
    "justifyContent": "flex-end",
    "alignItems": "flex-end",
    "fontSize": "11px",
    "height": "100%"
  },
  pageHeaderInfoWrapperInfoTitle: {
    "fontWeight": "bold",
    "marginTop": "5px"
  },
  pageHeaderInfoWrapperProjectName: {
    "color": "#131313"
  },
  pageHeaderInfoWrapperTagName: {
    "color": "#131313"
  },
  pageMain: {
    ...flexColumn,
    "padding": "5mm",
    "width": "calc(100% - 10mm)",
    "maxWidth": "calc(100% - 10mm)",
    "flex": "1",
    "animation": "turn 4s linear 1.75s infinite !important"
  },
  pageFooter: {
    ...flexRow,
    "minHeight": "2cm",
    "maxHeight": "2cm",
    "paddingLeft": "10px",
    "justifyContent": "space-evenly",
    "marginTop": "6px"
  },
  pageFooterLeftArea: {
    ...flexColumn,
    "height": "100%",
    "justifyContent": "space-around",
    "alignItems": "flex-start",
    "width": "90%"
  },
  pageFooterLeftAreaFootNote: {
    ...flexColumn,
    "height": "60%",
    "flexWrap": "wrap",
    "justifyContent": "center"
  },
  pageFooterLeftAreaFootNoteImage: {
    "maxHeight": "100%",
    "marginRight": "5px",
    "maxWidth": "20%"
  },
  pageFooterLeftAreaFootNoteDescription: {
    "fontSize": "8px",
    "maxWidth": "calc(80% - 5px)"
  },
  pageFooterLeftAreaPackageVersion: {
  },
  pageFooterInfoWrapper: {
    ...flexColumn,
    "flex": "1",
    "justifyContent": "center",
    "alignItems": "flex-end",
    "fontSize": "11px",
    "height": "100%",
    "marginBottom": "6px",
    "marginRight": "6px"
  },
  tableReport: {
    width: "100%",
    marginTop: "20px",
    ...flexRow,
    flexWrap: "wrap",
    animation: "fadeIn 0.3s"
  },
  table: {
    borderCollapse: "collapse",
    borderSpacing: "0",
    width: "100%"
  },
  tableData: {
    flex: 1
  },
  tableTr: {
    height: "auto",
    minHeight: "17px",
    width: "100%"
  },
  tableTd: {
    border: "1px solid #cccccc",
    padding: "0px",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    fontSize: "10px"
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  justifycenter: {
    justifyContent: "center",
  },
  justifyend: {
    justifyContent: "end",
  },
  ST1: {
    backgroundColor: "#ececec"
  },
  ST2: {
    background: "radial-gradient(circle, #d0dce9 15%, #d3e7ff 51%, #c0d7f3 94%)",
    border: "1px solid #f2f2f2"
  },
  ST3: {
    backgroundColor: "#FFFFFF"
  },
  ST4: {
    backgroundColor: "#D68999"
  },
  ST5: {
    background: "linear-gradient(353deg, #020029 0%, #323267 35%, #004090 100%)"
  },
  ST6 : {
    backgroundColor: "#83AAD8"
  },
  tableTitle: {
    ...flexRow,
    justifyContent: "center",
    width: "100%",
    color: "white",
    textAlign: "center",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    boxShadow: "0 0 5px #8e8e8e",
    paddingTop: "2px",
    fontSize: "12px",
    paddingBottom: "2px",
    background: "linear-gradient(353deg, #020029 0%, #323267 35%, #004090 100%)",
  },
  center: {
    textAlign: "center",
  },
  left: {
    textAlign: "left",
  },
  right: {
    textAlign: "right",
  },
  whiteSpace: {
    whiteSpace: "nowrap"
  },
  paddingLeftRight: {
    padding: "0px 2px"
  },
  h1: {
    fontSize: "32px",
    fontWeight: "700"
  },
  h2: {
    fontSize: "24px",
    fontWeight: "700"
  },
  h3: {
    fontSize: "18px",
    fontWeight: "700"
  },
  h4: {
    fontSize: "16px",
    fontWeight: "700"
  },
  h5: {
    fontSize: "13px",
    fontWeight: "700"
  },
  nonBoldH5: {
    fontSize: "13px"
  },
  h6: {
    fontSize: "10px",
    fontWeight: "700"
  },
  h7 : {
    fontSize : "8px"
  },
  smallFont: {
    fontSize: "small",
    fontWeight: "700"
  },
  smallerFont: {
    fontSize: "smaller"
  },
  zeroMargin: {
    margin: "0px"
  },
  boldFont: {
    fontWeight: "bold"
  },
  dottedBorder: {
    borderTop: "1px dotted black"
  },
  noListDisc: {
    listStyleType: "none"
  },
  romanList: {
    listStyleType: "lower-roman",
    padding: "0px 0px 0px 28px"
  },
  notesContainer: {
    ...flexColumn,
    fontSize: "smaller",
    padding: "0px 0px 0px 5px",
    margin: "0px",
    letterSpacing : "-0.4px"
  },
  contentListContainer: {
    margin: "0px 15px",
    minHeight: "20px",
    maxWidth: "100%"
  },
  listContainer: {
    display: "flex",
    wordBreak: "break-all",
    alignItems: "end"
  },
  flexGrow: {
    flexGrow: "1"
  },
  contentTable: {
    margin: "10px"
  },
  rowContainer: {
    display: "flex"
  },
  reportContainer: {
    width: "100%",
    height: "auto",
    display: "flex",
    marginBottom: "10px"
  },
  reportItemContainer: {
    padding: "5px"
  },
  reportImageDefault: {
    ...flexColumn,
    textAlign: "center",
    alignItems: "center",
    margin: "10px"
  },
  imgHeight :{
    height :"15px"
  },
  link: {
    color: "#0000EE",
    fontWeight: "bold",
    cursor : "pointer"
  }
};

export default reportStyles;