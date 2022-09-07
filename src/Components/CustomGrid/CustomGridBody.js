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
        isKeyBoardAccessible,
        showCellError,
        customTranslations,
    } = props
    let timer, cellTimer, focusCellTimer, focusRowTimer
    const { enable: editModeEnabled = false, editModeHighlight = false } = editMode
    const { translations = null, translationsUniqueKey = '', lang, messages } = customTranslations
    const [clickedRow, setClickedRow] = useState(highlightedRowByDefault)
    const [enableRowClick, setEnableRowClick] = useState(true)
    const defaultEventData = {
        keyCode: null,
        ctrlKey: null,
        button: null,
        shiftKey: null,
        tabbing: false,
    }
    const eventData = useRef(defaultEventData)

    const showSelectionCell = (isItemSelected, row, index, type) => {
        const selectionProps = {
            id: `customGridRow${index}_checkbox`,
            color: 'primary',
            checked: isItemSelected,
            onChange: (event) => handleClick(event, row, index, type),
            onClick: (event) => handleSelectOnClick(event),
            inputProps: { 'aria-label': 'select this row' },
        }
        return (
            <TableCell padding='checkbox'>
                {type ? <Radio {...selectionProps} /> : <Checkbox {...selectionProps} />}
            </TableCell>
        )
    }

    const handleOnClick = (row, index, event) => {
        if (clickOnRowHighlight) setClickedRow(row)
        clearTimeout(timer)
        if (event.detail === 1) {
            if (editModeEnabled) {
                eventData.current.ctrlKey = event.ctrlKey
                eventData.current.button = event.button
                eventData.current.tabbing = false
            }
            timer = setTimeout(() => {
                if (enableRowClick && rowOnclickHandler) rowOnclickHandler(row, index, event)
                if (editModeEnabled) {
                    handleEditModeCellSelection([], '', '', false, true)
                    const { ctrlKey, button, keyCode } = eventData.current
                    if (ctrlKey && button === 0 && keyCode === 17) {
                        handleEditModeRowSelection(row, index)
                    } else if (button === 0 && !ctrlKey && keyCode === null) {
                        handleEditModeRowSelection(row, index, true)
                    } else {
                        handleEditModeRowSelection([], 0, false, true)
                    }
                    eventData.current = defaultEventData
                    eventData.current.tabbing = false
                }
            }, 300)
        }
    }

    const keyCodeHandler = (event) => {
        if (editModeEnabled) {
            eventData.current.keyCode = event.keyCode
            eventData.current.tabbing = true
            if (isKeyBoardAccessible && !event.altKey) {
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
                            document.dispatchEvent(new CustomEvent('enter', { detail: { id, name } }))
                        }
                    }
                }
                if (!event.ctrlKey) {
                    eventData.current.shiftKey = event.shiftKey
                    const type = event.target.getAttribute('data-type')
                    const index = event.target.getAttribute('data-index')
                    const tableBody = document.getElementsByTagName('tbody')[0]
                    const cellIndex = event.target.getAttribute('data-cellIndex')
                    if (event.keyCode === 38 && index - 1 >= 0) {
                        event.view.event.preventDefault()
                        if (type === 'row') {
                            tableBody.querySelector(`[data-key="${type}_${parseInt(index, 10) - 1}"]`).focus()
                        } else if (type === 'cell') {
                            tableBody
                                .querySelector(
                                    `[data-key="${type}_${parseInt(index, 10) - 1}_${parseInt(cellIndex, 10)}"]`
                                )
                                .focus()
                        }
                    } else if (event.keyCode === 40 && index + 1 < rows.length) {
                        event.view.event.preventDefault()
                        if (type === 'row') {
                            tableBody.querySelector(`[data-key="${type}_${parseInt(index, 10) + 1}"]`).focus()
                        } else if (type === 'cell') {
                            tableBody
                                .querySelector(
                                    `[data-key="${type}_${parseInt(index, 10) + 1}_${parseInt(cellIndex, 10)}"]`
                                )
                                .focus()
                        }
                    } else if (event.keyCode === 37) {
                        if (type === 'cell') {
                            focusCellElement('previous', tableBody)
                        }
                    } else if (event.keyCode === 39) {
                        if (type === 'cell') {
                            focusCellElement('next', tableBody)
                        }
                    }
                }
            }
        }
    }

    const focusCellElement = (type, elementParent) => {
        let focussable = Array.prototype.filter.call(elementParent.querySelectorAll('td[tabindex="2"]'), (element) => {
            return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
        })
        let index = focussable.indexOf(document.activeElement)
        if (index > -1) {
            if (type === 'previous') {
                if (index - 1 >= 0) {
                    let previousElement = focussable[index - 1]
                    previousElement.focus()
                }
            } else {
                if (index + 1 < focussable.length) {
                    let nextElement = focussable[index + 1]
                    nextElement.focus()
                }
            }
        }
    }

    const onCellClick = (event, row, columnName, uniqueKeyValue, isCellHighlightEnabled) => {
        if (isCellHighlightEnabled && editModeEnabled) {
            event.stopPropagation()
            handleEditModeRowSelection([], 0, false, true)
            clearTimeout(cellTimer)
            if (event.detail === 1) {
                eventData.current.ctrlKey = event.ctrlKey
                eventData.current.button = event.button
                eventData.current.tabbing = false
                cellTimer = setTimeout(() => {
                    const { ctrlKey, button, keyCode } = eventData.current
                    if (ctrlKey && button === 0 && keyCode === 17) {
                        handleEditModeCellSelection(row, columnName, uniqueKeyValue)
                    } else if (button === 0 && !ctrlKey && keyCode === null) {
                        handleEditModeCellSelection(row, columnName, uniqueKeyValue, true)
                    } else {
                        handleEditModeCellSelection([], '', '', false, true)
                    }
                    eventData.current = defaultEventData
                    eventData.current.tabbing = false
                }, 300)
            }
        }
    }

    const onFocusHandlerRow = (row, index, event) => {
        event.stopPropagation()
        if (event.target.localName === 'tr') {
            eventData.current.tabbing = true
            clearTimeout(focusRowTimer)
            document.dispatchEvent(new CustomEvent('removeFocus', { detail: { element: event.target } }))
            focusRowTimer = setTimeout(() => {
                if (eventData.current.tabbing) {
                    const isShiftPressed = eventData.current.shiftKey === null ? false : eventData.current.shiftKey
                    handleEditModeCellSelection([], '', '', false, true)
                    handleEditModeRowSelection(row, index, !isShiftPressed)
                }
            }, 400)
        }
    }

    const onFocusHandlerCell = (event, row, columnName, uniqueKeyValue, isCellHighlightEnabled) => {
        event.stopPropagation()
        if (isCellHighlightEnabled && editModeEnabled) {
            if (event.target.localName === 'td') {
                eventData.current.tabbing = true
                clearTimeout(focusCellTimer)
                document.dispatchEvent(new CustomEvent('removeFocus', { detail: { element: event.target } }))
                focusCellTimer = setTimeout(() => {
                    if (eventData.current.tabbing) {
                        const isShiftPressed = eventData.current.shiftKey === null ? false : eventData.current.shiftKey
                        const isShiftTabKeyCodePressed = eventData.current.keyCode === 9
                        handleEditModeRowSelection([], 0, false, true)
                        handleEditModeCellSelection(
                            row,
                            columnName,
                            uniqueKeyValue,
                            !(!isShiftTabKeyCodePressed && isShiftPressed)
                        )
                    }
                }, 400)
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
                                onClick={(event) => handleOnClick(row, index, event)}
                                onKeyDown={keyCodeHandler}
                                onFocus={(event) => onFocusHandlerRow(row, index, event)}
                                data-key={`row_${index}`}
                                data-type='row'
                                data-index={index}>
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
                                            className={`${showErrorBackground ? 'showErrorBackground' : ''} ${
                                                row.className || configItem.cellClassName || ''
                                            }`}
                                            onFocus={(event) =>
                                                onFocusHandlerCell(
                                                    event,
                                                    row,
                                                    lookUpKey,
                                                    getValueForDynamicKey(row, uniqueKey),
                                                    isCellHighlightEnabled
                                                )
                                            }>
                                            <div
                                                onKeyDown={keyCodeHandler}
                                                onClick={(event) =>
                                                    onCellClick(
                                                        event,
                                                        row,
                                                        lookUpKey,
                                                        getValueForDynamicKey(row, uniqueKey),
                                                        isCellHighlightEnabled
                                                    )
                                                }>
                                                <FormBuilderField
                                                    doNotTranslate={doNotTranslate}
                                                    rowData={row}
                                                    rowIndex={index}
                                                    config={configItem}
                                                    value={getValueForDynamicKey(row, lookUpKey)}
                                                    setEnableRowClick={setEnableRowClick}
                                                />
                                            </div>
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
