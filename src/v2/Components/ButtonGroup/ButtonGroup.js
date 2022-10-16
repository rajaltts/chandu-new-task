import React from 'react'
import { ButtonGroup as MaterialButtonGroup } from '@material-ui/core'
import { Button } from '../Button/Button'
import { createAuthorizedProps } from '../utils/createAuthorizedProps'

const ButtonGroup = ({ name, value, values = [], onChange, buttonProps, ...rest }) => {
    const authorizedProps = createAuthorizedProps(MaterialButtonGroup, rest)
    return (
        <MaterialButtonGroup {...authorizedProps}>
            {values.map((item, index) => (
                <Button
                    id={`ButtonGroup_${name}_${item.value}`}
                    key={`ButtonGroup_${name}_${item.value}`}
                    selected={item.value === value}
                    disabled={!item.feasible || authorizedProps?.disabled}
                    onClick={() => onChange(item.value)}
                    {...(buttonProps ? buttonProps(item, index) : {})}>
                    {item.label}
                </Button>
            ))}
        </MaterialButtonGroup>
    )
}

ButtonGroup.defaultProps = {
    color: 'secondary',
}

export default ButtonGroup
