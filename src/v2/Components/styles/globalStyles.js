import { makeStyles } from '@material-ui/core'

const globalStyles = makeStyles((theme) => ({
    appContainer: {
        margin: '0 auto',
        boxSizing: 'border-box',
        width: '100%',
        padding: theme.spacing(2, 2, 10),
        background: theme.palette.grey[50],
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(2, 11, 11, 3),
        },
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(4, 11, 11, 3),
        },
    },
    itemContainer: {
        margin: 'unset',
        width: '1170px',
    },
    menuWrapper: {
        margin: theme.spacing(1, 0, 0),
    },
    menu: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 0,
        overflow: 'hidden',
        '&.MuiInputBase-root': {
            padding: theme.spacing(0, 4, 0, 0),
        },
        '& .MuiList-padding': {
            padding: 0,
        },
        '& li': {
            fontSize: 15,
            padding: theme.spacing(1),
            width: '100%',
            justifyContent: 'space-between',
            '&:not(:last-child)': {
                borderBottom: `2px solid ${theme.palette.grey[350]}`,
            },
            '&.Mui-selected': {
                color: `${theme.palette.secondary.main}`,
                background: 'transparent',
                fontWeight: 500,

                '&.unfeasible': {
                    color: theme.palette.error.main,
                },
            },
            '&.unfeasible': {
                color: theme.palette.error.main,
            },
        },
    },
    sideMarginsReset: {
        marginLeft: `-${theme.spacing(1)}px`,
        marginRight: `-${theme.spacing(1)}px`,
    },
    optionRichSelectCard: {
        margin: theme.spacing(1, 0, 2),
        [theme.breakpoints.up('sm')]: {
            margin: theme.spacing(2.5, 0),
        },
        '& .MuiFormControl-root': {
            margin: theme.spacing(1, 0, 0.5),
        },
    },
    optionRichSelectCardContent: {
        padding: '17px 20px !important',
    },
    optionPrice: {
        fontWeight: 600,
        margin: `auto ${theme.spacing(9.75)}px auto 0`,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    optionSectionTitle: {
        fontWeight: 500,
    },
}))

export default globalStyles
