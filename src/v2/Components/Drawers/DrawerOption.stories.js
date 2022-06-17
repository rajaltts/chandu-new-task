import React from 'react'
import DrawerOption from './DrawerOption'

export default {
    title: 'Layout/DrawerOption',
    component: DrawerOption,
    argTypes: {
        name: {
            defaultValue: 'default',
        },
        label: {
            defaultValue: 'label',
        },
        columnData: {
            defaultValue: [
                {
                    key: '1',
                    value: '2000',
                    priceUnit: '$',
                },
                {
                    key: '2',
                    value: '2',
                },
            ],
        },
        draggable: {
            defaultValue: true,
        },
    },
}

const DrawerOptionTemplate = ({ ...args }) => {
    return <DrawerOption {...args} />
}

export const Basic = DrawerOptionTemplate.bind({})
