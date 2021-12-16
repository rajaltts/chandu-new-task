import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, FormControlLabel, FormLabel } from '@material-ui/core'
import MaterialRadioGroup from '@material-ui/core/RadioGroup'
import MaterialRadio from '@material-ui/core/Radio'

const RadioGroup = ({ className, row, name, color, label, displayLabel, value, values, disabled, handleChange, relaxed }) => {
    return (
        <FormControl component='fieldset' className={className}>
            {label && displayLabel && <FormLabel component='legend'>{label}</FormLabel>}
            <MaterialRadioGroup
                id={name}
                name={name}
                value={value}
                onChange={(e) => {
                    handleChange(e.target.value, e)
                }}
                data-Disabled={`${name}__${disabled}`}
                data-Error={`${name}__${relaxed}`}
                data-Value={`${name}__${value}`}
                row={row}>
                {values.map((radio) => {
                    return (
                        <FormControlLabel
                            key={radio.value}
                            value={radio.value}
                            control={<MaterialRadio id={name} data-label={radio.label} data-Disabled={`${name}__${disabled}`} color={color} disabled={disabled} />}
                            label={radio.label}
                            data-Disabled={`${name}__${disabled}`}
                            data-Error={`${name}__${relaxed}`}
                            data-Value={`${name}__${radio.value}`}
                            data-Label={`${name}__${radio.label}`}
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
    displayLabel: true
}

RadioGroup.propTypes = {
    values: PropTypes.array,
    value: PropTypes.string,
    displayLabel: PropTypes.bool,
    color: PropTypes.oneOf(['default', 'primary', 'secondary']),
    disabled: PropTypes.bool,
    handleChange: PropTypes.func,
    className: PropTypes.string,
    row: PropTypes.bool,
    name: PropTypes.string,
}

export default RadioGroup
