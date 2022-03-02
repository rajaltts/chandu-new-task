import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
    root: {
        border: '1px solid',
        borderColor: 'transparent',
        transition: 'all .2s',
        '&:hover': {
            borderColor: theme.palette.grey.light,
        },
    },
    rootSelected: {
        '&.relaxed': {
            borderColor: `${theme.palette.error.main}!important`,
            borderWidth: 1,
        },
        '&.color-default': {
            borderColor: theme.palette.grey.main,
        },
        '&.color-primary': {
            borderColor: theme.palette.primary.main,
        },
        '&.color-secondary': {
            borderColor: theme.palette.secondary.main,
        },
    },
    error: {
        borderColor: `${theme.palette.error.main}!important`,
        borderWidth: 1,
    },
    disabled: {
        opacity: 0.4,
    },
    cardActionArea: {
        height: '100%',
        width: '100%',
    },
    cardContent: {
        height: '100%',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    cardContentColumn: {
        flexDirection: 'column',
    },
    cardImg: {
        objectFit: 'contain',
    },
}))
