import React from 'react'
import { LayoutButton } from './LayoutButton'

export default {
    title: 'ActionComponent/LayoutButton',
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
