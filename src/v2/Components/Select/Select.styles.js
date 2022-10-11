import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    selectRoot: {
        width: '100%',
        height: '36px',
        maxHeight: '36px',
        boxSizing: 'border-box',
        '& .MuiOutlinedInput-inputMarginDense': {
            paddingTop: '7.5px',
            paddingBottom: '7.5px',
        },
        '& .MuiSelect-root': {
            display: 'flex',
            placeContent: 'space-between',
        },
    },
    menuItem: {
        placeContent: 'space-between',
        fontSize: 15,
        padding: theme.spacing(1, 2),
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
    adornments: {
        display: 'flex',
        alignItems: 'center',
    },
    priceMlp: {
        paddingRight: '5px',
    },
}))

export default useStyles
