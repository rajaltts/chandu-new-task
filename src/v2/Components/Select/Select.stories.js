import React, { useState } from 'react'
import Select from './Select'

export default {
    title: 'InputComponent/Select',
    component: Select,
    argTypes: {
        id: {
            control: false,
        },
        label: {
            defaultValue: 'Select',
            control: {
                type: 'text',
            },
        },
        values: {
            defaultValue: [
                {
                    value: 'ANY',
                    label: 'ANY',
                    description: 'ANY',
                    feasible: true,
                    enable: true,
                },
                {
                    value: 'Vectios IPJ',
                    label: 'Vectios IPJ',
                    description: 'Vectios IPJ',
                    feasible: true,
                    enable: true,
                },
                {
                    value: 'Vectios RPJ',
                    label: 'Vectios RPJ',
                    description: 'Vectios RPJ',
                    feasible: true,
                    enable: true,
                },
                {
                    value: '50FC 020-093',
                    label: '50FC 020-093',
                    description: '50FC 020-093',
                    feasible: false,
                    enable: true,
                },
                {
                    value: '50FC 100-280',
                    label: '50FC 100-280',
                    description: '50FC 100-280',
                    feasible: false,
                    enable: true,
                },
            ],
        },
        value: {
            defaultValue: 'ANY',
        },
        tooltipTitleUnfeasible: {
            defaultValue: 'Not compatible with you selection',
        },
        valueNotCompatibleText: {
            defaultValue: 'Invalid selection',
        },
    },
}

const SelectTemplate = ({ value, ...args }) => {
    const [selectedValue, setSelectedValue] = useState(value)

    return <Select value={selectedValue} handleChange={(e) => setSelectedValue(e)} {...args} />
}

export const Basic = SelectTemplate.bind({})

export const Disabled = SelectTemplate.bind({})
Disabled.args = {
    disabled: true,
}

export const Relaxed = SelectTemplate.bind({})
Relaxed.args = {
    relaxed: true,
}
