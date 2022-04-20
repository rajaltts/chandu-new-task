import { makeStyles } from '@material-ui/core/styles'

const cartStyles = makeStyles((theme) => ({
    optionDrawerContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.only('xs')]: {
            width: '100%',
            overflow: 'hidden',
        },
        '& .options-wrapper': {
            margin: theme.spacing(0, 0, 3),
            [theme.breakpoints.up('sm')]: {
                margin: theme.spacing(0, 0, 5),
            },
        },
    },
    optionDrawerMainContent: {
        margin: theme.spacing(0, 1),
        [theme.breakpoints.up('sm')]: {
            margin: theme.spacing(0, 2),
        },
        '& .MuiTypography-h2': {
            [theme.breakpoints.only('xs')]: {
                fontSize: 16,
                paddingBottom: theme.spacing(1),
            },
        },
    },
    drawerCloseBtn: {
        marginLeft: '-12px!important',
        [theme.breakpoints.only('xs')]: {
            padding: '4px 12px 12px',
        },
    },
    drawerIcon: {
        color: theme.palette.grey.main,
        fontSize: 16,
    },
    totalRecap: {
        display: 'flex',
        alignItems: 'center',
        background: theme.palette.blue[40],
        height: 74,
        padding: theme.spacing(0, 2),
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
            height: 40,
        },
    },
    totalRecapTitle: {
        marginRight: theme.spacing(1),
        padding: 0,
        [theme.breakpoints.only('xs')]: {
            position: 'relative',
            fontSize: 14,
        },
    },
    totalRecapCol: {
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 12,
        [theme.breakpoints.up('sm')]: {
            alignItems: 'center',
            paddingBottom: 0,
        },

        '&:first-child': {
            paddingLeft: 36,
            [theme.breakpoints.up('sm')]: {
                paddingLeft: 0,
                paddingRight: theme.spacing(3),
            },
        },

        '&:last-child': {
            paddingLeft: theme.spacing(3),
            [theme.breakpoints.up('sm')]: {
                borderLeft: `1px solid ${theme.palette.blue[20]}`,
            },
        },
    },
    totalRecapItem: {
        display: 'flex',
        flexDirection: 'column',

        '&:nth-child(2)': {
            marginRight: theme.spacing(3),
        },

        '& .MuiTypography-root': {
            paddingBottom: 0,
            [theme.breakpoints.only('xs')]: {
                whiteSpace: 'nowrap',
                lineHeight: '18px',
                '&.MuiTypography-h2': {
                    fontSize: 14,
                },
            },
        },
    },
    totalRecapItemLegend: {
        marginBottom: theme.spacing(1),
        color: theme.palette.grey[450],
        [theme.breakpoints.only('xs')]: {
            fontSize: 10,
            fontWeight: 500,
        },
    },
    dropZone: {
        borderRadius: 4,
        background: theme.palette.grey[50],
        border: `1px dashed ${theme.palette.blue[20]}`,
        height: 0,
        opacity: 0,
        transition: 'all .250s',

        '&.is-visible': {
            height: 75,
            opacity: 100,
        },
    },
    priceLabel: {
        color: theme.palette.grey[450],
    },
    legend: {
        marginBottom: theme.spacing(1),
        color: theme.palette.grey[450],
        [theme.breakpoints.only('xs')]: {
            fontSize: 10,
            fontWeight: 500,
        },
    },
    priceItem: {
        textAlign: 'center',
    },
}))

export default cartStyles
