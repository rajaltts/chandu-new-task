import React from 'react'
import DrawerLayout from './DrawerLayout'

export default {
    title: 'Layout/DrawerLayout',
    component: DrawerLayout,
    argTypes: {
        isOpen: {
            defaultValue: true,
        },
        anchor: {
            defaultValue: 'left',
        },
    },
}

const DrawerLayoutTemplate = ({ ...args }) => {
    return <DrawerLayout {...args} />
}

export const Basic = DrawerLayoutTemplate.bind({})
