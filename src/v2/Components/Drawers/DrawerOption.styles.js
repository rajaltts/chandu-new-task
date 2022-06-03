import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    topLine: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: theme.spacing(0, 0, 2),
        [theme.breakpoints.up('md')]: {
            margin: theme.spacing(0, 0, 1),
        },
    },
    topLineBtns: {
        '& .MuiIconButton-root': {
            padding: theme.spacing(0.75),
        },
    },
    gridOption: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '24px',
    },
    option: {
        padding: '8px 16px',
        margin: '0 0 4px',
        background: theme.palette.blue[30],

        '&.is-dragging': {
            opacity: 0.4,
        },

        '&:not(.is-default)': {
            cursor: 'move',
        },
    },
    optionName: {
        [theme.breakpoints.up('md')]: {
            textDecoration: 'underline',
            '&.bold': {
                fontWeight: 600,
            },
            '&.link': {
                cursor: 'pointer',
            },
        },
    },
    optionDiscountContainer: {
        background: theme.palette.blue[60],
        borderRadius: 3,
    },
    optionSellingPrice: {
        fontWeight: 600,
    },
    removeOptionBtn: {
        '& svg': {
            width: 20,
        },
    },
    dragHandleBtn: {
        padding: '0 12px',
        left: 12,
        cursor: 'move',
    },
    dragHandleIcon: {
        fill: theme.palette.text.primary,
    },
    legendWrapper: {
        padding: theme.spacing(0, 2, 1),
    },
    legend: {
        marginBottom: theme.spacing(1),
        color: theme.palette.grey[450],
        [theme.breakpoints.only('xs')]: {
            fontSize: 10,
            fontWeight: 500,
        },
    },
    priceContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}))

export default useStyles