import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1, 0, 0),
        display: 'flex',
        flex: 1,
        width: '100%',
        [theme.breakpoints.up('md')]: {
            margin: theme.spacing(1, 1, 0),
        },
        '& .MuiInputBase-root': {
            height: '36px',
        },
        '& .MuiSelect-root': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '36px',
            minHeight: '36px',
            padding: theme.spacing(0, 5, 0, 2),
            boxSizing: 'border-box',
            fontSize: 14,
            [theme.breakpoints.up('md')]: {
                fontSize: 16,
            },

            '&::after': {
                content: '""',
                background: 'white',
                position: 'absolute',
                right: 0,
                width: 36,
                height: '100%',
            },

            /* '&.MuiInputBase-input': {
                width: `calc(100% - ${theme.spacing(5)}px)`,
            }, */
        },
        '& .Mui-focused': {
            color: theme.palette.grey[900],

            '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: 1,
                borderColor: theme.palette.grey[900],
            },
        },
        '& .MuiFormLabel-root': {
            fontSize: 14,
            color: theme.palette.grey[900],
        },
        '& .Mui-disabled': {
            color: theme.palette.text.secondary,
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey.main,
        },
    },
    selectRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '36px',
        minHeight: '36px',
        boxSizing: 'border-box',
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
    menuItemContainer: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    adornments: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'flex-end',
        width: '100%',
    },
    optionItem: {
        '& .MuiSvgIcon-root': {
            fontSize: 20,
        },
        '& .MuiIconButton-root': {
            padding: '0 12px',
        },
    },
    unfeasibleTooltipBtn: {
        '&.MuiIconButton-root': {
            padding: '0 12px',
        },
    },
    descriptionWithMlp: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    priceMlp: {
        paddingRight: '5px',
    },
}))

export default useStyles
