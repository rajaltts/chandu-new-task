import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    accordion: {
        borderRadius: 4,
        margin: theme.spacing(1, 0, 2),
        [theme.breakpoints.up('sm')]: {
            margin: theme.spacing(2.5, 0),
        },

        '&::before': {
            display: 'none',
        },

        '& .MuiAccordionSummary-root': {
            padding: '0 20px',
            minHeight: 70,

            '&.Mui-expanded': {
                borderBottom: `1px solid ${theme.palette.grey[350]}`,
            },

            '& .MuiGrid-root': {
                justifyContent: 'space-between',
            },
        },

        '& .MuiCheckbox-root': {
            color: theme.palette.primary.main,
        },

        '& .MuiCheckbox-root.Mui-disabled': {
            color: theme.palette.grey.main,
        },

        '& .MuiAccordionDetails-root': {
            padding: 20,

            '& .MuiFormControl-root': {
                margin: `6px 0 18px`,
            },

            '& .MuiBox-root': {
                '&:not(:last-child)': {
                    margin: `0 0 18px`,
                },
            },
        },

        '& .MuiAccordionSummary-expandIcon': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                fill: theme.palette.grey.main,
            },
        },

        '&.no-accordion': {
            '& .MuiAccordionSummary-expandIcon': {
                opacity: 0,
                display: 'none',
            },
        },

        '& .MuiFormControlLabel-root': {
            margin: theme.spacing(0, 1, 0, 0),
        },
    },
    readonlyOptionTitle: {
        alignItems: 'center',
        color: theme.palette.grey[450],

        '& .MuiSvgIcon-root': {
            marginRight: 12,
            fontSize: 18,
            fill: theme.palette.secondary.main,
        },
    },
    optionRightContent: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    optionPrice: {
        fontWeight: 600,
        margin: `auto ${theme.spacing(6)}px auto 0`,
        minWidth: '61px',
    },
    optionDescrTitle: {
        fontWeight: 600,
        margin: `0 0 4px`,
    },
    error: {
        '& .MuiCheckbox-root, .MuiFormControlLabel-label': {
            color: theme.palette.error.main,
        },
    },
    unfeasibleTooltipBtn: {
        padding: '0 12px',
    },
    partNumber: {
        fontSize: '13px',
        marginTop: '5px',
        fontWeight: 500,
    },
    optionDisabled: {
        fontWeight: 600,
        margin: `0 0 4px`,
        color: theme.palette.text.disabled,
    },
    labelDisabled: {
        color: theme.palette.text.disabled,
    },
}))

export default useStyles
