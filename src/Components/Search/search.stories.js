import React from 'react'
import Search from './Search'

export default {
    title: 'Component/Search',
    component: Search,
}

const SearchTemplate = ({ ...args }) => {
    const searchQuery = () => {
        alert('Onsearch event fired.')
        return
    }

    return <Search {...args} onSearchQueryChange={searchQuery}></Search>
}

export const SearchComponent = SearchTemplate.bind({})
SearchComponent.args = {
    searchValue: '',
    onSearchQueryChange: null,
}
