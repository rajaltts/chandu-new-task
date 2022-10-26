import React, { useState, useRef, useEffect } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'
import { keyboard, formatValue } from '@carrier/workflowui-globalfunctions'
import translation from '../../Translation'
import classNames from 'classnames'
import '../formBuilder.css'
import { inputStyles } from '../formBuilderStyles'

const ConfigDrivenTextBoxField = (props) => {
    const { rowData = {}, rowIndex, config = {}, value = '', doNotTranslate, setEnableRowClick } = props
    const {
        className = null,
        onClick = null,
        onDoubleClick = null,
        isEditable = false,
        validations = {},
        validationsOnLoading = false,
    } = config
    const [isValid, setIsValid] = useState(true)
    const [editable, setEditable] = useState(false)
    const [editedValue, setEditedValue] = useState(false)
    const validateValue = () => {
        if (validationsOnLoading && validations.validation) {
            const message = validations.validation(value)
            if (message) {
                return true
            }
            return false
        }
        return false
    }

    const getFieldTitle = () => {
        if (isInValidName) {
            return doNotTranslate
                ? 'Special characters \',",<,>,#,&,\\,/ are not allowed.'
                : translation(
                      'SpecialCharactersNotAllowedTagName',
                      'Special characters \',",<,>,#,&,\\,/ are not allowed.'
                  )
        }
        if (onClick) {
            return doNotTranslate ? 'Click to Edit' : translation('ClickToEdit', 'Click to Edit')
        }
        if (onDoubleClick) {
            return doNotTranslate ? 'Doubleclick to Edit' : translation('DoubleclickToEdit', 'Doubleclick to Edit')
        }
        return ''
    }
    const [isInValidName, setisInValidName] = useState(validateValue())
    const [title, setTitle] = useState(getFieldTitle())
    const [validationmessage, setValidationMessage] = useState({ width: '100%' })
    const [containerWidth, setContainerWidth] = useState({ width: '100%' })
    const { InputRoot } = inputStyles(containerWidth)
    const ref1 = useRef(null)

    useEffect(() => {
        setTitle(getFieldTitle())
    }, [isInValidName])

    useEffect(() => {
        const isValid = validateValue()
        if (isValid !== isInValidName) {
            setisInValidName(isValid)
        }
    }, [value])

    const onClickHandler = () => {
        if (onClick) {
            setTextBoxField()
        }
    }

    const onDoubleClickHandler = () => {
        if (onDoubleClick) {
            setTextBoxField()
        }
    }

    const setTextBoxField = () => {
        setContainerWidth({ width: `${ref1.current.offsetWidth - 5}px` })
        setEditedValue(getFormatedValue())
        setEnableRowClick(false)
        setEditable(true)
    }

    const updateValue = (event) => {
        if (checkValidation()) {
            setIsValid(true)
            setEnableRowClick(true)
            setEditable(false)
            if (onClick) onClick(event, editedValue, rowData, rowIndex)
            if (onDoubleClick) onDoubleClick(event, editedValue, rowData, rowIndex)
        }
    }

    const checkValidation = () => {
        if (editedValue === value) {
            setIsValid(true)
            enableRowClickWithDelay()
            setEditable(false)
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
            setEnableRowClick(true)
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

    const handleTextBoxOnClick = (event) => {
        if (onDoubleClick) {
            event.stopPropagation()
        }
    }

    const classes = classNames(
        className,
        isInValidName && 'formBuilderInvalid',
        onClick || onDoubleClick ? 'formBuilderActive' : 'formBuilderNormal'
    )

    if (!isEditable) {
        return <span id="textField">{getFormatedValue()}</span>
    }

    return (
        <div ref={ref1}>
            {editable ? (
                <React.Fragment>
                    <TextField
                        fullWidth
                        variant='outlined'
                        value={editedValue}
                        InputProps={{
                            classes: {
                                input: InputRoot,
                            },
                        }}
                        autoFocus
                        margin={'none'}
                        size={'small'}
                        onKeyDown={enterKeyPressHandler}
                        onChange={onChangeHandler}
                        onBlur={updateValue}
                        onClick={handleTextBoxOnClick}
                    />
                    {!isValid && (
                        <span className='errorMsg'>
                            {doNotTranslate ? validationmessage : translation(validationmessage)}
                        </span>
                    )}
                </React.Fragment>
            ) : (
                <Tooltip title={title} arrow>
                    <span id="textField" className={classes} onClick={onClickHandler} onDoubleClick={onDoubleClickHandler}>
                        {getFormatedValue()}
                    </span>
                </Tooltip>
            )}
        </div>
    )
}

export default ConfigDrivenTextBoxField
