import { makeStyles, withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

export const TOOLBAR = {
    HEIGHT: 60,
}
const REPORT = {
    WIDTH: 793,
}

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        width: '100%',
        height: 4,
    },
    colorSecondary: {
        backgroundColor: (props) => (props.isReportDownloadable ? '#28690f' : '#1891f6'),
    },
    bar: {
        borderRadius: 5,
        backgroundColor: theme.palette.grey?.['150'] || '#dddde1',
    },
}))(LinearProgress)

const useReportPreviewStyles = makeStyles((theme) => ({
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,

    pageTitle: {
        color: 'white',
        fontSize: 11,
        margin: 0,
    },

    reportBack: {
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        zIndex: '10000',
        overflowY: 'scroll',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    zoomIn: {
        transform: 'scale(1.2) !important',
        top: '200px !important',
    },
    reportPopup: {
        position: 'absolute',
        top: TOOLBAR.HEIGHT + 15,
        width: REPORT.WIDTH,
        height: '100%',
        zIndex: 1400,
        boxShadow:
            '0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)',

        '& > *': {
            marginBottom: 20,
        },
        '&.popup-error': {
            '*': {
                animation: 'none !important',
            },
        },
    },
    reportToolbarContainer: {
        width: REPORT.WIDTH,
        margin: 'auto',
    },

    topActionContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%',
        height: TOOLBAR.HEIGHT,
        backdropFilter: 'blur(3px)',
        backgroundColor: '#3d3d3df2',
        boxShadow: '0px 0px 7px #212121',
        zIndex: 9999,
    },

    itemsContainer: {
        width: '80%',
        height: '100%',
        maxWidth: '38cm',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'default',
        zIndex: 1,
        '-webkit-user-select': 'none',
        '-moz-user-select': 'none',
    },

    titleContainer: {
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    title: {
        color: 'white',
        fontSize: 19,
        margin: 0,
        width: '100%',
    },

    subTitle: {
        color: theme.palette.grey?.['450'] || '#BAC0D0',
        fontSize: 12,
        margin: 0,
    },

    actionIcons: {
        height: '30px !important',
        width: '30px !important',
        color: '#FFFFFF !important',

        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.3)',
            transition: 'all 0.1s ease-in-out',
        },

        '&.disable': {
            opacity: '0.5 !important',
            cursor: 'default !important',
            transition: 'none !important',
            transform: 'none !important',
        },
    },

    pageIndexContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        flexWrap: 'wrap',
        height: '66%',
        width: 60,
    },

    pageIndexValue: {
        fontSize: 18.5,
    },

    pageIndexValueSecondary: {
        color: theme.palette.grey?.['450'] || '#BAC0D0',
    },

    navigationContainer: {
        width: '20%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '100%',
    },

    closeContainer: {
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },

    downloadContainer: {
        width: 240,
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },

    downloadContainerTitle: {
        color: theme.palette.grey?.['450'] || '#BAC0D0',
        fontSize: 11,
        textAlign: 'center',
        flex: 1,
        height: '100%',
    },

    downloadIconsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '35%',
        height: '100%',

        '& .MuiIconButton-root': {
            padding: '0px !important',
        },
    },
    statusMessage: {
        transition: 'all 1s ease-in-out',
        fontSize: 14,
        textAlign: 'center',
        color: theme.palette.grey?.main || '#A7AFC3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        margin: 0,
    },

    verticalbar: {
        '&.align-left': {
            alignItems: 'flex-start',

            '&:after': {
                content: '',
                position: 'relative',
                display: 'block',
                borderTop: '30px solid #565656',
                width: 1,
                marginLeft: 28,
            },
        },
        '&.align-right': {
            alignItems: 'center',

            '&:before': {
                content: '',
                position: 'relative',
                display: 'block',
                borderTop: '30px solid #565656',
                width: 1,
                marginRight: 28,
            },
        },
    },
}))

export default useReportPreviewStyles
export { BorderLinearProgress }
