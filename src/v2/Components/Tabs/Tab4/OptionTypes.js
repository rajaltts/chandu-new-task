import React from 'react'
import CheckboxControl from './ControlType/CheckboxControl'
import SelectControl from './ControlType/SelectControl'

export const OptionTypes = (props) => {
    const { optionTypesData } = props

    const optionControls = {
        DROPDOWN: <SelectControl {...optionTypesData} />,
        CHECKBOX: <CheckboxControl {...optionTypesData} />,
    }

    return optionControls[optionTypesData.type] || null
}
