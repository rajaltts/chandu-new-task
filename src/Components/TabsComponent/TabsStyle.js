import { makeStyles } from "@material-ui/core/styles";

const TabStyles = makeStyles((theme) => ({
    activeTabIndicator: {
        backgroundColor: "#1891F6",
        height: "4px",
    },
    tabLabels: {
        textTransform: "initial",
        fontStyle: "normal",
        fontSize: "16px",
        lineHeight: "19px",
        marginBottom: "-10px",
    },
    activeLabel: {
        color: "#1891F6",
        fontWeight: "bold",
    },
    inActiveLabel: {
        color: "#BAC0D0",
        fontWeight: "normal",
    },
    tabRoot: {
        padding: "0px",
        minWidth: "fit-content",
        marginRight: "30px",
    },
    divisionLine: {
        borderBottom: "1px solid #E5E7ED",
    },
    negativeMargin: {
        marginTop: "-1px",
    },
}));

export default TabStyles;