import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
    },
    warningIcon: {
        zIndex: 1,
        position: 'absolute',
        top: 4,
        right: 8,
    },
}))
