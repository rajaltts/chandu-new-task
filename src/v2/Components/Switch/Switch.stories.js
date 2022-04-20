import React from 'react'
import Switch from './Switch'

export default {
    title: 'Switch',
    component: Switch,
    argTypes: {
        value: {
            defaultValue: true,
        },
        label: {
            defaultValue: 'Switch',
        },
        size: {
            defaultValue: 'medium',
        },
        handleChange: {
            table: {
                disable: true,
            },
        },
        className: {
            table: {
                disable: true,
            },
        },
    },
}

const SwitchTemplate = ({ ...args }) => {
    return <Switch {...args} />
}

export const Basic = SwitchTemplate.bind({})

export const Disabled = SwitchTemplate.bind({})
Disabled.args = {
    disabled: true,
}

export const Small = SwitchTemplate.bind({})
Small.args = {
    size: 'small',
}
