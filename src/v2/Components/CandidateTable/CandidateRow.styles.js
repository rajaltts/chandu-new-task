import { makeStyles } from '@material-ui/core'

export const useCandidateRowStyles = makeStyles((theme) => ({
    row: {
        cursor: 'pointer',
        '&:hover': {
            '& .subGroupRow': {
                backgroundColor: theme.palette.grey['450'],
            },
        },
    },
    rowError: {
        cursor: 'not-allowed',
    },
    rowHighlighted: {
        border: `1px solid ${theme.palette.secondary.main}`,
    },
    rowHighlightedIcon: {
        color: theme.palette.secondary.main,
    },
    coolingCell: {
        backgroundColor: 'rgba(0, 118, 244, 0.1) !important',
    },
    heatingCell: {
        backgroundColor: 'rgba(211, 19, 54, 0.1) !important',
    },
    rowCell: {
        borderBottom: 'none',
        cursor: 'inherit',
        padding: theme.spacing(0.2, 0, 0.2, 0),
    },
    subRowCell: {
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(0, 0.5),
        textAlign: 'center',
        height: 40,
    },
    subRowCellInfoZone: {
        justifyContent: 'flex-start',
    },
    subGroupRowCell: {
        backgroundColor: '#E5E7ED',
    },
    errorCell: {
        color: theme.palette.text.disabled,
    },
}))
