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
    const { enable: editModeEnabled = false, editModeHighlight = false } = editMode
    const { translations = null, translationsUniqueKey = '', lang, messages } = customTranslations
    const [clickedRow, setClickedRow] = useState(highlightedRowByDefault)
    const [enableRowClick, setEnableRowClick] = useState(true)
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
            inputProps: { 'aria-label': 'select this row' },
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
            if (enableRowClick && rowOnclickHandler) rowOnclickHandler(row, index, event)
        }, 300)
    }

    const getElementToFocus = (element, rowData, columnName, isShiftkeyPressed, shouldFocus = true) => {
        if (element && rowData) {
            const isCellHighlightEnabled = element.getAttribute('data-isCellHighlightEnabled')
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

    const getElementToFocusOnLeftRightArrow = (type, elementParent, row, isShiftkeyPressed, shouldFocus = true) => {
        const { focussable, index } = getFocusableCells(elementParent)
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
            const cellColumnName = element.getAttribute('data-name')
            getElementToFocus(element, row, cellColumnName, isShiftkeyPressed, shouldFocus)
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
                        getElementToFocusOnLeftRightArrow(event.shiftKey ? 'previous' : 'next', tableBody, row, false, false)
                    } else if (event.keyCode === 37 && type === 'cell') {
                        //left arrow
                        getElementToFocusOnLeftRightArrow('previous', tableBody, row, event.shiftKey)
                    } else if (event.keyCode === 39 && type === 'cell') {
                        //right arrow
                        getElementToFocusOnLeftRightArrow('next', tableBody, row, event.shiftKey)
                    }
                }
                if (!event.shiftKey) {
                    if (event.ctrlKey && event.keyCode === 67) {
                        document.dispatchEvent(new Event('copy'))
                    }
                    if (event.ctrlKey && event.keyCode === 86) {
                        document.dispatchEvent(new Event('paste'))
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

    const onFocusHandlerCell = (event, isCellHighlightEnabled) => {
        event.stopPropagation()
        if (isCellHighlightEnabled && editModeEnabled && isKeyBoardAccessible && event.currentTarget.localName === 'td' && eventData.current.tabbing && eventData.current.keyCode === 9) {
            document.dispatchEvent(new CustomEvent('removeFocus', { detail: { element: event.currentTarget } }))
        }
    }

    const updatePrevSelection = (previousSelection, columnName, index, cellIndex, row) => {
        previousSelection.oldColumnName = columnName
        previousSelection.oldIndex = index
        previousSelection.oldCellIndex = cellIndex
        previousSelection.oldSelectionId = getValueForDynamicKey(row, uniqueKey)
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
                        if (oldSelectionId === getValueForDynamicKey(row, uniqueKey) && oldColumnName !== columnName && oldCellIndex !== null) {
                            let startIndex = oldCellIndex + 1
                            let endIndex = cellIndex
                            let columnNames = []
                            if (startIndex > cellIndex) {
                                startIndex = cellIndex
                                endIndex = oldCellIndex - 1
                            }
                            const tableBody = document.getElementsByTagName('tbody')[0]
                            for (let i = startIndex; i <= endIndex; i++) {
                                const element = tableBody.querySelector(`[data-key="cell_${index}_${parseInt(i, 10)}"]`)
                                if (element) {
                                    const columnName = element.getAttribute('data-name')
                                    columnNames.push(columnName)
                                }
                            }
                            handleEditCellRangeSelection(rows, index, index, [...columnNames])
                        }
                        else if (oldColumnName === columnName) {
                            let startIndex = oldIndex + 1
                            let endIndex = index
                            if (startIndex > index) {
                                startIndex = index + 1
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
                                tabIndex={isKeyBoardAccessible ? 2 : -1}
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
                                                    lookUpKey,
                                                    uniqueKey
                                                )
                                            }
                                            onFocus={(event) =>
                                                onFocusHandlerCell(
                                                    event,
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