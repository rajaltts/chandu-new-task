import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
    autocomplete: {
        position: 'relative',
    },
    inputWrapper: {
        display: 'flex',
        position: 'relative',
        '& > div': {
            flex: 1,
            height: 36,
            '& > div': {
                marginBottom: 0,
            },
        },
        '& button': {
            padding: theme.spacing(0, 1.5),
        },
    },
    input: {
        display: 'flex',
        alignItems: 'center',
        height: 36,
        minHeight: 36,
        padding: theme.spacing(0, 2),
    },
    inputFocused: {
        color: theme.palette.grey[900],

        '& $inputNotchedOutline': {
            borderWidth: `1px!important`,
            borderColor: `${theme.palette.grey[900]}!important`,
        },
    },
    inputNotchedOutline: {
        borderColor: theme.palette.grey.main,
    },
    label: {
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    inputActions: {
        display: 'flex',
        position: 'absolute',
        right: 0,
    },
    list: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 2,
        padding: 0,
        background: 'white',
        borderRadius: 4,
        boxShadow:
            '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
        maxHeight: 400,
        overflow: 'auto',
    },
    listItem: {
        padding: theme.spacing(1),
        cursor: 'pointer',
        minHeight: 38,
        '&:not(:last-child)': {
            borderBottom: `2px solid ${theme.palette.grey[350]}`,
        },
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
        '& > div': {
            margin: 0,
        },
        '& span': {
            fontSize: 15,
        },
    },
}))

export default useStyles
