import React from 'react'
import { ButtonGroup as MaterialButtonGroup } from '@material-ui/core'
import { Button } from '../Button/Button'

const ButtonGroup = ({ value, values = [], onChange, buttonProps, ...rest }) => {
    return (
        <>
            <MaterialButtonGroup {...rest}>
                {values.map((item, index) => (
                    <Button
                        key={`${item.value}_${item.index}`}
                        selected={item.value === value}
                        disabled={!item.feasible || rest.disabled}
                        onClick={() => onChange(item.value)}
                        {...(buttonProps ? buttonProps(item, index) : {})}>
                        {item.label}
                    </Button>
                ))}
            </MaterialButtonGroup>
        </>
    )
}

ButtonGroup.defaultProps = {
    color: 'secondary',
}

export default ButtonGroup
