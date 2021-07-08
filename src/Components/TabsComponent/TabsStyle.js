import { makeStyles } from "@material-ui/core/styles";

const TabStyles = makeStyles((theme) => ({
    activeTabIndicator: {
        backgroundColor: "#1891F6",
        height: "4px",
    },
    tabLabels: {
        textTransform: "capitalize",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "19px",
    },
    activeLabel: {
        color: "#1891F6",
    },
    inActiveLabel: {
        color: "#BAC0D0",
    },
    tabRoot: {
        padding: "0px",
        minWidth: "fit-content",
        marginRight: "30px",
    },
}));

export default TabStyles;
