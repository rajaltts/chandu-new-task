import { makeStyles } from '@material-ui/core'

export const useCandidateCardDetailsStyles = makeStyles((theme) => {
    const border = `1px solid ${theme.palette.secondary.main}`
    return {
        coolingCell: {
            backgroundColor: 'rgba(0, 118, 244, 0.1)',
        },
        heatingCell: {
            backgroundColor: 'rgba(211, 19, 54, 0.1)',
        },
        tableCell: {
            padding: theme.spacing(1),
        },
        tableCellHighlighted: {
            borderLeft: border,
            borderRight: border,
        },
        tableCellHighlightedTop: {
            borderTop: border,
        },
        tableCellHighlightedBottom: {
            borderBottom: border,
        },
    }
})