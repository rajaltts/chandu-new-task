// React
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Material
import { TextField } from '@material-ui/core'

// Styles
import useStyles from './Input.styles'

const Input = ({ type, id, name, label, variant, value, InputProps, handleBlur, required, disabled, rest }) => {
    const [currentValue, setCurrentValue] = useState(value)
    const classes = useStyles()

    useEffect(() => {
        setCurrentValue(value)
    }, [value])

    const handleChange = (e) => {
        setCurrentValue(e.target.value)
    }

    return (
        <TextField
            type={type}
            id={id}
            name={name}
            className={classes.input}
            label={label}
            variant={variant}
            value={currentValue}
            InputProps={{
                classes: {
                    focused: classes.inputFocused,
                    notchedOutline: classes.inputNotchedOutline,
                },
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
            onChange={handleChange}
            onBlur={handleBlur}
            required={required}
            disabled={disabled}
            {...rest}
        />
    )
}

Input.defaultProps = {
    type: 'text',
    variant: 'outlined',
}

Input.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
    value: PropTypes.string,
    InputProps: PropTypes.object,
    handleChange: PropTypes.func,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    rest: PropTypes.object,
}

export default Input
