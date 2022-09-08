import React from 'react'
import PropTypes from 'prop-types'
import { FormControlLabel, Switch as MaterialSwitch } from '@material-ui/core'

const Switch = ({ value, handleChange, label, color, disabled, size, className, rest }) => {
    return (
        <FormControlLabel
            control={
                <MaterialSwitch
                    checked={value}
                    onChange={handleChange}
                    disabled={disabled}
                    color={color}
                    size={size}
                    className={`${className || ''}`}
                    {...rest}
                />
            }
            label={label}
        />
    )
}

Switch.defaultProps = {
    color: 'secondary',
    size: 'medium',
    disabled: false,
}

Switch.propTypes = {
    value: PropTypes.bool.isRequired,
    label: PropTypes.string,
    handleChange: PropTypes.func,
    disabled: PropTypes.bool,
    color: PropTypes.oneOf(['default', 'primary', 'secondary']),
    size: PropTypes.oneOf(['small', 'medium']),
    className: PropTypes.string,
    rest: PropTypes.object,
}

export default Switch
