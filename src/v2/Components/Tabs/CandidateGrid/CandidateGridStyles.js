import { makeStyles } from '@material-ui/core'

const candidateGridStyles = makeStyles(() => ({
    gridRoot: () => {
        return {
            display: 'flex',
            marginTop: '8px',
            maxHeight: `auto`,
            '& #CandidateGrid_table': {
                maxHeight: '100%',
            },
            '& td': {
                padding: '2.5px 1px 2.5px 9px !important',
                border: 'none !important',
                borderBottom: '6px solid #F0F0F4 !important',
                color: '#333333 !important',
                minWidth: 'inherit !important',
            },
            '& td.cooler': {
                background: 'rgba(0, 118, 244, 0.1)',
                borderBottom: '6px solid #d8e4f4 !important',
            },
            '& td.heater': {
                background: 'rgba(211, 19, 54, 0.1)',
                borderBottom: '6px solid #eedae1 !important',
            },
            '& th': {
                background: '#f0f0f4',
                border: 'none !important',
                zIndex: 'unset',
            },
            '& thead': {
                top: 0,
                left: 0,
                zIndex: 1,
                position: 'sticky',
            },
            '> div': {
                background: 'transparent !important',
            },
        }
    },
    heater: {
        backgroundColor: '#eedae1 !important',
    },
    cooler: {
        backgroundColor: '#d8e4f4 !important',
    },
    rowClassName: {
        backgroundColor: '#ffffff !important',
    },
    tdClassName: {
        color: '#617080 !important',
        backgroundColor: '#F0F0F4',
        fontSize: '14px !important',
        fontWeight: '500 !important',
        lineHeight: '16px !important',
        letterSpacing: '0.05em !important',
        border: 'none !important',
        '&:hover': {
            color: '#000000 !important',
        },
    },
    pagination: {
        border: 'none !important',
        paddingTop: '24px',
        backgroundColor: '#F0F0F4 !important',
    },
}))

export default candidateGridStyles
