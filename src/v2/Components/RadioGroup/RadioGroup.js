import React from 'react'
import PropTypes from 'prop-types'
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup as MaterialRadioGroup,
    Radio as MaterialRadio,
} from '@material-ui/core'

import useStyles from './RadioGroup.styles'

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
    handleChange,
    relaxed,
    restRadioGroup,
    restFormControl,
    restRadio,
}) => {
    const classes = useStyles()
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
                data-disabled={`${name}__${disabled}`}
                data-error={`${name}__${relaxed}`}
                data-value={`${name}__${value}`}
                row={row}
                {...restRadioGroup}>
                {values.map((radio) => {
                    const disabledValue = disabled || radio.feasible === false || radio.enable === false
                    return (
                        <FormControlLabel
                            key={radio.value}
                            value={radio.value}
                            control={
                                <MaterialRadio
                                    id={`Radio_${name}_${radio.value}`}
                                    className={
                                        disabledValue
                                            ? {
                                                  root: classes.radioButtonInternalSVG_Disabled,
                                                  checked: classes.radioChecked,
                                              }
                                            : classes.root
                                    }
                                    // className={classes.input}
                                    data-Disabled={`${name}__${disabledValue}`}
                                    color={color}
                                    disabled={disabledValue}
                                    data-label={radio.label}
                                    {...restRadio}
                                />
                            }
                            label={radio.label}
                            data-disabled={`${name}__${disabledValue}`}
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
    color: 'primary',
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
    restRadioGroup: PropTypes.object,
    restRadio: PropTypes.object,
    restFormControl: PropTypes.object,
}

export default RadioGroup
