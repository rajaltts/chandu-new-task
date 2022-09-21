import { makeStyles } from '@material-ui/core'

export const useCandidateCardStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(2),
    },
    table: {
        marginTop: theme.spacing(2),
        width: '100%',
    },
    rightAlign: {
        textAlign: 'right',
        whiteSpace: 'nowrap',
    },
    visibilityButton: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
}))