// React
import React, { useCallback } from 'react'

// Translation
import { injectIntl } from 'react-intl'
import { injectIntlTranslation } from '@carrier/workflowui-globalfunctions'

// Material
import {
    makeStyles,
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@material-ui/core'

// Libs
import classnames from 'classnames'

import CandidateRow from './CandidateRow'

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        height: '100%',
    },
    table: {
        marginBottom: theme.spacing(10),
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(11),
        },
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing(11),
        },
    },
    tableHead: {
        background: '#f0f0f4',
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
        verticalAlign: 'bottom',
        borderBottom: 'none',
        padding: theme.spacing(0.5),
        color: theme.palette.grey[700],
        textAlign: 'center',
    },
    sectionCell: {
        fontWeight: 'bold',
        paddingBottom: theme.spacing(0.5),
    },
}))

const CandidateTable = ({ tableConfig, requestSortCallback, order, orderBy, intl }) => {
    const classes = useStyles()

    const createHeaderGroup = useCallback(() => {
        const { header } = tableConfig
        let headerGroupCompo = false

        if (header?.find((v) => v.isCooling) || header?.find((v) => v.isHeating)) {
            const tableRowContent = []
            let startColSpan

            for (let i = 0; i < header?.length; i += 1) {
                const configLine = header[i]

                if (!startColSpan) {
                    startColSpan = { type: 'standard', index: i }
                    if (configLine.isCooling) startColSpan = { type: 'cooling', index: i }
                    else if (configLine.isHeating) startColSpan = { type: 'heating', index: i }
                }

                if (i > startColSpan?.index) {
                    let deltaIndex = i === header?.length - 1 ? 1 : 0

                    switch (startColSpan?.type) {
                        case 'standard':
                            if (configLine.isCooling || configLine.isHeating || i === header?.length - 1) {
                                tableRowContent.push(
                                    <TableCell
                                        colSpan={i - startColSpan?.index + deltaIndex}
                                        className={classes.headerCell}
                                    />
                                )
                                if (configLine.isCooling) startColSpan = { type: 'cooling', index: i }
                                else if (configLine.isHeating) startColSpan = { type: 'heating', index: i }
                            }
                            break
                        case 'cooling':
                            if (!configLine.isCooling || i === header?.length - 1) {
                                tableRowContent.push(
                                    <TableCell
                                        colSpan={i - startColSpan?.index + deltaIndex}
                                        className={classnames(classes.sectionCell, classes.headerCell)}
                                    >
                                        {injectIntlTranslation(intl, 'Cooling', 'Cooling')}
                                    </TableCell>
                                )
                                if (configLine.isHeating) startColSpan = { type: 'heating', index: i }
                                else startColSpan = { type: 'standard', index: i }
                            }
                            break
                        case 'heating':
                            if (!configLine.isHeating || i === header?.length - 1) {
                                tableRowContent.push(
                                    <TableCell
                                        colSpan={i - startColSpan?.index + deltaIndex}
                                        className={classnames(classes.sectionCell, classes.headerCell)}
                                    >
                                        {injectIntlTranslation(intl, 'Heating', 'Heating')}
                                    </TableCell>
                                )
                                if (configLine.isCooling) startColSpan = { type: 'cooling', index: i }
                                else startColSpan = { type: 'standard', index: i }
                            }
                            break
                        default:
                            break
                    }
                }
            }
            return <TableRow>{tableRowContent}</TableRow>
        }

        return headerGroupCompo
    }, [tableConfig])

    const createHeaderCells = useCallback(
        () =>
            tableConfig?.header?.map((v, i) => (
                <TableCell
                    key={v.dataKey || `header_cell_${i}`}
                    className={
                        v.isCooling ? headerCellCoolingClass : v.isHeating ? headerCellHeatingClass : headerCellClass
                    }
                >
                    {v.dataKey ? (
                        <TableSortLabel
                            active={orderBy === v.dataKey}
                            direction={orderBy === v.dataKey ? order : 'asc'}
                            onClick={(event) => requestSortCallback && requestSortCallback(event, v.dataKey)}
                        >
                            {v.label}
                        </TableSortLabel>
                    ) : (
                        v.label
                    )}
                </TableCell>
            )),
        [tableConfig, order, orderBy]
    )

    const headerCellClass = classes.headerCell
    const headerCellCoolingClass = classnames(classes.coolingCell, classes.headerCell)
    const headerCellHeatingClass = classnames(classes.heatingCell, classes.headerCell)

    return (
        <TableContainer className={classes.tableContainer}>
            <MuiTable className={classes.table} id='CandidateTable'>
                <TableHead className={classes.tableHead} id='CandidateTable_head'>
                    {createHeaderGroup()}
                    <TableRow>{createHeaderCells()}</TableRow>
                </TableHead>
                <TableBody id='CandidateTable_body'>
                    {tableConfig.content.map((row) => (
                        <CandidateRow
                            id={row.id}
                            key={row.id}
                            onClick={row.onClick}
                            rowContent={row.rowContent}
                            isSelectable={row.isSelectable}
                            selected={row.selected}
                            onOpen={row.onOpen}
                            isSubGroupRow={row.isSubGroupRow}
                            isHighlighted={row.isHighlighted}
                            isError={row.isError}
                            isOpen={row.isOpen}
                            hasGroupWithOverridedHighlight={row.hasGroupWithOverridedHighlight}
                            isOverrideHighlight={row.isOverrideHighlight}
                        />
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    )
}

export default injectIntl(CandidateTable)
