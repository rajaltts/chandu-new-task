import React from 'react'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import Select from '../Select/Select'
import FilterItem from './FilterItem'
import FilterList from './FilterList'
import FilterRange from './FilterRange'

export default {
    title: 'Layout/FilterList',
    component: FilterList,
}

const FilterListTemplate = ({ ...args }) => {
    return <FilterList {...args} />
}

export const Basic = FilterListTemplate.bind({})
Basic.args = {
    title: 'FilterList',
    total: 12,
    selected: 4,
    children: (
        <>
            <FilterItem title={'FilterItem1'} openByDefault>
                <Select
                    value={1}
                    values={[
                        { value: 1, label: 'One', feasible: true },
                        { value: 2, label: 'Two', feasible: true },
                        { value: 3, label: 'Three', feasible: true },
                    ]}
                />
            </FilterItem>
            <FilterItem title={'FilterItem2'}>
                <ButtonGroup
                    value={1}
                    values={[
                        { value: 1, label: 'On', feasible: true },
                        { value: 2, label: 'Off', feasible: true },
                    ]}
                />
            </FilterItem>
            <FilterItem title={'FilterItem3'}>
                <FilterRange
                    name='FilterRange'
                    label='FilterRange'
                    value={[10, 80]}
                    minMax={[1, 100]}
                    step={1}
                    unit='kW'
                />
            </FilterItem>
        </>
    ),
}
