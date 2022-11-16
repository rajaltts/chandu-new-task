import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    mainBox: {
        marginTop: '20px',
    },
    multipleStepsCard: {
        margin: 0,
        width: '100%',
        padding: '0 20px',

        '&.MuiCardContent-root:last-child': {
            padding: 0,
        },

        '& > .MuiBox-root': {
            padding: theme.spacing(0.5, 2, 0.5),
            [theme.breakpoints.up('md')]: {
                padding: theme.spacing(0.5, 2.5, 0.5),
            },

            '& > .MuiGrid-root .MuiGrid-root:not(.MuiGrid-container)': {
                marginBottom: 6,

                '& .MuiInputAdornment-root': {
                    '& .MuiTypography-root': {
                        marginBottom: 0,
                    },
                },

                '& .MuiTypography-root:not(.MuiInputAdornment-root)': {
                    margin: `10px 0 14px`,
                },
            },

            '& .Mui-expanded': {
                margin: '0!important',
            },
        },
        '& .MuiGrid-container + .MuiGrid-container': {
            paddingTop: 4,
        },
    },
    stepBox: {
        position: 'relative',
        borderBottom: `1px solid ${theme.palette.grey[350]}`,
    },
    borderedBox: {
        '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            height: '100%',
            width: 5,
        },
    },
    heatingBox: {
        '&::after': {
            background: theme.palette.red.main,
        },
    },
    coolingBox: {
        '&::after': {
            background: theme.palette.secondary.main,
        },
    },
    dehumidificationBox: {
        '&::after': {
            background: theme.palette.grey[900],
        },
    },
    addMargin: {
        margin: theme.spacing(0.5, 0, 0),
        padding: '0px',
        position: 'relative',
        alignItems: 'center',
        '&.invisible': {
            opacity: 0.4,
            pointerEvents: 'none',
        },
    },
}))

export default useStyles
