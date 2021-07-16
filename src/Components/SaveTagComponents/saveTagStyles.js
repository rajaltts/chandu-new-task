import { makeStyles } from "@material-ui/core/styles";

const saveTagStyles = makeStyles((theme) => ({
    tagNameContainer: {
        display: "flex",
        flexDirection: "row",
        padding: "2px -1px 2px 2px",
        width: "100% !important",
    },
    newProjectSeletionContainer: {
        display: "flex",
        flexDirection: "column",
    },
    disableInput: {
        backgroundColor: "#f5f5f5",
    },
    popper: {
        zIndex: "99999",
        width: "55%",
        top: "unset",
        left: "unset",
    },
    paper: {
        maxHeight: "170px",
        minHeight: "150px",
        maxWidth: "464px",
        overflowY: "auto",
    },
    noDataAvailable: {
        "row-gap": "10px",
        display: "flex",
        "flex-direction": "column",
    },
    tagNameLabel: {
        margin: "19px 27px 0px 0px",
        width: "40%",
        display: "flex",
    },
    requiredAsterik: {
        color: "#c00000",
    },
    errorMsg: {
        display: "block",
        color: "#c00000",
        margin: "4px 0px",
    },
    searchInputRoot: {
        fontSize: "14px",
    },
    searchInput: {
        width: "100%",
    },
    errorBorder: {
        borderColor: "#ff2a2a !important",
    },
    nonErrorBorder: {
        borderColor: "#bcbcbc !important",
    },
    tagNameLabelContainer: {
        width: "100%",
    },
    labelRoot: {
        margin: "0px",
    },
    label: {
        fontSize: "14px",
    },
    radioRoot: {
        padding: "0px 2px 1px 0px !important",
    },
    radioSection: {
        display: "flex",
        flexDirection: "column",
        padding: "8px",
        maxHeight: "250px",
        overflowY: "auto",
        overflowX: "hidden",
    },
    noRecords: {
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100px",
        display: "flex",
    },
    verticalListItems: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    helperText: {
        height: "18px",
        color: "#BAC0D0",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "16px",
        lineHeight: "112%",
        marginTop: "18px",
        marginBottom: "10px",
    },
    adornmentStyle: {
        top: "calc(50% - 14px)",
    },
    autocomplete: {
        marginTop: "25px",
    },
    optionsContainer: {
        zIndex: 9999999,
    },
    optionsContainerAddCustomer: {
        zIndex: 9999999,
        transform: "translate3d(420px, 3610px, 0px)",
    },
    textFieldPlaceholder: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "16px",
        lineHeight: "112%",
        letterSpacing: "0.15px",
        color: "#333333",
        mixBlendMode: "normal",
    },
    marginTop25px: {
        marginTop: "25px",
    },
    autoCompleteOptionsListContainer: {
        padding: "0px",
        border: "1px solid #E5E7ED",
        maxHeight: "217px",
    },
    autoCompleteOptions: {
        borderBottom: "1px solid #E5E7ED",
    },
    menuItemSelected: {
        color: "#1891F6",
    },
    saveTagContent: {
        padding: "8px 0px !important",
    },
    errorLabel: {
        color: "#858585",
    },
}));

export default saveTagStyles;
