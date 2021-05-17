import { makeStyles } from '@material-ui/core/styles';

const customDropdownStyles = makeStyles((theme) => ({
    tagTemplateName: {
        display: "block",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        maxWidth: "220px"
    }
}));

export default customDropdownStyles;