import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
    input: {
        height: 36,
        '& > div': {
            display: 'flex',
            alignItems: 'center',
            height: 36,
            minHeight: 36,
            padding: theme.spacing(0, 2),
            '& > input': {
                padding: 0,
            },
        },
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
    labelFocused: {
        color: `${theme.palette.grey[900]}!important`,
    },
    shrinkLabel: {
        transform: 'translate(14px, -6px) scale(0.75)',
    },
    outlinedLabel: {
        transform: 'translate(16px, 10px) scale(1)',
    },
}))

export default useStyles
