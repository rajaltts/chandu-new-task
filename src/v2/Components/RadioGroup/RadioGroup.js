import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, FormControlLabel, FormLabel } from '@material-ui/core'
import MaterialRadioGroup from '@material-ui/core/RadioGroup'
import MaterialRadio from '@material-ui/core/Radio'

const RadioGroup = ({
    className,
    row,
    name,
    color,
    label,
    displayLabel,
    value,
    values,
    disabled,
    onChange,
    relaxed,
    restRadioGroup,
    restFormControl,
    restRadio,
}) => {
    return (
        <FormControl component='fieldset' className={className}>
            {label && displayLabel && <FormLabel component='legend'>{label}</FormLabel>}
            <MaterialRadioGroup
                id={name}
                name={name}
                value={value}
                onChange={(e) => {
                    onChange(e.target.value, e)
                }}
                data-disabled={`${name}__${disabled}`}
                data-error={`${name}__${relaxed}`}
                data-value={`${name}__${value}`}
                row={row}
                {...restRadioGroup}
            >
                {values.map((radio) => {
                    return (
                        <FormControlLabel
                            key={radio.value}
                            value={radio.value}
                            control={
                                <MaterialRadio
                                    id={name}
                                    data-label={radio.label}
                                    data-disabled={`${name}__${disabled}`}
                                    color={color}
                                    disabled={disabled}
                                    {...restRadio}
                                />
                            }
                            label={radio.label}
                            data-disabled={`${name}__${disabled}`}
                            data-error={`${name}__${relaxed}`}
                            data-value={`${name}__${radio.value}`}
                            data-label={`${name}__${radio.label}`}
                            {...restFormControl}
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
    displayLabel: true,
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
    restRadioGroup: PropTypes.RadioGroup,
    restRadio: PropTypes.Radio,
    restFormControl: PropTypes.FormControl,
}

export default RadioGroup
