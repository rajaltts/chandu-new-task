import { makeStyles } from '@material-ui/core'

export const useCandidateTableStyles = makeStyles((theme) => ({
    tableContainer: {
        height: '100%',
    },
    table: {
        background: theme.palette.grey['50'],
    },
    tableHead: {
        background: theme.palette.grey['50'],
        position: 'sticky',
        top: '0px',
        zIndex: 100,
    },
    container: {
        background: 'transparent',
    },
    coolingCell: {
        backgroundColor: 'rgba(0, 118, 244, 0.1)',
    },
    heatingCell: {
        backgroundColor: 'rgba(211, 19, 54, 0.1)',
    },
    headerCell: {
        borderBottom: 'none',
        padding: theme.spacing(0.5),
        color: theme.palette.grey[700],
        textAlign: 'center',
    },
    headerCellSortLabel: {
        '& > svg': {
            opacity: 1,
            '& > *': {
                fill: theme.palette.grey.main,
            },
        },
    },
    headerCellSortLabelActive: {
        '& > svg': {
            '& > *': {
                fill: theme.palette.text.primary,
            },
        },
    },
    sectionCell: {
        fontWeight: 'bold',
        paddingBottom: theme.spacing(0.5),
    },
}))
