import { makeStyles } from '@material-ui/core'

const tabsListStyles = makeStyles((theme) => ({
    tabs: {
        [theme.breakpoints.only('xs')]: {
            overflow: 'inherit',
            minHeight: 0,
        },
        '& .MuiTabs-indicator': {
            display: 'none',
        },
        '& .MuiTabs-scroller': {
            [theme.breakpoints.only('xs')]: {
                overflow: 'inherit !important',
                borderRadius: 4,
            },
        },
        '& .MuiTabs-flexContainer': {
            [theme.breakpoints.only('xs')]: {
                position: 'absolute',
                left: 0,
                right: 0,
                top: 8,
                display: 'flex',
                flexDirection: 'column',
                background: 'white',
                boxShadow:
                    '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
                borderRadius: 4,
                zIndex: 1,
            },
            [theme.breakpoints.up('sm')]: {
                flexWrap: 'wrap',
                '& .MuiTab-root': {
                    margin: theme.spacing(0, 0.5, 0.75, 0),
                },
            },
        },
    },
    mobileTabsToggler: {
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
        borderRadius: 3,
        height: 36,
        padding: theme.spacing(0, 2),
        border: `1px solid ${theme.palette.grey.main}`,
        width: '100%',
        fontFamily: 'Roboto, sans-serif',
        fontSize: 14,
        textAlign: 'left',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        '&:focus': {
            outline: 'none',
        },
        '& .MuiSvgIcon-root': {
            marginLeft: 'auto',
        },
    },
    tabBtn: {
        minWidth: 'auto',
        textTransform: 'initial',
        minHeight: 26,
        padding: theme.spacing(0, 2),
        fontWeight: 400,
        opacity: 1,
        [theme.breakpoints.only('xs')]: {
            display: 'flex',
            maxWidth: 'inherit',
            minHeight: 38,
            '&:not(:last-child)': {
                borderBottom: `2px solid ${theme.palette.grey[350]}`,
            },
            '& .MuiTab-wrapper': {
                alignItems: 'flex-start',
            },
        },
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(0, 1),
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.grey[450]}`,
            borderRadius: 2,
        },
        '&.Mui-selected': {
            [theme.breakpoints.only('xs')]: {
                fontWeight: 500,
                color: theme.palette.secondary.main,
            },
            [theme.breakpoints.up('sm')]: {
                fontWeight: 500,
                background: theme.palette.secondary.main,
                borderColor: theme.palette.secondary.main,
                color: 'white',
            },
        },
        '&.relaxed': {
            background: `${theme.palette.error.main} !important`,
            border: `1px solid ${theme.palette.error.main} !important`,
            color: 'white',
            fontWeight: 'bold',
        },
    },
    tabContent: {
        margin: theme.spacing(3, 0, 0),
        [theme.breakpoints.up('sm')]: {
            margin: theme.spacing(6, 0, 0),
        },
    },
}))

export default tabsListStyles
