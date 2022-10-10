import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { sortingOrder } from '@carrier/workflowui-globalfunctions'
import './CustomGrid.css'

const sortingIcon = () => {
    return (
        <div className='headerColumn'>
            <ArrowDropUpIcon fontSize='small' />
            <ArrowDropDownIcon fontSize='small' className='sortingIcon' />
        </div>
    )
}

const CustomGridHead = (props) => {
    const { ascending, descending } = sortingOrder
    const {
        order,
        orderBy,
        onRequestSort,
        headCells,
        sortable,
        onSelectAllClick,
        showCheckbox,
        paginationClass,
        singleSelectGrid,
        rowCount,
        numSelected,
        columnPicker,
        columnPickerFilterError,
        columnGrouping,
        columnGroupConfig,
        checkBoxClassname
    } = props

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    const showHeader = (cell) => {
        const { displayName, name, subHeader, showCheckbox } = cell
        return (
            <div className='headerColumn'>
                <span>
                    {displayName || name}
                    {showCheckbox && (
                        <Checkbox
                            id={`${name}_checkbox`}
                            color='primary'
                            onChange={(event) => {
                                if (cell.onChange) cell.onChange(event.target.checked, cell)
                            }}
                            className={checkBoxClassname}
                            inputProps={{ 'aria-label': 'select this column' }}
                        />
                    )}
                </span>
                {subHeader && <span className='headerColumnSubTitle'>{subHeader}</span>}
            </div>
        )
    }

    const showCheckboxCell = (singleSelectGrid) => {
        return (
            <TableCell padding='checkbox'>
                {!singleSelectGrid && (
                    <Checkbox
                        id='selectAllRowsCustomGrid'
                        color='primary'
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        className={checkBoxClassname}
                        inputProps={{ 'aria-label': 'select all rows' }}
                    />
                )}
            </TableCell>
        )
    }

    const shouldDisplayHeader = (cell) => (columnPicker ? (cell.isSelected && !columnPickerFilterError) || false : true)

    const showColumnGroups = (headCells = [], showCheckbox = false) => {
        if (headCells.length) {
            return (
                <TableRow>
                    {fetchOccurenceCounts(headCells, 'columnGrp1', showCheckbox).map((groupCell) => {
                        const { key, colSpan } = groupCell
                        const configItem = columnGroupConfig[key] || {}
                        const configDefaultItem = columnGroupConfig['default'] || {}
                        const alignment = configItem.alignment || configDefaultItem.alignment || 'center'
                        const className = configItem.className || configDefaultItem.className || null
                        return (
                            <TableCell
                                key={key}
                                align={alignment}
                                padding={'default'}
                                colSpan={colSpan}
                                className={className}>
                                <div className='headerColumn'>
                                    <span>{key}</span>
                                </div>
                            </TableCell>
                        )
                    })}
                </TableRow>
            )
        }
        return null
    }

    const fetchOccurenceCounts = (headCells, key, showCheckbox) => {
        const countResult = headCells.map((header) => (header[key] ? header[key] : null))
        let countOccurence = showCheckbox ? [{ key: null, colSpan: 1 }] : []
        let count = 0
        let countkey = null
        countResult.forEach((key) => {
            if (countkey === key) {
                count++
            } else {
                countOccurence.push({ key: [countkey], colSpan: count })
                count = 0
                countkey = key
                count++
            }
        })
        if (count) countOccurence.push({ key: [countkey], colSpan: count })
        return countOccurence
    }

    const headCellsData = headCells.length ? headCells : [{ name: '' }]
    return (
        <TableHead className='tableHead'>
            {columnGrouping && showColumnGroups(headCells, showCheckbox)}
            <TableRow>
                {showCheckbox && showCheckboxCell(singleSelectGrid)}
                {headCellsData.map((cell) => {
                    const { name, disableSorting, className, textAlign, sortingClassName } = cell
                    return shouldDisplayHeader(cell) ? (
                        <TableCell
                            key={name}
                            align={textAlign || 'left'}
                            padding={'default'}
                            sortDirection={orderBy === name ? order : false}
                            IconComponent={false}
                            className={className}>
                            {sortable && !disableSorting ? (
                                <TableSortLabel
                                    active={orderBy === name}
                                    direction={orderBy === name ? order : ascending}
                                    onClick={createSortHandler(name)}
                                    IconComponent={paginationClass ? sortingIcon : ArrowDropDownIcon}
                                    className={sortingClassName}>
                                    {showHeader(cell)}

                                    {orderBy === name ? (
                                        <span className='visuallyHidden'>
                                            {order === descending ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                    ) : null}
                                </TableSortLabel>
                            ) : (
                                <TableSortLabel
                                    active={false}
                                    direction={orderBy === name ? order : ascending}
                                    onClick={null}
                                    hideSortIcon
                                    className={`defaultCursor ${sortingClassName}`}>
                                    {showHeader(cell)}
                                </TableSortLabel>
                            )}
                        </TableCell>
                    ) : null
                })}
            </TableRow>
        </TableHead>
    )
}

export default CustomGridHead
