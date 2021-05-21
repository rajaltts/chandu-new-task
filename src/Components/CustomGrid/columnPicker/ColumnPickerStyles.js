import { makeStyles } from '@material-ui/core/styles';

const columnPickerStyles = makeStyles((theme) => ({
    columnRoot: {
        display: 'flex',
        flexDirection: "row-reverse"
    },
    columnPickerIcon: {
        color: "#152c73",
        height: "20px",
        width: "20px",
    },
    columnApiError: {
        display: "block",
        color: "#c00000",
        margin: "4px 0px"
    },
    columnPickerIconError: {
        color: "#c00000",
    },
    columnReset: {
        display: "flex",
        color: "#1891F6",
        alignItems: "center",
        cursor: "pointer"
    },
    resetIcon: {
        height: "16px",
        width: "16px",
        marginRight: "3px",
        transform: "rotate(-51deg)"
    },
    filterIcon: {
        cursor: "pointer",
        position: "absolute",
        marginRight: "19px",
        marginTop: "2px",
        zIndex: "9",
        display: "flex",
        alignItems: "center"
    },
    filterIconError: {
        marginTop: "3px",
        marginRight: "47px",
    },
    checkboxRoot: {
        padding: "0px 2px 1px 0px",
        color: "#1891F6 !important",
    },
    labelRoot: {
        margin: "0px",
        marginBottom: "3px"
    },
    label: {
        fontSize: "14px"
    },
    checkboxSection: {
        display: "flex",
        flexDirection: "column",
        maxHeight: "173px",
        overflowY: "auto",
        overflowX: "hidden"
    },
    columnDesc: {
        color: "#152C73",
        fontWeight: "bold",
        height: "19px"
    }
}));

export default columnPickerStyles;