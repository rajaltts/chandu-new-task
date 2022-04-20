import React, { memo, useState, useEffect } from 'react'
import FilterListIcon from '@material-ui/icons/FilterList'
import columnPickerStyles from './ColumnPickerStyles'
import ColumnPickerDialog from './ColumnPickerDialog'
import { injectIntlTranslation } from '@carrier/workflowui-globalfunctions'
import { injectIntl } from 'react-intl'
import cloneDeep from 'lodash/cloneDeep'
import classNames from 'classnames'
import { Tooltip } from '@material-ui/core'

const ColumnPicker = (props) => {
    const {
        intl,
        headCells,
        saveColumnHandler = null,
        saveColumnPickerFilterError = null,
        columnPickerFilterError = '',
    } = props
    const [togglePicker, setTogglePicker] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [columnPickerError, setColumnPickerError] = useState('')
    const [columnOptions, setColumnOptions] = useState(cloneDeep(headCells))
    const { columnRoot, columnPickerIcon, filterIcon, columnPickerIconError, filterIconError } = columnPickerStyles()

    useEffect(() => {
        setColumnOptions(cloneDeep(headCells))
    }, [headCells])

    useEffect(() => {
        if (!togglePicker) {
            const errorMessage = validationHandler()
            saveColumnPickerFilterError(errorMessage)
        }
    }, [columnOptions])

    const toggleColumnPicker = () => {
        !togglePicker && setColumnOptions(headCells)
        if (togglePicker) {
            setColumnPickerError('')
            setSearchValue('')
        }
        setTogglePicker(!togglePicker)
    }

    const saveColumnOptionsHandler = () => {
        const errorMessage = validationHandler()
        setColumnPickerError(errorMessage)
        if (saveColumnHandler && !errorMessage) {
            saveColumnHandler(columnOptions)
            toggleColumnPicker()
        }
    }

    const validationHandler = () => {
        const { maxColumnLimit = headCells.length } = props
        const selectedColumnsCount = columnOptions.filter((columnOption) => columnOption.isSelected).length
        let errorText = ''
        if (selectedColumnsCount === 0) {
            errorText = injectIntlTranslation(
                intl,
                'COLUMN_PICKER_EMPTY_SELECTION',
                'You must select at least 1 column'
            )
        } else if (selectedColumnsCount > maxColumnLimit) {
            errorText = injectIntlTranslation(
                intl,
                'COLUMN_PICKER_ERROR',
                'You can’t display more than _LIMIT_ columns'
            ).replace('_LIMIT_', maxColumnLimit)
        }
        return errorText
    }

    const resetToDefault = () => {
        let columnOptionsData = cloneDeep(headCells)
        columnOptionsData.forEach((columnOptionData) => {
            if (columnOptionData.isDefaultSelection) {
                columnOptionData.isSelected = true
            } else {
                columnOptionData.isSelected = false
            }
        })
        saveColumnHandler(columnOptionsData)
        toggleColumnPicker()
    }

    const onSelectionChangeHandler = (uniqueName, isSelected) => {
        let columnOptionsData = cloneDeep(columnOptions)
        columnOptionsData.forEach((columnOptionData) => {
            if (columnOptionData.name === uniqueName) {
                columnOptionData.isSelected = !isSelected
            }
        })
        setColumnOptions(columnOptionsData)
    }

    const onSearchQueryChangeHandler = ({ target: { value } }) => setSearchValue(value)

    return (
        <div id='columnPicker' className={columnRoot}>
            <span id='filterError' className={classNames(filterIcon, filterIconError)}>
                <span className={columnPickerIconError}>{columnPickerFilterError}</span>
            </span>
            <span id='columnPickerIcon' onClick={toggleColumnPicker} className={filterIcon}>
                <Tooltip title={injectIntlTranslation(intl, 'COLUMN_PICKER', 'Column picker')}>
                    <FilterListIcon
                        className={
                            columnPickerFilterError
                                ? classNames(columnPickerIconError, columnPickerIcon)
                                : columnPickerIcon
                        }
                    />
                </Tooltip>
            </span>
            <ColumnPickerDialog
                openDialog={togglePicker}
                toggleColumnPicker={toggleColumnPicker}
                saveColumnHandler={saveColumnOptionsHandler}
                columnOptions={columnOptions}
                resetToDefault={resetToDefault}
                onSelectionChange={onSelectionChangeHandler}
                onSearchQueryChange={onSearchQueryChangeHandler}
                searchValue={searchValue}
                errorMsg={columnPickerError}
            />
        </div>
    )
}

export default injectIntl(memo(ColumnPicker))
