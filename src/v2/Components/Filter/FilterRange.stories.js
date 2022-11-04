import React, { useState } from 'react'
import FilterRange from './FilterRange'

export default {
    title: 'Layout/FilterRange',
    component: FilterRange,
}

const FilterRangeTemplate = ({ value, ...args }) => {
    const [selectedValue, setSelectedValue] = useState(value)
    return (
        <FilterRange
            {...args}
            value={selectedValue}
            onChange={(e) => {
                setSelectedValue(e.target.value)
            }}
        />
    )
}

export const Basic = FilterRangeTemplate.bind({})
Basic.args = {
    name: 'Range',
    label: 'FilterRange',
    value: [10, 80],
    minMax: [1, 100],
    step: 1,
    unit: 'kW',
}
