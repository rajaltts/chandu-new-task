import React from 'react'
import Button from './Button'

export default {
    title: 'Button',
    component: Button,
    argTypes: {
        children: {
            defaultValue: 'test',
        },
    },
}

const ButtonTemplate = ({ ...args }) => {
    return <Button {...args} />
}

export const Basic = ButtonTemplate.bind({})
