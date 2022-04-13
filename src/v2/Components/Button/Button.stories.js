import React from 'react'
import { Button } from './Button'

export default {
    title: 'Button',
    component: Button,
}
const ButtonTemplate = ({ ...args }) => {
    return <Button {...args} />
}

export const Basic = ButtonTemplate.bind({})
Basic.args = {
    variant: 'contained',
    children: 'Click me',
    color: 'primary',
}
