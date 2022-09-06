import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Tooltip, Checkbox as MaterialCheckbox, FormControlLabel } from '@material-ui/core'
import useStyles from './Checkbox.styles'

const Checkbox = ({
    className,
    value,
    handleChange,
    label,
    color,
    disabled,
    relaxed,
    valid = true,
    visible = true,
    tooltipTitle,
    showLabel = true,
    checkboxClassName = '',
    isKeyBoardAccessible,
    ...rest
}) => {
    const classes = useStyles()
    const [error, setError] = useState(false)

    useEffect(() => {
        setError(disabled || !visible ? false : !valid || relaxed)
    }, [disabled, visible, valid, relaxed])

    const Label = () => {
        if (!showLabel) {
            return <></>
        }
        return (
            <>
                {error ? (
                    <Tooltip title={tooltipTitle}>
                        <span>{label}</span>
                    </Tooltip>
                ) : (
                    label
                )}
            </>
        )
    }

    if (!visible) {
        return <></>
    }
    return (
        <FormControlLabel
            classes={{
                label: classes.label,
            }}
            className={`${className || ''} ${error ? classes.error : ''}`}
            aria-label={label}
            control={
                <MaterialCheckbox
                    className={`${checkboxClassName} ${classes.root}`}
                    checked={value}
                    onChange={handleChange}
                    name={label}
                    color={color}
                    disabled={disabled}
                    autoFocus={isKeyBoardAccessible}
                    {...rest}
                />
            }
            label={<Label />}
        />
    )
}

Checkbox.defaultProps = {
    color: 'primary',
    disabled: false,
    relaxed: false,
}

Checkbox.propTypes = {
    value: PropTypes.bool.isRequired,
    label: PropTypes.string,
    color: PropTypes.oneOf(['default', 'primary', 'secondary']),
    disabled: PropTypes.bool,
    handleChange: PropTypes.func,
    relaxed: PropTypes.bool,
    className: PropTypes.string,
    tooltipTitle: PropTypes.string,
}

export default Checkbox
