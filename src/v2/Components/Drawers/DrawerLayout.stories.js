import React from 'react'
import DrawerLayout from './DrawerLayout'
import Typography from '../Typography/Typography'

export default {
    title: 'Layout/DrawerLayout',
    component: DrawerLayout,
}

const loremIpsum =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

const children = (
    <div style={{ width: '350px' }}>
        <Typography paragraph variant='body1'>
            {loremIpsum}
        </Typography>
    </div>
)

const DrawerLayoutTemplate = ({ ...args }) => {
    return <DrawerLayout {...args} />
}

export const Basic = DrawerLayoutTemplate.bind({})

Basic.args = {
    anchor: 'right',
    elevation: 3,
    isOpen: true,
    variant: 'temporary',
    children,
}
