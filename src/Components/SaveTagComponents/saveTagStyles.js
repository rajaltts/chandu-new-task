import { makeStyles } from '@material-ui/core/styles';

const saveTagStyles = makeStyles((theme) => ({
    tagNameContainer: {
        display: "flex",
        flexDirection: "row",
        padding: "2px",
    },
    newProjectSeletionContainer: {
        display: "flex",
        flexDirection: "column"
    },
    disableInput: {
        backgroundColor: "#f5f5f5"
    },
    popper: {
        zIndex: "99999",
        width: "64%"
    },
    tagNameLabel: {
        margin: "19px 27px 0px 0px",
        width: "40%",
        display: "flex"
    },
    requiredAsterik: {
        color: "#c00000"
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
        width: "100%"
    },
    errorBorder: {
        borderColor: "#c00000 !important"
    },
    nonErrorBorder: {
        borderColor: "#bcbcbc !important"
    },
    tagNameLabelContainer: {
        width: "72%"
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
    noRecords: {
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100px",
        display: "flex",
    }
}));

export default saveTagStyles;