import React from 'react'
import { buttonStyles } from './LayoutButton.styles'
import { Button } from '../Button/Button'

export const LayoutButton = (props) => {
    const { variant } = props
    const classes = buttonStyles()
    let btnClasses

    if (variant === 'contained') {
        btnClasses = classes.primaryGradientButton
    } else if (variant === 'outlined') {
        btnClasses = `${classes.outlineButton} black white-bg`
    } else if (variant === 'text') {
        btnClasses = classes.textButton
    }

    return <Button {...props} className={`${props.className} ${btnClasses}`} />
}

LayoutButton.defaultProps = {
    variant: 'contained',
    size: 'large',
}
