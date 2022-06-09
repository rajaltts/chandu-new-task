import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    relaxed: {
        '& $root, $label': {
            color: theme.palette.error.main,
        },
    },
    root: {},
    label: {},
}))

export default useStyles
