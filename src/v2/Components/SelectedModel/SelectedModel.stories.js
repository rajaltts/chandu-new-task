import React from 'react'
import { SelectedModel } from './SelectedModel'

export default {
    title: 'Layout/SelectedModel',
    component: SelectedModel,
}

const SelectedModelTemplate = ({ ...args }) => {
    return <SelectedModel {...args} />
}

export const Basic = SelectedModelTemplate.bind({})

Basic.args = {
    title: 'Selected model',
    value: '30KAV',
}
