import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    relaxed: {
        '& $root, $label': {
            color: theme.palette.error.main,
        },
    },
    root: {},
    label: {},
    title: {
        fontSize: 14,
    },
    pictureTagDisabled: {
        opacity: '0.15',
        pointerEvents: 'none',
    },
    pictureTagEnabled: {
        opacity: '1',
        pointerEvents: 'initial',
    },
}))

export default useStyles
