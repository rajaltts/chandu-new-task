import React, { useState } from 'react'
import Input from './Input'

export default {
    title: 'InputComponent/Input',
    component: Input,
    argTypes: {
        label: {
            defaultValue: 'Input',
        },
        value: {
            defaultValue: 'Test',
        },
    },
}

const InputTemplate = ({ ...args }) => {
    return <Input {...args} />
}

export const Basic = InputTemplate.bind({})

export const Required = InputTemplate.bind({})
Required.args = {
    required: true,
}

export const Disabled = InputTemplate.bind({})
Disabled.args = {
    disabled: true,
}
