import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

const buttonStyles = makeStyles((theme) => ({
    btn: {
        '&.small': {
            height: 28,
        },
        '&.medium': {
            height: 36,
        },
        '&.large': {
            height: 50,
        },
    },
    primaryGradientButton: {
        background: 'linear-gradient(99.7deg, #15205E -19.43%, #0076F4 80.93%)',
        boxShadow: '0px 11px 12px -10px rgba(4, 105, 221, 0.7)',

        '&.MuiButtonBase-root': {
            textTransform: 'capitalize',
            color: 'white',
            padding: '0 20px',
            minWidth: '128px',
            borderRadius: '4px',
            transition: 'all .2s',

            '&:hover': {
                background:
                    'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), linear-gradient(99.7deg, #15205E -19.43%, #0076F4 80.93%)',
            },
        },

        '&.Mui-disabled': {
            background: theme.palette.grey[350],
            color: theme.palette.grey[750],
        },
    },
    outlineButton: {
        '&.MuiButtonBase-root': {
            textTransform: 'capitalize',
            padding: '0 20px',
            borderRadius: '4px',
            border: '1px solid',
            minWidth: 'auto',
            [theme.breakpoints.up('sm')]: {
                minWidth: '128px',
            },
        },

        '&.black': {
            borderColor: theme.palette.grey.main,
            color: theme.palette.text.primary,

            '&:hover': {
                background: theme.palette.grey[350],
            },
        },

        '&.white-bg': {
            background: 'white',
        },

        '&.transparent-bg': {
            background: 'transparent',
        },
    },
    textButton: {
        '&.MuiButtonBase-root': {
            textTransform: 'initial',
        },
    },
}))

const LayoutButton = ({ id="LayoutButton", variant, className, size, startIcon, endIcon, onClick, children, disabled }) => {
    const classes = buttonStyles()
    let btnClasses

    if (variant === 'contained') {
        btnClasses = classes.primaryGradientButton
    } else if (variant === 'outlined') {
        btnClasses = `${classes.outlineButton} black white-bg`
    } else if (variant === 'text') {
        btnClasses = classes.textButton
    }

    return (
        <Button
            id={id}
            data-Disabled={`LayoutButton__${disabled}`}
            data-Variant={`LayoutButton__${variant}`}
            variant={variant}
            className={`${classes.btn} ${btnClasses} ${className} ${size}`}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            disabled={disabled}>
            {children}
        </Button>
    )
}

LayoutButton.defaultProps = {
    variant: 'contained',
    size: 'large',
}

LayoutButton.propTypes = {
    variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    startIcon: PropTypes.any,
    endIcon: PropTypes.any,
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.object, PropTypes.array]),
    disabled: PropTypes.bool,
}

export default LayoutButton
