import { makeStyles } from '@material-ui/core/styles'

const tabsStyles = makeStyles((theme) => ({
    tabsContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    tabsRoot: {
        minHeight: '36px',
        borderTopLeftRadius: '2px',
        borderTopRightRadius: '2px',
    },
    tabsSelected: {
        backgroundColor: '#669900 !important',
        color: '#fff !important',
        textTransform: 'none !important',
    },
    tabsNotSelected: {
        backgroundColor: '#dfdfdf !important',
        color: '#333',
        textTransform: 'none !important',
    },
}))

export default tabsStyles
