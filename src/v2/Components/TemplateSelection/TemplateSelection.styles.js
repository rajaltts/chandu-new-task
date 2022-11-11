import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    selectTemplateCard: {
        [theme.breakpoints.down('xs')]: {
            '&.MuiCardContent-root:last-child': {
                padding: theme.spacing(1.5, 2.5, 2.5),
            },
        },
    },
}))

export default useStyles
