import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    cardWrapper: {
        position: 'relative',
        transition: 'all .2s',
        border: '2px solid',
        borderColor: 'transparent',
        height: '100%',
        boxSizing: 'border-box',
        '&:hover': {
            boxShadow: '0px 21px 12px -11px rgba(0, 118, 244, 0.1)',
        },

        '&.no-media': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 52,
            '& $cardContent': {
                display: 'flex',
                alignItems: 'center',
                padding: 0,
                [theme.breakpoints.only('xs')]: {
                    margin: '0 auto',
                },
                '& $cardContentBox': {
                    marginRight: 0,
                },
            },
            [theme.breakpoints.only('xs')]: {
                '& label': {
                    textAlign: 'center',
                },
                '& $cardPrimaryText': {
                    margin: 0,
                },
            },
            [theme.breakpoints.up('sm')]: {
                minHeight: 90,
            },
        },

        '&.loading, &.unfeasible': {
            opacity: 0.4,
        },
    },
    cardWrapperChecked: {
        boxShadow: '0px 21px 12px -11px rgba(0, 118, 244, 0.1)',

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
    cardInput: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        height: '100%',
        width: '100%',
        opacity: 0,
        cursor: 'pointer',
    },
    cardLabel: {
        marginBottom: 0,
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            padding: '12px',
        },
    },
    cardContent: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            padding: 0,
            margin: `auto 0 auto ${theme.spacing(2)}px`,
            '&:last-child': {
                padding: 0,
            },
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
        [theme.breakpoints.up('sm')]: {
            '&:last-child': {
                padding: `0 ${theme.spacing(2)}px ${theme.spacing(1.5)}px`,
            },
        },
        [theme.breakpoints.up('md')]: {
            '&:last-child': {
                padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(1.5)}px`,
            },
        },
    },
    cardContentBox: {},
    cardImgWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            height: 63,
        },
        [theme.breakpoints.up('sm')]: {
            minHeight: 140,
        },
        [theme.breakpoints.up('md')]: {
            minHeight: 200,
        },
    },
    cardImg: {
        objectFit: 'contain',
        [theme.breakpoints.down('xs')]: {
            height: 63,
            width: 91,
        },
        [theme.breakpoints.up('sm')]: {
            height: 96,
            maxWidth: '60%',
        },
        [theme.breakpoints.up('md')]: {
            height: 131,
        },
    },
    cardPrimaryText: {
        fontWeight: '600',
        [theme.breakpoints.down('xs')]: {
            margin: `0 0 4px`,
        },
    },
    cardSecondaryText: {
        color: theme.palette.grey[750],
    },
    unfeasibleTooltipBtn: {
        padding: '0 12px 0 0',
    },
    unfeasibleTooltipCardBtn: {
        position: 'absolute',
    },
    errorMsg: {
        alignItems: 'center',
        marginBottom: theme.spacing(3),
    },
}))

export default useStyles
