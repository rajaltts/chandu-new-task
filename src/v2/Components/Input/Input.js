// React
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Material
import { TextField } from '@material-ui/core'

// Styles
import useStyles from './Input.styles'
import classNames from 'classnames'

const Input = ({
    type,
    id,
    name,
    label,
    variant,
    value,
    loading,
    trigger,
    InputProps,
    handleChange,
    required,
    relaxed,
    disabled,
    valid,
    visible = true,
    isInteger,
    warningMessage,
    className = '',
    showLabel = true,
    isKeyBoardAccessible,
    rest,
}) => {
    const [currentValue, setCurrentValue] = useState(value)
    const [error, setError] = useState(false)
    const [touched, setTouched] = useState(false)
    const [showWarning, setShowWarning] = useState(false)
    const classes = useStyles()

    let helperText = ''

    const stripNonIntegers = (value, shouldReplace = false) =>
        shouldReplace ? value.replace(/[^0-9-]/g, '').replace(/(?!^)-/g, '') : value

    useEffect(() => {
        setError(isErrored() || relaxed)
    }, [disabled, visible, valid])

    useEffect(() => {
        if (value !== currentValue && !loading) {
            setCurrentValue(value)
            setError(isErrored() || relaxed)
        }
    }, [value, loading])

    const isErrored = () => (disabled || !visible ? false : !valid)

    const valueChange = (e) => {
        const value = stripNonIntegers(e.target.value, isInteger)
        if (isInteger) setShowWarning(!(value === e.target.value))
        setCurrentValue(value)
    }

    const handleBlur = (e) => {
        e.stopPropagation()
        setTouched(false)
        if (showWarning) setShowWarning(false)

        if (trigger === 'blur' && e.target.value !== value) {
            handleChange(e.target.value)
        }
    }

    const handleKeyDownHandler = (e) => {
        e.stopPropagation()

        if (trigger === 'enter' && e.target.value !== value && e.key === 'Enter' && e.target.localName === 'input') {
            setTouched(false)
            if (showWarning) setShowWarning(false)
            handleChange(e.target.value)
        }
    }

    if (!visible) {
        return <></>
    }
    return (
        <TextField
            type={isInteger ? 'text' : type}
            id={id}
            name={name}
            className={classNames(classes.input, className)}
            label={showLabel ? label : ''}
            variant={variant}
            value={currentValue}
            autoFocus={isKeyBoardAccessible}
            InputProps={{
                classes: {
                    focused: classes.inputFocused,
                    error: classes.inputError,
                    notchedOutline: classes.inputNotchedOutline,
                },
                inputProps: { tabIndex: isKeyBoardAccessible ? '2' : '-1' },
                ...InputProps,
            }}
            InputLabelProps={{
                className: classes.label,
                classes: {
                    focused: classes.labelFocused,
                    shrink: classes.shrinkLabel,
                    outlined: classes.outlinedLabel,
                },
                shrink: true,
            }}
            helperText={touched && (showWarning ? warningMessage : helperText)}
            onChange={valueChange}
            onBlur={handleBlur}
            onFocus={() => setTouched(true)}
            onKeyDown={handleKeyDownHandler}
            required={required}
            disabled={disabled}
            error={error}
            {...rest}
        />
    )
}

Input.defaultProps = {
    type: 'text',
    variant: 'outlined',
    warningMessage: 'Please enter only integer values',
    trigger: 'blur',
}

Input.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    InputProps: PropTypes.object,
    handleChange: PropTypes.func,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    rest: PropTypes.object,
    trigger: PropTypes.oneOf(['blur', 'enter']),
}

export default Input
