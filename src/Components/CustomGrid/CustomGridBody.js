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
    } = props
    let timer, cellTimer
    const { enable: editModeEnabled = false, editModeHighlight = false } = editMode
    const [clickedRow, setClickedRow] = useState(highlightedRowByDefault)
    const [enableRowClick, setEnableRowClick] = useState(true)
    const defaultEventData = {
        keyCode: null,
        ctrlKey: null,
        button: null,
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
                }
            }, 300)
        }
    }

    const keyCodeHandler = (event) => {
        if (editModeEnabled) {
            eventData.current.keyCode = event.keyCode
            if (isKeyBoardAccessible && !event.altKey && !event.shiftKey) {
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
        }
    }

    const onFocusOutHandler = (event) => {
        if (event.target && editModeEnabled && isKeyBoardAccessible) {
            const id = event.target.getAttribute('data-id')
            const name = event.target.getAttribute('data-name')
            document.dispatchEvent(new CustomEvent('blur', { detail: { id, name } }))
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
                }, 300)
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
                        <TableRow
                            role='checkbox'
                            aria-checked={isItemSelected}
                            tabIndex={isKeyBoardAccessible ? 2 : -1}
                            key={index}
                            className={classNames(
                                editModeEnabled && editModeHighlight && isItemSelected ? 'editModeRowHighlight' : '',
                                rowHighlight ? rowHighlightClassName || 'rowHighlight' : '',
                                rowClassName
                            )}
                            onClick={(event) => handleOnClick(row, index, event)}
                            onKeyDown={keyCodeHandler}>
                            {showCheckbox &&
                                !columnPickerFilterError &&
                                showSelectionCell(isItemSelected, row, index, selectionType)}
                            {headCells.map((head) => {
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
                                    editModeEnabled && editModeHighlight && isCellHighlighted && isCellHighlightEnabled
                                        ? 'editModeCellHighlight'
                                        : ''
                                return isHeaderSelectedForDisplay ? (
                                    <TableCell
                                        id={cellHighlightStyle}
                                        key={head.name}
                                        align={row.textAlign || 'left'}
                                        tabIndex={isKeyBoardAccessible ? 2 : -1}
                                        data-name={head.name}
                                        data-id={row[uniqueKey]}
                                        onFocusOut={onFocusOutHandler}
                                        className={row.className || configItem.cellClassName || ''}>
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
                        {showDivider ? <div className='customGridTdDivider' /> : null}
                    </>
                )
            })}
        </TableBody>
    )
}

export default CustomGridBody
