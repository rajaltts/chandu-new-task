import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    fabWithBadge: {
        [theme.breakpoints.up('sm')]: {
            position: 'fixed',
            bottom: 70,
        },
        '& .MuiBadge-badge': {
            position: 'absolute',
            top: 7,
            right: 2,
            height: 13,
            minWidth: 13,
            width: 13,
            fontSize: 9,
        },
    },
}))

export default useStyles
