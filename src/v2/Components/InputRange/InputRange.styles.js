import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    inputContainer: {
        position: 'relative',
        alignItems: 'center',
        display: 'flex',
        padding: '5px 0px 5px 5px',
        '&.invisible': {
            opacity: 0.4,
            pointerEvents: 'none',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '10px 0px 10px 10px',
        },
    },
    input: {
        '& .MuiInputLabel-outlined': {
            transform: 'translate(16px, 10px) scale(1)',
        },
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)',
        },
        '&.MuiFormControl-root': {
            height: '36px',
            width: '100%',
        },
        '& .MuiInputBase-root': {
            height: '36px',
            fontSize: 14,
            [theme.breakpoints.up('md')]: {
                fontSize: 16,
            },
        },
        '& .MuiInputBase-input': {
            display: 'flex',
            alignItems: 'center',
            height: '36px',
            minHeight: '36px',
            padding: theme.spacing(0, 0, 0, 2),
        },
        '& .MuiInputAdornment-root': {
            '& .MuiTypography-root': {
                fontSize: 12,
                color: theme.palette.text.primary,
                margin: '0px!important',
            },
        },
        '& .MuiFormLabel-root': {
            fontSize: 14,
            color: theme.palette.grey[900],
        },
        '& .Mui-disabled': {
            color: theme.palette.text.secondary,
        },
        '& .Mui-focused': {
            color: theme.palette.grey[900],

            '& .MuiOutlinedInput-root': {
                padding: '10px',
                borderWidth: 1,
                height: '36px',
                borderColor: theme.palette.grey[900],
            },

            '&.Mui-error': {
                color: theme.palette.red.main,

                '& .MuiOutlinedInput-root': {
                    height: '36px',
                    borderColor: theme.palette.red.main,
                },
            },
        },
        '& .MuiOutlinedInput-root': {
            height: '36px',
            borderColor: theme.palette.grey.main,
        },
    },
    dropdownWrapper: {
        position: 'absolute',
        display: 'flex',
        top: 1,
        right: 1,
        height: 'calc(100% - 2px)',
        borderRadius: '0 4px 4px 0',
        padding: theme.spacing(0, 0, 0, 1),
        minWidth: 'auto',
        fontSize: 12,
        background: 'white',
        '&.disabled': {
            opacity: 0.4,
            pointerEvents: 'none',
        },
    },
    dropdownButton: {
        minWidth: 'auto',
        textTransform: 'none',
        padding: theme.spacing(0, 1.75, 0, 1),
        justifyContent: 'flex-end',
        '& > span > span': {
            marginLeft: 2,
        },
    },
    adornment: {
        '&.disabled': {
            opacity: 0.4,
            pointerEvents: 'none',
        },
    },
    helperText: {
        margin: 0,
        color: theme.palette.grey.main,
        visibility: 'hidden',
        '&.Mui-focused': {
            visibility: 'visible',
        },
    },
    helperWarningText: {
        margin: 0,
        color: `${theme.palette.orange[100]} !important`,
    },
}))

export default useStyles
