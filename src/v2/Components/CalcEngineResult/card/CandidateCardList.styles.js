import { makeStyles } from '@material-ui/core'

export const useCandidateCardListStyles = makeStyles((theme) => ({
    mainGrid: {
        marginBottom: theme.spacing(10),
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(11),
        },
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing(11),
        },
    },
    candidateCardDetailsModal: {
        '& .customModalHeader': {
            '& > img': {
                maxHeight: '70px',
                paddingRight: theme.spacing(2),
            },
            '& > span': {
                color: theme.palette.secondary.main,
            },
            '& > button': {
                alignSelf: 'flex-start',
            },
        },
    },
}))