import React, { useState } from 'react'
import Typography from '../Typography/Typography'
import Select from './Select'
import BookIcon from '@material-ui/icons/Book'

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
                    attributes: {
                        MLP: '5',
                    },
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
                    attributes: {
                        MLP: '5',
                    },
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
        adornments: (v) => (v.attributes ? 'MLP' : null),
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

export const Adornments = SelectTemplate.bind({})
Adornments.args = {
    adornments: [
        <BookIcon key={1} />,
        <Typography key={2} style={{ marginLeft: 4, marginRight: 4 }}>
            E
        </Typography>,
    ],
}

export const ConditionalAdornments = SelectTemplate.bind({})
ConditionalAdornments.args = {
    adornments: (v) => (v.attributes ? <Typography style={{ marginRight: 4 }}>MLP</Typography> : null),
}
