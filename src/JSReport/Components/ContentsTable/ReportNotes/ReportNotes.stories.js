import React from 'react'
import ReportNotes from './ReportNotes'

export default {
    title: 'Report Notes',
    component: ReportNotes,
}

const ReportNotesTemplate = ({ ...args }) => {
    return <ReportNotes {...args} />
}

export const Decimal = ReportNotesTemplate.bind({})
Decimal.args = {
    type: 'numeric',
    notes: ['text 1', 'text 2'],
}
export const Star = ReportNotesTemplate.bind({})
Star.args = {
    type: 'star',
    notes: ['***text 1', '** text 2'],
}
export const Roman = ReportNotesTemplate.bind({})
Roman.args = {
    type: 'roman',
    notes: ['text 1', 'text 2'],
}
export const HeaderType = ReportNotesTemplate.bind({})
HeaderType.args = {
    type: 'roman',
    notes: ['text 1', 'text 2'],
    headerType: 'h3',
}

const olList = {
    width: '200px',
}
const liList = {
    color: 'green',
}

export const StyleControlled = ReportNotesTemplate.bind({})
StyleControlled.args = {
    type: 'roman',
    notes: ['text 1', 'text 2'],
    headerType: 'h3',
    classes: {
        olList: olList,
        liList: liList,
    },
}
