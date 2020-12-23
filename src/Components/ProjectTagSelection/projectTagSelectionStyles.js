import { makeStyles } from '@material-ui/core/styles';

const projectTagSelectionStyles = makeStyles((theme) => ({
    tagNameContainer: {
        display: "flex",
        flexDirection: "row",
        padding: "2px",
    },
    tagNameLabel: {
        margin: "19px 27px 0px 0px",
        width: "23%"
    },
    errorMsg: {
        display: "block",
        color: "#c00000",
        margin: "4px 0px"
    },
    searchInputRoot: {
        fontSize: "14px"
    },
    searchInput: {
        width: "100%",
    },
    labelRoot: {
        margin: "0px"
    },
    label: {
        fontSize: "14px"
    },
    radioRoot: {
        padding: "0px 2px 1px 0px"
    },
    radioSection: {
        display: "flex",
        flexDirection: "column",
        padding: "8px",
        maxHeight: "250px",
        overflowY: "auto",
        overflowX: "hidden"
    },
    tagNameLabelContainer: {
        width: "72%"
    },
    noRecords: {
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100px",
        display: "flex",
    }
}));

export default projectTagSelectionStyles;