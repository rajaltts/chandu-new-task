import React, { useState } from 'react'
import InputRange from './InputRange'

export default {
    title: 'Input Range',
    component: InputRange,
    argTypes: {
        min: {
            defaultValue: -10,
        },
        max: {
            defaultValue: 100,
        },
        value: {
            defaultValue: 12,
        },
        variant: {
            control: {
                type: 'select',
            },
        },
        id: {
            control: false,
        },
        type: {
            control: false,
        },
        width: {},
    },
}

const InputRangeTemplate = ({ unit, ...args }) => {
    const [unitUsed, setUnitUsed] = useState(unit)

    return <InputRange unitChange={(e) => setUnitUsed(e)} {...args} unit={unitUsed} />
}

export const MultipleUnits = InputRangeTemplate.bind({})
MultipleUnits.args = {
    label: 'Multiple units',
    unit: 'm3/h',
    units: ['m3/h', '%'],
    width: 500,
}

export const SingleUnit = InputRangeTemplate.bind({})
SingleUnit.args = {
    label: 'Single unit',
    unit: '°C',
    width: 100,
}

export const Disabled = InputRangeTemplate.bind({})
Disabled.args = {
    label: 'Disabled',
    unit: 'C',
    disabled: true,
}

export const OutOfRange = InputRangeTemplate.bind({})
OutOfRange.args = {
    label: 'OutOfRange',
    unit: 'C',
    value: 105,
}

export const Empty = InputRangeTemplate.bind({})
Empty.args = {
    label: 'Fluid outlet temperature',
    unit: 'C',
    units: ['°C'],
    value: '',
}
