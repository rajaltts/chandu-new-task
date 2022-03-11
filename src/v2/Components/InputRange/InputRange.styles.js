import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    inputContainer: {
        position: 'relative',
        '&.invisible': {
            opacity: 0.4,
            pointerEvents: 'none',
        },
    },
    input: {
        height: '45px',
        width: '90%',
        minWidth: 120,
        '& > div': {
            height: '45px',
            fontSize: 14,
            [theme.breakpoints.up('md')]: {
                fontSize: 16,
            },
        },
        '& input': {
            display: 'flex',
            alignItems: 'center',
            height: '45px',
            minHeight: '36px',
            padding: theme.spacing(0, 0, 0, 2),
        },
        '& $adornment': {
            '& p': {
                fontSize: 12,
                color: theme.palette.text.primary,
                margin: '0px!important',
            },
        },
        '& > label': {
            fontSize: 14,
            color: theme.palette.text.secondary,
        },
        '& $inputNotchedOutline': {
            borderColor: theme.palette.grey.main,
        },
    },
    inputFocused: {
        color: theme.palette.grey[900],

        '& $inputNotchedOutline': {
            borderWidth: `1px!important`,
            borderColor: `${theme.palette.grey[900]}!important`,
        },

        '&$inputError': {
            color: theme.palette.red,

            '& $inputNotchedOutline': {
                borderColor: theme.palette.red,
            },
        },
    },
    inputError: {},
    inputNotchedOutline: {},
    dropdownWrapper: {
        position: 'absolute',
        display: 'flex',
        top: 1,
        right: 1,
        height: 'calc(100% - 2px)',
        borderRadius: '0 4px 4px 0',
        padding: theme.spacing(0, 0, 0, 1),
        minWidth: 'auto',
        fontSize: 12,
        background: 'white',
        '&.disabled': {
            opacity: 0.4,
            pointerEvents: 'none',
        },
    },
    dropdownButton: {
        minWidth: 'auto',
        textTransform: 'none',
        padding: theme.spacing(0, 1.75, 0, 1),
        justifyContent: 'flex-end',
        '& > span > span': {
            marginLeft: 2,
        },
    },
    adornment: {
        '&.disabled': {
            opacity: 0.4,
            pointerEvents: 'none',
        },
    },
    helperText: {
        margin: 0,
        color: theme.palette.grey.main,
    },
}))

export default useStyles
