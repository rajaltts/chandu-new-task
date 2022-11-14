import { makeStyles } from '@material-ui/core'

export const AdvancedAcousticsStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
        // flexWrap: 'wrap',
        flexGrow: 1,
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    table: {
        minWidth: 650,
    },
    tableBoxContainer: {
        marginTop: '40px',
    },
    paper: {
        padding: theme.spacing(2),
        // textAlign: 'center',
        // color: theme.palette.text.secondary,
    },
    typography: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
    },
    specifyBarrierCheckbox: {
        marginLeft: '5px',
    },
    specifyReflectionCheckbox: {
        marginLeft: '10px',
    },
    calculateButtonStylesContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginTop: '10px',
    },

    specifyBarrierCheckboxInternalStyles: {
        backgroundColor: 'white',
        boxShadow: '8px 0px 0px 8px #fff',
    },

    specifyReflectionCheckboxInternalStyles: {
        backgroundColor: 'white',
        // boxShadow: '8px 0px 0px 8px #fff', //disabled temporarily
    },
    specifyBarrierCanvasContainerGrid: {
        zIndex: '0',
    },
    specifyReflectionCanvasContainerGrid: {
        zIndex: '0',
        marginLeft: '10px',
    },
    accordionStylesRoot: {
        width: '100%',
        padding: '0',
        marginTop: '10px',
        outline: '1px solid #e0e0e0',
        borderRadius: '3px',
    },
    accordionStylesHeading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        '& > *': {
            marginLeft: '10px',
        },
    },
    accordionStylesAccordion: {
        flexDirection: 'row-reverse',
        paddingLeft: '0px',
    },
    accordionStylesCustomExpandIcon: {
        transform: 'rotate(0deg)',
        marginRight: '0px',
    },
    liveHelpIconStylesRoot: {
        outline: '1px solid #c5c2c2',
        borderRadius: '3px',
    },
    layoutButtonDisabled: {
        color: 'white',
        '&.Mui-disabled': {
            color: theme.palette.grey[750],
            [theme.breakpoints.up('sm')]: {
                background: theme.palette.grey[350],
            },
        },
    },
}))

export const specifyBarrierStyles = {
    position: 'absolute',
    pointerEvents: 'none',
    right: '100px',
    transform: 'translateY(21px)',
    zIndex: '-1',
}

export const specifyReflectionStyles = {
    position: 'absolute',
    pointerEvents: 'none',
    right: '115px',
    transform: 'translateY(22px)',
    zIndex: '-1',
}
