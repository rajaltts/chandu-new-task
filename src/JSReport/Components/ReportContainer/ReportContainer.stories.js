import React from 'react'
import ReportContainer from './ReportContainer';

export default {
    title: 'Report Container',
    component: ReportContainer
}

const ReportContainerTemplate = ({ ...args }) => {
    return <ReportContainer {...args}>This is Report Container</ReportContainer>
}

export const Basic = ReportContainerTemplate.bind({})
Basic.args = {
    style: {backgroundColor: 'grey'},
}
export const WithStyles = ReportContainerTemplate.bind({})
WithStyles.args = {
    style: {height: '300px', backgroundColor: 'Yellow'},
}