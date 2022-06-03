import React from 'react'
import Checkbox from './Checkbox'

export default {
    title: 'ActionComponent/Checkbox',
    component: Checkbox,
    argTypes: {
        value: {
            defaultValue: true,
        },
        label: {
            defaultValue: 'Checkbox',
            control: {
                type: 'text',
            },
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

const CheckboxTemplate = ({ ...args }) => {
    return <Checkbox {...args} />
}

export const Basic = CheckboxTemplate.bind({})

export const Disabled = CheckboxTemplate.bind({})
Disabled.args = {
    disabled: true,
}

export const Relaxed = CheckboxTemplate.bind({})
Relaxed.args = {
    relaxed: true,
}
