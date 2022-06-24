// React
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Material
import { Box, Menu, MenuItem, TextField, InputAdornment, Button } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import { createAuthorizedProps } from '../utils/createAuthorizedProps'

// Styles
import useStyles from './InputRange.styles'

const InputRange = ({
    type,
    id,
    label,
    variant,
    min,
    max,
    value,
    units,
    unit,
    unitChange,
    handleChange,
    loading,
    disabled,
    visible = true,
    valid,
    isInteger = false,
    trigger,
    width,
    relaxed,
    isLabelRequired = true,
    ...rest
}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [touched, setTouched] = useState(false)
    const [error, setError] = useState(false)
    const [currentValue, setCurrentValue] = useState(value)
    const [showWarning, setShowWarning] = useState(false)
    const [isUserInput, setIsUserInput] = useState(false)
    const classes = useStyles()
    const authorizedProps = createAuthorizedProps(TextField, rest)
    // overriding onChange is forbidden
    delete authorizedProps.onChange
    const MIN = parseFloat(min)
    const MAX = parseFloat(max)
    let helperText = ''

    if (!isNaN(MIN) && isNaN(MAX)) {
        helperText = `(Min: ${min})`
    } else if (!isNaN(MAX) && isNaN(MIN)) {
        helperText += `(Max: ${max})`
    } else if (!isNaN(MIN) && !isNaN(MAX)) {
        helperText += `(Min: ${min}, Max: ${max})`
    }

    const stripNonIntegers = (value, shouldReplace = false) =>
        shouldReplace ? value.replace(/[^0-9-]/g, '').replace(/(?!^)-/g, '') : value

    const valueIsCorrect = (v) => {
        return !disabled
            ? (parseFloat(v) >= MIN || MIN === undefined) && (parseFloat(v) <= MAX || MAX === undefined)
            : true
    }

    useEffect(() => {
        setError(!valueIsCorrect(currentValue) || relaxed)
    }, [disabled, visible, valid, currentValue, isUserInput])

    useEffect(() => {
        if (value !== currentValue && !loading) {
            setCurrentValue(value)
            setError(!valueIsCorrect(value) || relaxed)
        }
    }, [value, loading, relaxed])

    const openDropdown = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuItemClick = (option) => {
        unitChange(option)
        setAnchorEl(null)
    }

    const closeMenu = () => {
        setAnchorEl(null)
    }

    const valueChange = (e) => {
        const value = stripNonIntegers(e.target.value, isInteger)
        if (isInteger) setShowWarning(!(value === e.target.value))
        setCurrentValue(e.target.value)
        setIsUserInput(true)
        setError(!valueIsCorrect(e.target.value))
        if (!error && trigger === 'change') {
            handleChange(e.target.value)
        }
    }

    const handleBlur = (e) => {
        e.stopPropagation()
        setIsUserInput(false)
        setTouched(false)
        if (showWarning) setShowWarning(false)

        if (trigger === 'blur' && e.target.value !== value) {
            handleChange(e.target.value)
        }
    }

    if (!visible) {
        return <></>
    } //return nothing if VISIBLE subprop = FALSE : CJT
    return (
        <Box key={id} className={`${classes.inputContainer}`}>
            <TextField
                type={type}
                key={id}
                id={id}
                className={classes.input}
                label={isLabelRequired ? label : ''}
                variant={variant}
                min={min}
                max={max}
                value={currentValue}
                style={{ width: width }}
                InputLabelProps={isLabelRequired ? null : { shrink: true }}
                InputProps={{
                    classes: {
                        focused: classes.inputFocused,
                        error: classes.inputError,
                        notchedOutline: classes.inputNotchedOutline,
                    },
                    endAdornment: unit ? (
                        <InputAdornment position='end' className={`${classes.adornment} ${disabled ? 'disabled' : ''}`}>
                            {units && units.length > 1 && (
                                <>
                                    <Button
                                        className={classes.dropdownButton}
                                        variant='text'
                                        onClick={openDropdown}
                                        endIcon={<ArrowDropDownIcon />}>
                                        {unit}
                                    </Button>
                                    <Menu
                                        id={`menu-${id}`}
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={closeMenu}>
                                        {units.map((option) => {
                                            return (
                                                <MenuItem
                                                    key={option}
                                                    selected={unit === option}
                                                    onClick={() => handleMenuItemClick(option)}>
                                                    {option}
                                                </MenuItem>
                                            )
                                        })}
                                    </Menu>
                                </>
                            )}
                            {(units === null || units.length === 1) && unit ? unit : ''}
                        </InputAdornment>
                    ) : (
                        ''
                    ),
                }}
                helperText={touched && (showWarning ? 'Please enter only integer values' : helperText)}
                FormHelperTextProps={{ classes: { root: classes.helperText } }}
                onChange={valueChange}
                onFocus={() => setTouched(true)}
                onBlur={handleBlur}
                error={error}
                disabled={disabled}
                {...authorizedProps}
            />
        </Box>
    )
}

InputRange.defaultProps = {
    type: 'number',
    variant: 'outlined',
    trigger: 'blur',
}

InputRange.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
    units: PropTypes.array,
    unit: PropTypes.string,
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    handleChange: PropTypes.func,
    disabled: PropTypes.bool,
    trigger: PropTypes.oneOf(['change', 'blur']),
}

export default InputRange
