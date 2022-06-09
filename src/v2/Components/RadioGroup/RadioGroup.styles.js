import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    error: {
        '& $root, $label': {
            color: theme.palette.error.main,
        },
    },
    root: {
        color: theme.palette.primary.main,
    },
    label: {},
}))

export default useStyles