import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import LinearProgress from '@material-ui/core/LinearProgress'
import { sortingOrder } from '@carrier/workflowui-globalfunctions'
import CustomGridHead from './CustomGridHead'
import CustomGridPagination from './CustomGridPagination'
import CustomGridBody from './CustomGridBody'
import CustomGridSearch from './CustomGridSearch'
import './CustomGrid.css'
import translation from '../Translation'
import ColumnPicker from './columnPicker/ColumnPicker'
import { getValueForDynamicKey } from './CustomGridUtils'

/* eslint-disable */

function CustomGrid(props) {
    const { ascending, descending } = sortingOrder
    const {
        selectedRows = [],
        rows = [],
        headCells,
        rowsPerPageOptions,
        config = {},
        showCheckbox,
        rowsToShowPerPage,
        sortable,
        orderByfield,
        uniqueKey = 'customGrid',
        rowCheckboxHandler,
        rowOnclickHandler,
        hidePagination,
        hideSearch,
        onSearch,
        isLoading,
        gridClassName,
        singleSelectGrid = false,
        doNotTranslate = true,
        id = 'customGrid',
        sorting = ascending,
        gridStateHandler,
        pageNumber,
        stateLessGrid = false,
        totalPageCount = rows.length,
        showLinearProgress = false,
        clickOnRowHighlight = false,
        rowHighlightClassName = null,
        rowClassName = null,
        highlightedRowByDefault = {},
        columnPicker = false,
        saveColumnHandler,
        maxColumnLimit,
        paginationClass,
        columnGrouping = false,
        columnGroupConfig = {},
        editMode = {},
        showDivider = false,
        reset = false,
        hideHeader = false,
        isKeyBoardAccessible = false,
        showCellError = null,
        customTranslations = {},
        checkBoxClassname,
        rowObjectForId = '',
        gridName=''
    } = props
    const { enable: editModeEnabled = false, editModeSelectionsHandler = null } = editMode
    const [order, setOrder] = useState(sorting)
    const [columnPickerFilterError, setColumnPickerFilterError] = useState('')
    const [orderBy, setOrderBy] = useState(orderByfield)
    const [selected, setSelected] = useState(selectedRows)
    const [selectedCells, setSelectedCells] = useState({})
    const [page, setPage] = useState(pageNumber || 0)
    const [resetGrid, setResetGrid] = useState(reset)
    const [rowsPerPage, setRowsPerPage] = useState(rowsToShowPerPage)
    const [initialRowData, setInitialRowData] = useState(rows)
    const [searchText, setSearchText] = useState('')
    const [isAllPaginationSelected, setIsAllPaginationSelected] = useState(false)

    useEffect(() => {
        setResetGrid(reset)
    }, [reset])

    useEffect(() => {
        if (resetGrid) {
            handleSelectAllClick({ target: { checked: false } })
            editModeEnabled && setSelectedCells({})
            setResetGrid(false)
        }
    }, [resetGrid])

    useEffect(() => {
        if (!rowsPerPage || isAllPaginationSelected) {
            setRowsPerPage(rows.length)
        }
        if (!initialRowData.length && rows.length) {
            setInitialRowData(rows)
        }
    }, [rows, rowsPerPage, initialRowData])

    useEffect(() => {
        setSelected(
            selected.filter((item) => {
                const element = rows.find((row) => row[uniqueKey] === item[uniqueKey])
                if (element) {
                    return true
                }
                return false
            })
        )
    }, [rows])

    useEffect(() => {
        if (stateLessGrid) {
            setRowsPerPage(rowsToShowPerPage)
            setOrderBy(orderByfield)
            setPage(pageNumber)
            setOrder(sorting)
        }
    }, [rowsToShowPerPage, pageNumber, orderByfield, sorting])

    useEffect(() => {
        gridStateHandler && gridStateHandler({ order, orderBy, rowsPerPage, page })
    }, [order, orderBy, rowsPerPage, page])

    useEffect(() => {
        pageNumber >= 0 && page !== pageNumber && handleChangePage(pageNumber)
    }, [pageNumber])

    useEffect(() => {
        if (order !== sorting) {
            setOrder(sorting)
        }
    }, [sorting])

    const getCurrentPageRecord = (records) => {
        return records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === ascending
        setOrder(isAsc ? descending : ascending)
        setOrderBy(property)
    }

    const handleSelectAllClickHandler = (event) => {
        setSelectedCells({})
        handleSelectAllClick(event)
    }

    const handleSelectAllClick = ({ target: { checked } }) => {
        if (checked) {
            setSelected(sortedRows)
            editModeSelectionsHandler && editModeSelectionsHandler({ selectedRows: sortedRows, selectedColumns: {} })
            rowCheckboxHandler && rowCheckboxHandler(sortedRows)
        } else {
            setSelected([])
            editModeSelectionsHandler && editModeSelectionsHandler({ selectedRows: [], selectedColumns: {} })
            rowCheckboxHandler && rowCheckboxHandler([])
        }
    }

    const handleClick = ({ target: { checked } }, row, index, type) => {
        if (type) {
            handleSingleSelectClick(row)
        } else {
            handleMultiSelectClick(checked, row, index)
        }
    }

    const handleSingleSelectClick = (row) => {
        setSelected([row])
        if (rowCheckboxHandler) {
            rowCheckboxHandler([row])
        }
        if (editModeSelectionsHandler) {
            editModeSelectionsHandler({ selectedRows: [row], selectedColumns: {} })
        }
    }

    const handleSelectOnClick = (event) => {
        if (rowOnclickHandler) {
            event.stopPropagation()
        }
    }

    const handleMultiSelectClick = (checked, row, index, selectedRowIndex) => {
        let newSelected = [...selected]
        if (checked) {
            newSelected.push(row)
            setSelected(newSelected)
        } else {
            const selectedIndex = selectedRowIndex || findSelectedRowIndex(newSelected, row)
            newSelected.splice(selectedIndex, 1)
            setSelected([...newSelected])
        }

        if (rowCheckboxHandler) {
            rowCheckboxHandler(newSelected)
        }
        if (editModeSelectionsHandler) {
            editModeSelectionsHandler({ selectedRows: newSelected, selectedColumns: {} })
        }
    }

    const findSelectedRowIndex = (selectedRows, row) => {
        let selectedIndex = -1
        selectedRows.some((item, index) => {
            if (item[uniqueKey] === row[uniqueKey]) {
                selectedIndex = index
                return true
            }
            return false
        })
        return selectedIndex
    }

    const handleEditModeRowSelection = (row, index, isSingleSelect = false, clearSelected = false) => {
        if (clearSelected) {
            handleSelectAllClick({ target: { checked: false } })
        } else {
            const selectedIndex = findSelectedRowIndex([...selected], row)
            const isUnChecked = selectedIndex > -1 ? false : true
            if (isSingleSelect) {
                if (isUnChecked) {
                    handleSingleSelectClick(row)
                } else {
                    handleSelectAllClick({ target: { checked: false } })
                }
            } else {
                handleMultiSelectClick(isUnChecked, row, index, selectedIndex)
            }
        }
    }

    const handleEditCellRangeSelection = (rows, startIndex, endIndex, columnNames) => {
        handleSelectAllClick({ target: { checked: false } })
        let updatedCells = {}
        for (let i = startIndex; i <= endIndex; i++) {
            const id = getValueForDynamicKey(rows[i], uniqueKey)
            const isContainsKey = updatedCells.hasOwnProperty(id)
            if (isContainsKey) {
                columnNames.forEach(columnName => {
                    const index = updatedCells[id].columnNames.indexOf(columnName)
                    if (index <= -1) {
                        updatedCells[id].columnNames.push(columnName)
                    }
                })
                if (!updatedCells[id].columnNames.length) {
                    delete updatedCells[id]
                }
            }
            else {
                let updateInfo = {
                    [id]: {
                        rowData: rows[i],
                        columnNames: [...columnNames],
                    }
                }
                updatedCells = { ...updatedCells, ...updateInfo }
            }
            setSelectedCells(updatedCells)
            editModeSelectionsHandler &&
                editModeSelectionsHandler({ selectedRows: [], selectedColumns: updatedCells })
        }
    }

    const handleEditModeCellSelection = (row, columnName, id, isSingleSelect = false, clearSelections = false, runSelectAllClick = true) => {
        runSelectAllClick && handleSelectAllClick({ target: { checked: false } })
        if (clearSelections) {
            setSelectedCells({})
            editModeSelectionsHandler && editModeSelectionsHandler({ selectedRows: [], selectedColumns: {} })
        } else {
            let updateInfo = {
                [id]: {
                    rowData: row,
                    columnNames: [columnName],
                },
            }
            const isContainsKey = selectedCells.hasOwnProperty(id)
            if (isSingleSelect) {
                if (isContainsKey) {
                    if (selectedCells[id].columnNames.indexOf(columnName) > -1) {
                        setSelectedCells({})
                        editModeSelectionsHandler &&
                            editModeSelectionsHandler({ selectedRows: [], selectedColumns: {} })
                    } else {
                        setSelectedCells(updateInfo)
                        editModeSelectionsHandler &&
                            editModeSelectionsHandler({ selectedRows: [], selectedColumns: updateInfo })
                    }
                } else {
                    setSelectedCells(updateInfo)
                    editModeSelectionsHandler &&
                        editModeSelectionsHandler({ selectedRows: [], selectedColumns: updateInfo })
                }
            } else if (isContainsKey) {
                let newColumns = [...selectedCells[id].columnNames]
                if (newColumns.indexOf(columnName) > -1) {
                    newColumns = newColumns.filter((column) => column !== columnName)
                } else {
                    newColumns = [...newColumns, columnName]
                }
                updateInfo[id].columnNames = newColumns
                const updatedCells = {
                    ...selectedCells,
                    ...updateInfo,
                }
                const filteredCells = Object.keys(updatedCells)
                    .filter((key) => !!updatedCells[key].columnNames.length)
                    .reduce((res, key) => ((res[key] = updatedCells[key]), res), {})
                setSelectedCells(filteredCells)
                editModeSelectionsHandler &&
                    editModeSelectionsHandler({ selectedRows: [], selectedColumns: filteredCells })
            } else {
                const updatedCells = {
                    ...selectedCells,
                    ...updateInfo,
                }
                setSelectedCells(updatedCells)
                editModeSelectionsHandler &&
                    editModeSelectionsHandler({ selectedRows: [], selectedColumns: updatedCells })
            }
        }
    }

    const isCellSelected = (uniqueKeyValue, columnName) => {
        if (selectedCells.hasOwnProperty(uniqueKeyValue)) {
            return selectedCells[uniqueKeyValue].columnNames.indexOf(columnName) > -1
        }
        return false
    }

    const handleChangePage = (newPage) => {
        setPage(newPage)
        handleSelectAllClick({ target: { checked: false } })
    }

    const handleChangeRowsPerPage = ({ target: { value } }) => {
        if (typeof value === 'string' && value.toLowerCase() === 'all') {
            value = rows.length
            !isAllPaginationSelected && setIsAllPaginationSelected(true)
        } else {
            isAllPaginationSelected && setIsAllPaginationSelected(false)
        }
        setRowsPerPage(parseInt(value, 10))
        setPage(0)
        handleSelectAllClick({ target: { checked: false } })
    }

    const onSearchHandler = (event) => {
        const value = event.target.value
        onSearch && onSearch(event)
        setSearchText(value)
    }

    const isSelected = (row) => {
        return selected.some((item) => item[uniqueKey] === row[uniqueKey])
    }

    const getRowLength = () => {
        return stateLessGrid ? totalPageCount : rows.length
    }

    const saveColumnPickerFilterError = (errorMessage) => setColumnPickerFilterError(errorMessage)

    const sliceRecords = (records) => {
        if (!stateLessGrid) {
            return getCurrentPageRecord(records)
        }
        return records
    }

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index])
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0])
            if (order !== 0) return order
            return a[1] - b[1]
        })
        return stabilizedThis.map((el) => el[0])
    }

    const getComparator = (order, orderBy) => {
        if (order === sortingOrder.descending) {
            return (a, b) => descendingComparator(a, b, orderBy)
        }
        return (a, b) => -descendingComparator(a, b, orderBy)
    }

    const descendingComparator = (a, b, orderBy) => {
        const orderByKey = (config[orderBy] && config[orderBy].lookUpKey) || orderBy
        const aValue = getValueForDynamicKey(a, orderByKey)
        const bValue = getValueForDynamicKey(b, orderByKey)
        const firstArg = getValueForCompare(config, aValue)
        const secondArg = getValueForCompare(config, bValue)
        if (secondArg < firstArg) {
            return -1
        }
        if (secondArg > firstArg) {
            return 1
        }
        return 0
    }

    const getValueForCompare = (config, value) => {
        if (typeof value === 'string') {
            if (config[orderBy] && config[orderBy].isNumericSort) {
                return parseFloat(value.toLowerCase())
            }
            return value.toLowerCase()
        }
        return value
    }

    const sortedRows = sliceRecords(stableSort(rows, getComparator(order, orderBy)))

    return (
        <div id={id} className='customGrid'>
            {!hideSearch && <CustomGridSearch onSearch={onSearchHandler} />}
            <div id={`${id}_root`} className={`root ${gridClassName || ''}`}>
                <Paper className='paper'>
                    {columnPicker && !hideHeader && (
                        <ColumnPicker
                            headCells={headCells}
                            saveColumnHandler={saveColumnHandler}
                            maxColumnLimit={maxColumnLimit || headCells.length}
                            saveColumnPickerFilterError={saveColumnPickerFilterError}
                            columnPickerFilterError={columnPickerFilterError}
                        />
                    )}
                    {showLinearProgress && <LinearProgress />}
                    <div id={`${id}_table`} className={'tableWrapper'}>
                        <Table stickyHeader className='table' size={'medium'}>
                            {!hideHeader && (
                                <CustomGridHead
                                    headCells={headCells}
                                    columnPicker={columnPicker}
                                    order={order}
                                    orderBy={orderBy}
                                    sortable={sortable}
                                    numSelected={selected.length}
                                    rowCount={sortedRows.length}
                                    showCheckbox={showCheckbox}
                                    singleSelectGrid={singleSelectGrid}
                                    onSelectAllClick={handleSelectAllClickHandler}
                                    onRequestSort={handleRequestSort}
                                    doNotTranslate={doNotTranslate}
                                    columnPickerFilterError={columnPickerFilterError}
                                    paginationClass={paginationClass}
                                    columnGrouping={columnGrouping}
                                    columnGroupConfig={columnGroupConfig}
                                    checkBoxClassname={checkBoxClassname}
                                    isKeyBoardAccessible={isKeyBoardAccessible}
                                />
                            )}
                            {!!getRowLength() && (
                                <CustomGridBody
                                    gridName={gridName}
                                    isLoading={isLoading}
                                    gridClassName={gridClassName}
                                    headCells={headCells}
                                    columnPicker={columnPicker}
                                    showCheckbox={showCheckbox}
                                    rows={sortedRows}
                                    rowOnclickHandler={rowOnclickHandler}
                                    isSelected={isSelected}
                                    handleClick={handleClick}
                                    handleSelectOnClick={handleSelectOnClick}
                                    selectionType={singleSelectGrid}
                                    config={config}
                                    doNotTranslate={doNotTranslate}
                                    uniqueKey={uniqueKey}
                                    clickOnRowHighlight={clickOnRowHighlight}
                                    rowHighlightClassName={rowHighlightClassName}
                                    rowClassName={rowClassName}
                                    highlightedRowByDefault={highlightedRowByDefault}
                                    columnPickerFilterError={columnPickerFilterError}
                                    editMode={editMode}
                                    handleEditModeRowSelection={handleEditModeRowSelection}
                                    handleEditModeCellSelection={handleEditModeCellSelection}
                                    handleEditCellRangeSelection={handleEditCellRangeSelection}
                                    isCellSelected={isCellSelected}
                                    showDivider={showDivider}
                                    isKeyBoardAccessible={isKeyBoardAccessible}
                                    showCellError={showCellError}
                                    customTranslations={customTranslations}
                                    checkBoxClassname={checkBoxClassname}
                                    rowObjectForId={rowObjectForId}
                                />
                            )}
                        </Table>
                        {!getRowLength() && (
                            <div
                                className={`messageContainer${!gridClassName ? ' messageContainerDefaultHeight' : ''}`}>
                                {isLoading ? (
                                    <CircularProgress />
                                ) : (
                                    <div id={`${id}NoRecodsFound`}>
                                        {doNotTranslate ? 'No records found' : translation('NoRecordsAvailable')}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {!hidePagination && (
                        <CustomGridPagination
                            rowsPerPageOptions={rowsPerPageOptions}
                            isAllPaginationSelected={isAllPaginationSelected}
                            component='div'
                            rowsLength={getRowLength()}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            searchText={searchText}
                            initialRowData={initialRowData}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            doNotTranslate={doNotTranslate}
                            paginationClass={paginationClass}
                        />
                    )}
                </Paper>
            </div>
        </div>
    )
}

export default CustomGrid
