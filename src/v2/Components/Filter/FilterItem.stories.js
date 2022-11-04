import React from 'react'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import Select from '../Select/Select'
import FilterItem from './FilterItem'

export default {
    title: 'Layout/FilterItem',
    component: FilterItem,
}

const FilterItemTemplate = ({ ...args }) => {
    return <FilterItem {...args} />
}

export const Basic = FilterItemTemplate.bind({})
Basic.args = {
    title: 'FilterItem',
    openByDefault: true,
    children: (
        <>
            <Select
                value={1}
                values={[
                    { value: 1, label: 'One', feasible: true },
                    { value: 2, label: 'Two', feasible: true },
                    { value: 3, label: 'Three', feasible: true },
                ]}
            />
            <ButtonGroup
                value={1}
                values={[
                    { value: 1, label: 'On', feasible: true },
                    { value: 2, label: 'Off', feasible: true },
                ]}
            />
        </>
    ),
}
