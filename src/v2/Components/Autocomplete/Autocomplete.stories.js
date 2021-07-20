import React from 'react'
import MyAutocomplete from './Autocomplete'

export default {
    title: 'Autocomplete',
    component: MyAutocomplete,
    argTypes: {
        values: {
            defaultValue: [
                { value: '1', label: 'Project 1' },
                { value: '2', label: 'Project 2' },
                { value: '3', label: 'Project 3' },
                { value: '4', label: 'Project 4' },
            ],
        },
        label: {
            defaultValue: 'Autocomplete',
            control: {
                type: 'text',
            },
        },
    },
}

const AutocompleteTemplate = ({ label, ...args }) => {
    return <MyAutocomplete label={label} {...args} />
}

export const NoValue = AutocompleteTemplate.bind({})

export const ValueSelected = AutocompleteTemplate.bind({})
ValueSelected.args = {
    value: 'Project 1',
}
