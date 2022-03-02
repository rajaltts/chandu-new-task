import React from 'react'
import PropTypes from 'prop-types'
import { Button as MaterialButton } from '@material-ui/core'
import { useStyles } from './Button.styles'

const Button = ({ id, variant, className, size, startIcon, endIcon, onClick, children, disabled, rest }) => {
    const classes = useStyles()
    let btnClasses

    if (variant === 'contained') {
        btnClasses = classes.primaryGradientButton
    } else if (variant === 'outlined') {
        btnClasses = `${classes.outlineButton} black white-bg`
    } else if (variant === 'text') {
        btnClasses = classes.textButton
    }

    return (
        <MaterialButton
            id={id}
            data-disabled={`Button__${disabled}`}
            data-variant={`Button__${variant}`}
            variant={variant}
            className={`${classes.btn} ${btnClasses} ${className} ${size}`}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            disabled={disabled}
            {...rest}>
            {children}
        </MaterialButton>
    )
}

Button.defaultProps = {
    variant: 'contained',
    size: 'large',
}

Button.propTypes = {
    variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    startIcon: PropTypes.any,
    endIcon: PropTypes.any,
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.object, PropTypes.array]),
    disabled: PropTypes.bool,
    rest: PropTypes.object,
}

export default Button
