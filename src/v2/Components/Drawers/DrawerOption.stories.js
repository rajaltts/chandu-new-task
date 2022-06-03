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
            defaultValue: [{
                key: '1',
                value: 'PartNumber #1',
                priceUnit: 'ABCD',
                priceLabel: 'priceLabel #1',
            },
            {
                key: '2',
                value: 'Quantity #2',
                priceUnit: 2,
                priceLabel: 'priceLabel #2',
            }]
        },
        draggable: {
            defaultValue: false,
        }
    },
}

const DrawerOptionTemplate = ({ ...args }) => {
    return <DrawerOption {...args} />
}

export const Basic = DrawerOptionTemplate.bind({})
