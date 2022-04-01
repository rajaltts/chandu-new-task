// React
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Material
import { Box, Menu, MenuItem, TextField, InputAdornment, Button } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

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
    onChange,
    disabled,
    trigger,
    width,
    rest,
}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [touched, setTouched] = useState(false)
    const [error, setError] = useState(false)
    const [currentValue, setCurrentValue] = useState(value)
    const classes = useStyles()
    const MIN = parseInt(min, 10)
    const MAX = parseInt(max, 10)
    let helperText = ''

    if (!isNaN(MIN) && isNaN(MAX)) {
        helperText = `(Min: ${min})`
    } else if (!isNaN(MAX) && isNaN(MIN)) {
        helperText += `(Max: ${max})`
    } else if (!isNaN(MIN) && !isNaN(MAX)) {
        helperText += `(Min: ${min}, Max: ${max})`
    }

    const valueIsCorrect = (v) => (parseInt(v, 10) >= MIN || !MIN) && (parseInt(v, 10) <= MAX || !MAX)

    useEffect(() => {
        setCurrentValue(value)
        setError(!valueIsCorrect(value))
    }, [value])

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

    const handleChange = (e) => {
        setCurrentValue(e.target.value)
        setError(!valueIsCorrect(e.target.value))
        if (!error && trigger === 'change') {
            onChange(e.target.value)
        }
    }

    const handleBlur = (e) => {
        e.stopPropagation()
        setTouched(false)

        if (trigger === 'blur' && e.target.value !== value) {
            onChange(e.target.value)
        }
    }

    return (
        <Box key={id} className={`${classes.inputContainer}`}>
            <TextField
                type={type}
                key={id}
                id={id}
                className={classes.input}
                label={label}
                variant={variant}
                min={min}
                max={max}
                value={currentValue}
                style={{ width: width }}
                InputProps={{
                    classes: {
                        focused: classes.inputFocused,
                        error: classes.inputError,
                        notchedOutline: classes.inputNotchedOutline,
                    },
                    endAdornment: unit ? (
                        <InputAdornment position='end' className={`${classes.adornment} ${disabled ? 'disabled' : ''}`}>
                            { units && units.length > 1 && (
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
                            </>)}
                            { (units == null || units.length === 1) && unit ? unit : ''}
                        </InputAdornment>
                    ) : (
                        ''
                    ),
                }}
                helperText={touched && helperText}
                FormHelperTextProps={{ classes: { root: classes.helperText } }}
                onChange={handleChange}
                onFocus={() => setTouched(true)}
                onBlur={handleBlur}
                error={error}
                disabled={disabled}
                {...rest}
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
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    trigger: PropTypes.oneOf(['change', 'blur']),
}

export default InputRange
