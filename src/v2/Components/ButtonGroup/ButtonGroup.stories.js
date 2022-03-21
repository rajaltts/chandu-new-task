import React, { useState } from 'react'
import ButtonGroup from './ButtonGroup'

export default {
    title: 'ButtonGroup',
    component: ButtonGroup,
}

const ButtonGroupTemplate = ({ value, ...args }) => {
    const [selectedValue, setSelectedValue] = useState(value)
    return <ButtonGroup {...args} value={selectedValue} onChange={setSelectedValue} />
}

export const Basic = ButtonGroupTemplate.bind({})
Basic.args = {
    values: [{ label: 'one', value: 1, feasible: true }, { label: 'two', value: 2, feasible: true }],
    value: 1,
    color: 'secondary',
}

export const Disabled = ButtonGroupTemplate.bind({})
Disabled.args = {
    values: [{ label: 'one', value: 1, feasible: false }, { label: 'two', value: 2, feasible: true }],
    value: 2,
}