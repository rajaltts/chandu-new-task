import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => {console.log("YYYYYYYY theme", theme); return {
    root: {
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(1),
        },
    },
    typography: {
        color: theme.palette.carrierBlue?.main || theme.palette.primary.main,
    },
    divider: {
        margin: theme.spacing(4, 0, 4, 0),
        [theme.breakpoints.down('md')]: {
            margin: theme.spacing(2, 0, 2, 0),
        },
    },
}})