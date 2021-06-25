import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Tooltip } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MaterialCheckbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles((theme) => ({
    relaxed: {
        '& $root, $label': {
            color: theme.palette.error.main,
        },
    },
    root: {},
    label: {},
}))

const Checkbox = ({ className, value, handleChange, label, color, disabled, relaxed }) => {
    const classes = useStyles()

    const Label = () => {
        return (
            <>
                {relaxed ? (
                    <Tooltip title='Selecting this value will impact further selection'>
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
}

export default Checkbox
