import { makeStyles } from '@material-ui/core'

export const useFilterListStyle = makeStyles((theme) => ({
    title: { display: 'flex', justifyContent: 'space-between', alignItem: 'center' },
    counter: { lineHeight: '18px' },
    marginBottom: {
        marginBottom: theme.spacing(10),
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(11),
        },
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing(11),
        },
    },
}))
