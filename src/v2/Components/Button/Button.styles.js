import { makeStyles } from '@material-ui/core'

export const useButtonStyle = makeStyles((theme) => ({
    selected: {
        background: theme.palette.primary.main,
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none',
        },
    },
}))
