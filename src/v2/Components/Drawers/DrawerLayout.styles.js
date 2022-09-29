import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
    drawer: {
        zIndex: '999!important',
        [theme.breakpoints.up('sm')]: {
            zIndex: '1!important',
        },
        '& .MuiDrawer-paper': {
            [theme.breakpoints.only('xs')]: {
                width: '80%',
            },
        },
    },
    drawerContent: {
        display: 'flex',
        flex: 1,
        '&:focus': {
            outline: 'none',
        },
    },
}))
