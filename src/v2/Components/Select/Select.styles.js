import makeStyles from '@material-ui/core/styles/makeStyles'

const selectStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1, 0, 0),
        display: 'flex',
        flex: 1,
        [theme.breakpoints.up('md')]: {
            margin: theme.spacing(1, 1, 0),
        },
        '& $formLabel': {
            fontSize: 14,
            color: theme.palette.text.secondary,
        },
        '& $input': {
            borderColor: theme.palette.grey.main,
        },
    },
    formLabel: {},
    input: {},
    inputFocused: {
        '& fieldset': {
            borderWidth: `1px!important`,
            borderColor: `${theme.palette.grey[900]}!important`,
        },
    },
    selectRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '36px',
        minHeight: '36px',
        padding: theme.spacing(0, 4, 0, 2),
        boxSizing: 'border-box',
        fontSize: 14,
        [theme.breakpoints.up('md')]: {
            fontSize: 16,
        },

        '&::after': {
            content: '""',
            background: 'white',
            position: 'absolute',
            right: 0,
            width: 36,
            height: '100%',
        },
    },
    optionItem: {
        '& svg': {
            fontSize: 20,
        },
        '& button': {
            padding: '0 12px',
        },
    },
}))

export default selectStyles
