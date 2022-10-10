import { makeStyles } from '@material-ui/core/styles'

const columnPickerStyles = makeStyles(() => ({
    columnRoot: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    columnPickerIcon: {
        color: '#152c73',
        height: '20px',
        width: '20px',
    },
    columnApiError: {
        display: 'block',
        color: '#c00000',
        margin: '4px 0px',
    },
    columnPickerIconError: {
        color: '#c00000',
    },
    columnReset: {
        display: 'flex',
        color: '#1891F6',
        alignItems: 'center',
        cursor: 'pointer',
        marginTop: '12px',
    },
    resetIcon: {
        height: '16px',
        width: '16px',
        marginRight: '3px',
        transform: 'rotate(-51deg)',
    },
    filterIcon: {
        cursor: 'pointer',
        position: 'absolute',
        marginRight: '19px',
        marginTop: '-3px',
        zIndex: '9',
        display: 'flex',
        alignItems: 'center',
    },
    filterIconError: {
        marginTop: '3px',
        marginRight: '47px',
    },
    checkboxRoot: {
        padding: '0px 2px 1px 0px !important',
        color: '#1891F6 !important',
        '&.Mui-disabled': {
            opacity: '0.3',
        },
    },
    labelRoot: {
        margin: '0px',
        marginBottom: '3px',
    },
    label: {
        fontSize: '14px',
    },
    checkboxSection: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '200px',
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    columnDesc: {
        color: '#152C73',
        fontWeight: 'bold !important',
        height: '19px',
    },
    dialogContent: {
        padding: '4px 0px',
    },
}))

export default columnPickerStyles
