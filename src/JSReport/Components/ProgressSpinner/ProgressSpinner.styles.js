import { makeStyles, withStyles } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

const ReportsCircularProgress = withStyles(() => ({
    colorSecondary: {
        color: (props) => (props.status === 'DOWNLOADING' ? '#28690f !important' : '#1891f6 !important'),
    },
}))(CircularProgress)

const usePercentageStyles = makeStyles(() => ({
    percentageValue: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 10,
    },
}))

export { ReportsCircularProgress, usePercentageStyles }
