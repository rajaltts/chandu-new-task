import React, { useState, useRef, useEffect } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'
import { keyboard, formatValue } from '@carrier/workflowui-globalfunctions'
import translation from '../../Translation'
import classNames from 'classnames'
import '../formBuilder.css'
import { inputStyles } from '../formBuilderStyles'

const ConfigDrivenNumberField = (props) => {
    const {
        rowData = {},
        rowIndex,
        config = {},
        value = 0,
        doNotTranslate,
        setEnableRowClick = null,
        uniqueKey,
    } = props
    const {
        step = '1',
        min = '-99999999',
        max = '99999999',
        className = null,
        onClick = null,
        onDoubleClick = null,
        isEditable = false,
        validations = {},
    } = config
    const [editable, setEditable] = useState(false)
    const [editedValue, setEditedValue] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [validationmessage, setValidationMessage] = useState('')
    const getFieldTitle = () => {
        if (onClick) {
            return doNotTranslate ? 'Click to Edit' : translation('ClickToEdit', 'Click to Edit')
        }
        if (onDoubleClick) {
            return doNotTranslate ? 'Doubleclick to Edit' : translation('DoubleclickToEdit', 'Doubleclick to Edit')
        }
        return ''
    }
    const [title] = useState(getFieldTitle())
    const [containerWidth, setContainerWidth] = useState({ width: '100%' })
    const { InputRoot } = inputStyles(containerWidth)
    const ref1 = useRef(null)

    const onkeyBoardEnterClick = (event) => {
        const { id, name } = event.detail
        if (id === rowData[uniqueKey] && name === config.lookUpKey) {
            setNumberField()
        }
    }

    useEffect(() => {
        document.addEventListener('enter', onkeyBoardEnterClick)
        return () => {
            document.removeEventListener('enter', onkeyBoardEnterClick)
        }
    }, [])

    const onClickHandler = () => {
        if (onClick) {
            setNumberField()
        }
    }

    const onDoubleClickHandler = () => {
        if (onDoubleClick) {
            setNumberField()
        }
    }

    const setNumberField = () => {
        setContainerWidth({ width: `${ref1.current.offsetWidth - 5}px` })
        setEditedValue(getFormatedValue())
        if (setEnableRowClick) setEnableRowClick(false)
        setEditable(true)
    }

    const updateValue = (event) => {
        if (checkValidation()) {
            setIsValid(true)
            if (setEnableRowClick) setEnableRowClick(true)
            setEditable(false)
            if (onClick) onClick(event, editedValue, rowData, rowIndex)
            if (onDoubleClick) onDoubleClick(event, editedValue, rowData, rowIndex)
        }
    }

    const checkValidation = () => {
        if (editedValue === value) {
            setEditable(false)
            enableRowClickWithDelay()
            return false
        }
        if (validations.validation) {
            const message = validations.validation(editedValue)
            if (message) {
                setValidationMessage(message)
                setIsValid(false)
                enableRowClickWithDelay()
                return false
            }
        }
        return true
    }

    const enableRowClickWithDelay = () => {
        setTimeout(() => {
            if (setEnableRowClick) setEnableRowClick(true)
        }, 303)
    }

    const enterKeyPressHandler = (event) => {
        event.stopPropagation()
        if (event.key === keyboard.ENTER) {
            updateValue(event)
        }
    }

    const onChangeHandler = (event) => {
        setEditedValue(event.target.value)
    }

    const getFormatedValue = () => {
        return formatValue(config, value, rowData)
    }

    const handleNumberOnClick = (event) => {
        if (onDoubleClick) {
            event.stopPropagation()
        }
    }

    const classes = classNames(className, onClick || onDoubleClick ? 'formBuilderActive' : 'formBuilderNormal')

    if (!isEditable) {
        return getFormatedValue()
    }

    return editable ? (
        <React.Fragment>
            <TextField
                type='number'
                variant='outlined'
                fullWidth
                inputProps={{ min, max, step }}
                InputProps={{
                    classes: {
                        input: InputRoot,
                    },
                }}
                value={editedValue}
                autoFocus
                margin='none'
                size='small'
                onKeyDown={enterKeyPressHandler}
                onChange={onChangeHandler}
                onBlur={updateValue}
                onClick={handleNumberOnClick}
            />
            {!isValid && (
                <span className='errorMsg'>{doNotTranslate ? validationmessage : translation(validationmessage)}</span>
            )}
        </React.Fragment>
    ) : (
        <Tooltip ref={ref1} title={title} arrow>
            <div className={classes} onClick={onClickHandler} onDoubleClick={onDoubleClickHandler}>
                {getFormatedValue()}
            </div>
        </Tooltip>
    )
}

export default ConfigDrivenNumberField
