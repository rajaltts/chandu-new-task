import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
    unfeasibleTooltipBtn: {
        padding: '0 12px 0 0',
    },
    errorMsg: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(3),
    },
}))
