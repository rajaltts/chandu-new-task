import React, { useState, useRef } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import FormBuilderField from '../formBuilder/FormBuilderField'
import classNames from 'classnames'
import { getValueForDynamicKey } from './CustomGridUtils'
import './CustomGrid.css'
import CustomTranslation from './CustomTranslation'
import { getFocusableCells } from "../../util"
import { getBooleanValue } from '@carrier/workflowui-globalfunctions'

function CustomGridBody(props) {
    const {
        rows,
        config,
        headCells,
        showCheckbox,
        selectionType = false,
        isSelected,
        editMode,
        handleEditModeRowSelection,
        handleClick,
        handleSelectOnClick,
        rowOnclickHandler,
        doNotTranslate,
        uniqueKey,
        clickOnRowHighlight,
        showDivider,
        isCellSelected,
        rowHighlightClassName,
        rowClassName,
        highlightedRowByDefault,
        columnPicker,
        columnPickerFilterError,
        handleEditModeCellSelection,
        isKeyBoardAccessible = false,
        showCellError,
        customTranslations,
        checkBoxClassname,
        handleEditCellRangeSelection
    } = props
    let rowClickTimer
    const { enable: editModeEnabled = false, editModeHighlight = false, copyAction, pasteAction } = editMode
    const { translations = null, translationsUniqueKey = '', lang, messages } = customTranslations
    const [clickedRow, setClickedRow] = useState(highlightedRowByDefault)
    const defaultEventData = {
        altKey: null,
        keyCode: null,
        ctrlKey: null,
        button: null,
        shiftKey: null,
        tabbing: false,
        previousSelection: {
            oldColumnName: null,
            oldIndex: null,
            oldSelectionId: null,
            oldCellIndex: null
        },
    }
    const eventData = useRef(defaultEventData)
    const enableRowClick = useRef(true)

    const setEnableRowClick = (isEnable) => {
        enableRowClick.current = isEnable
    }

    const handleClickHandler = (event, row, index, type) => {
        handleEditModeCellSelection([], '', '', false, true)
        handleClick(event, row, index, type)
    }

    const showSelectionCell = (isItemSelected, row, index, type) => {
        const selectionProps = {
            id: `customGridRow${index}_checkbox`,
            color: 'primary',
            checked: isItemSelected,
            onChange: (event) => handleClickHandler(event, row, index, type),
            onClick: (event) => handleSelectOnClick(event),
            onKeyDown: (event) => keyCodeHandler(event, row),
            onFocus: (event) => onFocusHandlerSelectionCell(event, true),
            inputProps: {
                'aria-label': 'select this row',
                "data-id": row[uniqueKey],
                "data-key": `cell_${index}_${-1}`,
                "data-type": 'cell',
                "data-index": index,
                "data-name": "selectionCell",
                "data-cellIndex": -1,
                "data-isCellHighlightEnabled": false
            },
            className: checkBoxClassname,
            tabIndex: isKeyBoardAccessible ? 2 : -1
        }
        return (
            <TableCell padding='checkbox'>
                {type ? <Radio {...selectionProps} /> : <Checkbox {...selectionProps} />}
            </TableCell>
        )
    }

    const handleOnClick = (row, index, event) => {
        if (clickOnRowHighlight) setClickedRow(row)
        clearTimeout(rowClickTimer)
        rowClickTimer = setTimeout(() => {
            if (enableRowClick.current && rowOnclickHandler) rowOnclickHandler(row, index, event)
        }, 300)
    }

    const getElementToFocus = (element, rowData, columnName, isShiftkeyPressed, shouldFocus = true) => {
        if (element && rowData) {
            const isCellHighlightEnabled = getBooleanValue(element.getAttribute('data-isCellHighlightEnabled'))
            if (isCellHighlightEnabled) {
                handleEditModeCellSelection(rowData, columnName, getValueForDynamicKey(rowData, uniqueKey), !isShiftkeyPressed)
            }
            else {
                if (!isShiftkeyPressed) {
                    handleEditModeCellSelection([], '', '', false, true)
                }
            }
            shouldFocus && element.focus()
        }
    }

    const getElementToFocusOnUpDownArrow = (tableBody, query, index, columnName, isShiftkeyPressed) => {
        const element = tableBody.querySelector(query)
        const rowData = rows[index]
        getElementToFocus(element, rowData, columnName, isShiftkeyPressed)
    }

    const getElementToFocusOnLeftRightArrow = (type, elementParent, query, isShiftkeyPressed, shouldFocus = true) => {
        const { focussable, index } = getFocusableCells(elementParent, query)
        let element
        if (index > -1) {
            if (type === 'previous') {
                if (index - 1 >= 0) {
                    element = focussable[index - 1]
                }
            } else {
                if (index + 1 < focussable.length) {
                    element = focussable[index + 1]
                }
            }

            if (element) {
                const cellColumnName = element.getAttribute('data-name')
                const rowIndex = element.getAttribute('data-index')
                getElementToFocus(element, rows[rowIndex], cellColumnName, isShiftkeyPressed, shouldFocus)   
            }
        }
    }

    const keyCodeHandler = (event, row, columnName) => {
        event.stopPropagation()
        if (editModeEnabled) {
            eventData.current = { ...eventData.current, tabbing: true, keyCode: event.keyCode, shiftKey: event.shiftKey, ctrlKey: event.ctrlKey, altKey: event.altKey }
            if (isKeyBoardAccessible && !event.altKey) {
                if (!event.ctrlKey) {
                    const type = event.target.getAttribute('data-type')
                    const index = event.target.getAttribute('data-index')
                    const tableBody = document.getElementsByTagName('tbody')[0]
                    const cellIndex = event.target.getAttribute('data-cellIndex')
                    if (event.keyCode === 38 && parseInt(index, 10) - 1 >= 0  && type === 'cell') {
                        //up arrow
                        event.view.event.preventDefault()
                        const newIndex = parseInt(index, 10) - 1
                        getElementToFocusOnUpDownArrow(tableBody, `[data-key="${type}_${newIndex}_${parseInt(cellIndex, 10)}"]`, newIndex, columnName, event.shiftKey)
                    } else if (event.keyCode === 40 && parseInt(index, 10) + 1 < rows.length && type === 'cell') {
                        //down arrow
                        event.view.event.preventDefault()
                        const newIndex = parseInt(index, 10) + 1
                        getElementToFocusOnUpDownArrow(tableBody, `[data-key="${type}_${newIndex}_${parseInt(cellIndex, 10)}"]`, newIndex, columnName, event.shiftKey)
                    } else if (event.keyCode === 9) {
                        //Shift + Tab or Tab
                        getElementToFocusOnLeftRightArrow(event.shiftKey ? 'previous' : 'next', tableBody, undefined, false, false)
                    } else if (event.keyCode === 37) {
                        //left arrow
                        getElementToFocusOnLeftRightArrow('previous', tableBody, 'td[tabindex="2"]', event.shiftKey)
                    } else if (event.keyCode === 39) {
                        //right arrow
                        getElementToFocusOnLeftRightArrow('next', tableBody, 'td[tabindex="2"]', event.shiftKey)
                    }
                }
                if (!event.shiftKey) {
                    if (event.ctrlKey && event.keyCode === 67) {
                        copyAction && copyAction()
                    }
                    if (event.ctrlKey && event.keyCode === 86) {
                        pasteAction && pasteAction()
                    }
                    if (!event.ctrlKey && event.keyCode === 13) {
                        if (event.target) {
                            const id = event.target.getAttribute('data-id')
                            const name = event.target.getAttribute('data-name')
                            document.dispatchEvent(new CustomEvent('enter', { detail: { id, name, target: event.target } }))
                        }
                    }
                }
            }
        }
    }

    const onFocusHandlerCell = (event, rowData, columnName, isCellHighlightEnabled) => {
        event.stopPropagation()
        if (event.currentTarget.localName === 'td' && (eventData.current.keyCode === 9 || eventData.current.keyCode === 13)) {
            if (!isCellSelected(getValueForDynamicKey(rowData, uniqueKey), columnName)) {
                handleEditModeCellSelection(rowData, columnName, getValueForDynamicKey(rowData, uniqueKey), true)
            }
            onFocusCell(event, isCellHighlightEnabled)
        }
    }
    
    const onFocusHandlerSelectionCell = (event, isCellHighlightEnabled) => {
        event.stopPropagation()
        handleEditModeCellSelection([], '', '', false, true)
        onFocusCell(event, isCellHighlightEnabled)        
    }
    
    const onFocusCell = (event, isCellHighlightEnabled) => {
        if (isCellHighlightEnabled && editModeEnabled && isKeyBoardAccessible && eventData.current.tabbing) {
            document.dispatchEvent(new CustomEvent('removeFocus', { detail: { element: event.currentTarget } }))
        }
    }

    const updatePrevSelection = (previousSelection, columnName, index, cellIndex, row) => {
        previousSelection.oldColumnName = columnName
        previousSelection.oldIndex = index
        previousSelection.oldCellIndex = cellIndex
        previousSelection.oldSelectionId = getValueForDynamicKey(row, uniqueKey)
    }

    const getColumns = (index, startIndex, endIndex) => {
        let columnNames = []
        const tableBody = document.getElementsByTagName('tbody')[0]
        for (let i = startIndex; i <= endIndex; i++) {
            const element = tableBody.querySelector(`[data-key="cell_${index}_${parseInt(i, 10)}"]`)
            if (element) {
                const columnName = element.getAttribute('data-name')
                columnNames.push(columnName)
            }
        }
        return columnNames
    }

    const onCellClick = (event, row, columnName, uniqueKeyValue, isCellHighlightEnabled, index, cellIndex) => {
        if (isCellHighlightEnabled && editModeEnabled) {
            event.stopPropagation()
            handleEditModeRowSelection([], 0, false, true)
            if (event.detail === 1) {
                eventData.current = { ...eventData.current, tabbing: false, ctrlKey: event.ctrlKey, shiftKey: event.shiftKey, altKey: event.altKey, button: event.button }
                let { altKey, shiftKey, ctrlKey, previousSelection } = eventData.current
                let { oldColumnName, oldIndex = null, oldSelectionId, oldCellIndex } = previousSelection
                if (!altKey) {
                    if (!shiftKey) {
                        const { ctrlKey, button, keyCode } = eventData.current
                        if (ctrlKey && button === 0 && keyCode === 17) {
                            handleEditModeCellSelection(row, columnName, uniqueKeyValue)
                        } else if (button === 0 && !ctrlKey && keyCode === null) {
                            handleEditModeCellSelection(row, columnName, uniqueKeyValue, true)
                        } else {
                            handleEditModeCellSelection([], '', '', false, true)
                        }
                        updatePrevSelection(previousSelection, columnName, index, cellIndex, row)
                    }
                    if (shiftKey && !ctrlKey) {
                        if (oldColumnName !== columnName && oldCellIndex !== null) {
                            let startIndex = oldCellIndex
                            let endIndex = cellIndex
                            if (startIndex > cellIndex) {
                                startIndex = cellIndex
                                endIndex = oldCellIndex
                            }
                            if (oldSelectionId === getValueForDynamicKey(row, uniqueKey)) {
                                const columnNames = getColumns(index, startIndex, endIndex)
                                handleEditCellRangeSelection(rows, index, index, [...columnNames])
                            }
                            else {
                                let startRowIndex = oldIndex
                                let endRowIndex = index
                                if (startRowIndex > endRowIndex) {
                                    startRowIndex = index
                                    endRowIndex = oldIndex
                                }
                                const columnNames = getColumns(startRowIndex, startIndex, endIndex)
                                handleEditCellRangeSelection(rows, startRowIndex, endRowIndex, [...columnNames])
                            }
                        }
                        else if (oldColumnName === columnName) {
                            let startIndex = oldIndex
                            let endIndex = index
                            if (startIndex > index) {
                                startIndex = index
                                endIndex = oldIndex
                            }
                            handleEditCellRangeSelection(rows, startIndex, endIndex, [columnName])
                        }
                        else {
                            handleEditCellRangeSelection(rows, index, index, [columnName])
                            updatePrevSelection(previousSelection, columnName, index, cellIndex, row)
                        }
                    }
                    eventData.current = { ...eventData.current, ...defaultEventData, tabbing: false, previousSelection: { ...previousSelection} }
                }     
            }
        }
    }

    return (
        <TableBody>
            {rows.map((row, index) => {
                const isItemSelected = isSelected(row)
                const rowHighlight = clickOnRowHighlight && uniqueKey && row[uniqueKey] === clickedRow[uniqueKey]
                return (
                    <>
                        <CustomTranslation
                            translations={translations}
                            translationsUniqueKey={translationsUniqueKey}
                            lang={lang}
                            messages={messages}
                            row={row}>
                            <TableRow
                                role='checkbox'
                                aria-checked={isItemSelected}
                                key={index}
                                className={classNames(
                                    editModeEnabled && editModeHighlight && isItemSelected
                                        ? 'editModeRowHighlight'
                                        : '',
                                    rowHighlight ? rowHighlightClassName || 'rowHighlight' : '',
                                    rowClassName
                                )}
                                onClick={(event) => handleOnClick(row, index, event)}>
                                {showCheckbox &&
                                    !columnPickerFilterError &&
                                    showSelectionCell(isItemSelected, row, index, selectionType)}
                                {headCells.map((head, cellIndex) => {
                                    const configItem = config[head.name] || {}
                                    const lookUpKey = configItem.lookUpKey || head.name
                                    const isCellHighlightEnabled = configItem.isCellHighlightEnabled || false
                                    const isHeaderSelectedForDisplay = columnPicker
                                        ? (head.isSelected && !columnPickerFilterError) || false
                                        : true
                                    const isCellHighlighted =
                                        editModeEnabled && editModeHighlight
                                            ? isCellSelected(getValueForDynamicKey(row, uniqueKey), lookUpKey)
                                            : false
                                    const cellHighlightStyle =
                                        editModeEnabled &&
                                        editModeHighlight &&
                                        isCellHighlighted &&
                                        isCellHighlightEnabled
                                            ? 'editModeCellHighlight'
                                            : ''
                                    const showErrorBackground = showCellError
                                        ? showCellError(row, configItem.lookUpKey)
                                        : false
                                    return isHeaderSelectedForDisplay ? (
                                        <TableCell
                                            id={cellHighlightStyle}
                                            key={head.name}
                                            align={row.textAlign || 'left'}
                                            tabIndex={isKeyBoardAccessible && isCellHighlightEnabled ? 2 : -1}
                                            data-name={head.name}
                                            data-id={row[uniqueKey]}
                                            data-key={`cell_${index}_${cellIndex}`}
                                            data-type='cell'
                                            data-index={index}
                                            data-cellIndex={cellIndex}
                                            data-isCellHighlightEnabled={isCellHighlightEnabled}
                                            className={`${showErrorBackground ? 'showErrorBackground' : ''} ${
                                                row.className || configItem.cellClassName || ''
                                            }`}
                                            onKeyDown={(event) =>
                                                keyCodeHandler(
                                                    event,
                                                    row,
                                                    lookUpKey
                                                )
                                            }
                                            onFocus={(event) =>
                                                onFocusHandlerCell(
                                                    event,
                                                    row,
                                                    lookUpKey,
                                                    isCellHighlightEnabled
                                                )
                                            }
                                            onClick={(event) =>
                                                onCellClick(
                                                    event,
                                                    row,
                                                    lookUpKey,
                                                    getValueForDynamicKey(row, uniqueKey),
                                                    isCellHighlightEnabled,
                                                    index,
                                                    cellIndex
                                                )
                                            }>
                                            <FormBuilderField
                                                doNotTranslate={doNotTranslate}
                                                rowData={row}
                                                rowIndex={index}
                                                config={configItem}
                                                value={getValueForDynamicKey(row, lookUpKey)}
                                                setEnableRowClick={setEnableRowClick}
                                                uniqueKey={uniqueKey}
                                                isKeyBoardAccessible={isKeyBoardAccessible}
                                            />
                                        </TableCell>
                                    ) : null
                                })}
                            </TableRow>
                        </CustomTranslation>
                        {showDivider ? <div className='customGridTdDivider' /> : null}
                    </>
                )
            })}
        </TableBody>
    )
}

export default CustomGridBody