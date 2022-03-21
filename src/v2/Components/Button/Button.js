import { Button as MaterialButton } from '@material-ui/core'
import React from 'react'
import classnames from 'classnames'
import { useButtonStyle } from './Button.styles'

export const Button = (props) => {
    const { variant, selected, children, className, ...rest } = props
    const classes = useButtonStyle(props)

    return (
        <MaterialButton
            className={classnames(className, {
                [classes.selected]: selected,
            })}
            variant={selected ? 'contained' : variant}
            {...rest}>
            {children}
        </MaterialButton>
    )
}
