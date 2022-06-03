import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    iconButtonWithBadge: {
        '& .MuiSvgIcon-root': {
            fontSize: 36,
        },
        '& .MuiBadge-badge': {
            top: 1,
            right: 3,
        },
    },
}))

export default useStyles