import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, FormControlLabel, FormLabel } from '@material-ui/core'
import MaterialRadioGroup from '@material-ui/core/RadioGroup'
import MaterialRadio from '@material-ui/core/Radio'

const RadioGroup = ({ className, row, name, color, label, value, values, disabled, handleChange }) => {
    return (
        <FormControl component='fieldset' className={className}>
            {label && <FormLabel component='legend'>{label}</FormLabel>}
            <MaterialRadioGroup
                name={name}
                value={value}
                onChange={(e) => {
                    handleChange(e.target.value, e)
                }}
                row={row}>
                {values.map((radio) => {
                    return (
                        <FormControlLabel
                            key={radio.value}
                            value={radio.value}
                            control={<MaterialRadio data-label={radio.label} color={color} disabled={disabled} />}
                            label={radio.label}
                        />
                    )
                })}
            </MaterialRadioGroup>
        </FormControl>
    )
}

RadioGroup.defaultProps = {
    row: false,
    disabled: false,
    color: 'secondary',
}

RadioGroup.propTypes = {
    values: PropTypes.array,
    value: PropTypes.string,
    label: PropTypes.string,
    color: PropTypes.oneOf(['default', 'primary', 'secondary']),
    disabled: PropTypes.bool,
    handleChange: PropTypes.func,
    className: PropTypes.string,
    row: PropTypes.bool,
    name: PropTypes.string,
}

export default RadioGroup
