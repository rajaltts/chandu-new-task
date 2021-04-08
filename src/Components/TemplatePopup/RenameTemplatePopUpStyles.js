import { makeStyles } from '@material-ui/core/styles';

const RenameTemplatePopUpStyles = makeStyles({
    tagNameContainer: {
        display: "flex",
        flexDirection: "row",
        columnGap:"20px",
        alignItems:"center"
    },
    tagNameLabel: {
        display: "flex",
        width:"20%"
    },
    tagNameField: {
        flex: "1"
    },
    fieldDisabled: {
        backgroundColor: "#eee",
        border: "1px dashed ",
        color: "rgba(0, 0, 0, 0.38)",
        borderRadius: "4px"
    },
    errorBorder: {
        borderColor: "#c00000 !important"
    },
    nonErrorBorder: {
        borderColor: "#bcbcbc !important",
        color: 'black !important',
        backgroundColor: 'unset !important',
    },
    errorMsg: {
        display: "block",
        color: "#c00000",
        backgroundColor: 'unset !important',
        margin: "4px 0px"
    },
});

export default RenameTemplatePopUpStyles;