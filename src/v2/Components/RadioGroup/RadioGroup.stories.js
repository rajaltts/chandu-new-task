import React, { useState } from 'react'
import RadioGroup from './RadioGroup'

export default {
    title: 'Radio group',
    component: RadioGroup,
    argTypes: {
        values: {
            defaultValue: [
                {
                    value: 'CIAT',
                    label: 'CIAT',
                    description: '',
                    feasible: true,
                    enable: true,
                },
                {
                    value: 'Carrier',
                    label: 'Carrier',
                    description: '',
                    feasible: false,
                    enable: true,
                },
            ],
        },
        value: { defaultValue: 'Carrier' },
        className: {
            table: {
                disable: true,
            },
        },
        handleChange: {
            table: {
                disable: true,
            },
        },
        name: {
            table: {
                disable: true,
            },
        },
    },
}

const RadioGroupTemplate = ({ value, ...args }) => {
    const [selectedValue, setSelectedValue] = useState(value)

    return <RadioGroup value={selectedValue} handleChange={(e) => setSelectedValue(e)} {...args} />
}

export const Basic = RadioGroupTemplate.bind({})

export const Disabled = RadioGroupTemplate.bind({})
Disabled.args = {
    disabled: true,
}

export const Row = RadioGroupTemplate.bind({})
Row.args = {
    row: true,
}

export const WithLabel = RadioGroupTemplate.bind({})
WithLabel.args = {
    label: 'Brand',
}
