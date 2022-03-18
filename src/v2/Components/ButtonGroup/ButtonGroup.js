import React from 'react'
import { ButtonGroup as MaterialButtonGroup, Button } from '@material-ui/core'

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

export default ButtonGroup