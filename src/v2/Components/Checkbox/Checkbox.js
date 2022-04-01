import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Tooltip, Checkbox as MaterialCheckbox, FormControlLabel } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    relaxed: {
        '& $root, $label': {
            color: theme.palette.error.main,
        },
    },
    root: {},
    label: {},
}))

const Checkbox = ({ className, value, handleChange, label, color, disabled, relaxed, tooltipTitle, ...rest }) => {
    const classes = useStyles()

    const Label = () => {
        return (
            <>
                {relaxed ? (
                    <Tooltip title={tooltipTitle}>
                        <span>{label}</span>
                    </Tooltip>
                ) : (
                    label
                )}
            </>
        )
    }

    return (
        <FormControlLabel
            classes={{
                label: classes.label,
            }}
            className={`${className || ''} ${relaxed ? classes.relaxed : ''}`}
            aria-label={label}
            control={
                <MaterialCheckbox
                    className={classes.root}
                    checked={value}
                    onChange={handleChange}
                    name={label}
                    color={color}
                    disabled={disabled}
                    {...rest}
                />
            }
            label={<Label />}
        />
    )
}

Checkbox.defaultProps = {
    color: 'secondary',
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
