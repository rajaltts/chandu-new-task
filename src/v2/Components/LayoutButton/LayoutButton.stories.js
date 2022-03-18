import React from 'react'
import { LayoutButton } from './LayoutButton'

export default {
    title: 'LayoutButton',
    component: LayoutButton,
}

const LayoutButtonTemplate = ({ ...args }) => {
    debugger
    return <LayoutButton {...args} />
}

export const Basic = LayoutButtonTemplate.bind({})
Basic.args = {
    children: 'Click me',
}
