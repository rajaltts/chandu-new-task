// React
import React, { useCallback } from 'react'

// Translation
import { injectIntl } from 'react-intl'
import { injectIntlTranslation } from '@carrier/workflowui-globalfunctions'

// Material
import {
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

// Local
import CandidateRow from './CandidateRow'

// Styles
import { useCandidateTableStyles } from './CandidateTable.styles'

const CandidateTable = ({
    tableConfig,
    requestSortCallback,
    order,
    orderBy,
    intl,
    headerGroupDisabled,
    overridedClasses,
}) => {
    const classes = useCandidateTableStyles()

    const createHeaderGroup = useCallback(() => {
        if (!tableConfig) return false

        const { header } = tableConfig
        let headerGroupCompo = false

        const createStandardHeader = (colSpan, isCooling = false, isHeating = false) => (
            <TableCell
                colSpan={colSpan}
                className={`${classes.headerCell} ${isCooling || isHeating ? classes.sectionCell : ''}`}
            >
                {isCooling
                    ? injectIntlTranslation(intl, 'Cooling', 'Cooling')
                    : isHeating
                    ? injectIntlTranslation(intl, 'Heating', 'Heating')
                    : ''}
            </TableCell>
        )

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
                    const lastItem = i === header?.length - 1

                    switch (startColSpan?.type) {
                        case 'standard':
                            if (configLine.isCooling || configLine.isHeating || lastItem) {
                                tableRowContent.push(createStandardHeader(i - startColSpan?.index))
                                if (configLine.isCooling) startColSpan = { type: 'cooling', index: i }
                                else if (configLine.isHeating) startColSpan = { type: 'heating', index: i }
                            }
                            break
                        case 'cooling':
                            if (!configLine.isCooling || lastItem) {
                                tableRowContent.push(createStandardHeader(i - startColSpan?.index, true))
                                if (configLine.isHeating) startColSpan = { type: 'heating', index: i }
                                else startColSpan = { type: 'standard', index: i }
                            }
                            break
                        case 'heating':
                            if (!configLine.isHeating || lastItem) {
                                tableRowContent.push(createStandardHeader(i - startColSpan?.index, false, true))
                                if (configLine.isCooling) startColSpan = { type: 'cooling', index: i }
                                else startColSpan = { type: 'standard', index: i }
                            }
                            break
                        default:
                            break
                    }

                    if (lastItem) {
                        if (configLine.isCooling) tableRowContent.push(createStandardHeader(1, true))
                        else if (configLine.isHeating) tableRowContent.push(createStandardHeader(1, false, true))
                        else tableRowContent.push(createStandardHeader(1))
                    }
                }
            }
            return <TableRow>{tableRowContent}</TableRow>
        }

        return headerGroupCompo
    }, [classes, tableConfig])

    const createHeaderCells = useCallback(() => {
        const headerCellClass = classes.headerCell
        const headerCellCoolingClass = classnames(classes.coolingCell, classes.headerCell)
        const headerCellHeatingClass = classnames(classes.heatingCell, classes.headerCell)

        return tableConfig?.header?.map((v, i) => (
            <TableCell
                key={v.dataKey || `header_cell_${i}`}
                className={
                    v.isCooling ? headerCellCoolingClass : v.isHeating ? headerCellHeatingClass : headerCellClass
                }
            >
                {v.dataKey ? (
                    <TableSortLabel
                        active={orderBy === v.dataKey}
                        className={`${classes.headerCellSortLabel} ${
                            orderBy === v.dataKey ? classes.headerCellSortLabelActive : ''
                        }`}
                        direction={orderBy === v.dataKey ? order : 'asc'}
                        onClick={(event) =>
                            requestSortCallback && requestSortCallback(v.dataKey, order === 'asc' ? 'desc' : 'asc')
                        }
                    >
                        {v.label}
                    </TableSortLabel>
                ) : (
                    v.label
                )}
            </TableCell>
        ))
    }, [tableConfig?.header, order, orderBy, classes])

    return (
        <TableContainer className={`candidateTable ${classes.tableContainer} ${overridedClasses || ''}`}>
            <MuiTable className={classes.table} id='CandidateTable'>
                <TableHead className={classes.tableHead} id='CandidateTable_head'>
                    {!headerGroupDisabled && createHeaderGroup()}
                    <TableRow>{createHeaderCells()}</TableRow>
                </TableHead>
                <TableBody id='CandidateTable_body'>
                    {tableConfig?.content?.map((row) => (
                        <CandidateRow {...row} key={row.id} />
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    )
}

export default injectIntl(CandidateTable)
