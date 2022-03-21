import { makeStyles } from '@material-ui/core'

export const useButtonStyle = makeStyles((theme) => ({
    selected: {
        background: props => theme.palette[props.color]?.main,
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none',
        },
    },
}))
