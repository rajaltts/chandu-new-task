import React from 'react'
import ContentList from './ContentList'

export default {
    title: 'Report/Content List',
    component: ContentList,
}

const labelStyle = {
    fontWeight: 'bold',
    color: 'blue',
}

const valueStyle = {
    fontSize: '15px',
    color: 'red',
}

const container = {
    width: '400px',
}

const headerStyle = {
    color: 'green',
}

const ContentListTemplate = ({ ...args }) => {
    return <ContentList {...args} />
}

export const Default = ContentListTemplate.bind({})
export const TableWithContent = ContentListTemplate.bind({})
TableWithContent.args = {
    content: [
        { label: 'Content Left 1', value: 'Content Right 1' },
        { label: 'Content Left 2', value: 'Content Right 2' },
        { label: 'Content Left 3', value: 'Content Right 3' },
        { label: 'Content Left 4', value: 'Content Right 4' },
        { label: 'Content Left 5', value: 'Content Right 5' },
    ],
    header: 'Some Table',
}
export const StyleControlled = ContentListTemplate.bind({})
StyleControlled.args = {
    content: [
        { label: 'Content Left 1', value: 'Content Right 1' },
        { label: 'Content Left 2', value: 'Content Right 2' },
        { label: 'Content Left 3', value: 'Content Right 3' },
        { label: 'Content Left 4', value: 'Content Right 4' },
        { label: 'Content Left 5', value: 'Content Right 5' },
    ],
    header: 'Some Table',
    classes: {
        labelStyle: labelStyle,
        valueStyle: valueStyle,
        container: container,
        headerStyle: headerStyle,
    },
}
