import React from 'react'
import ReportItemContainer from './ReportItemContainer'
import ReportContainer from '../ReportContainer/ReportContainer'

export default {
    title: 'Report Item Container',
    component: ReportItemContainer,
    argTypes: {
        style: {
            type: 'object',
            name: 'ReportItemContainerStyles',
        },
    },
}

const ReportItemContainerTemplate = ({ ...args }) => {
    return (
        <ReportContainer style={{ backgroundColor: 'Red' }}>
            <ReportItemContainer style={args.style}>
                This is Report item Container which takes the entire full width by default
            </ReportItemContainer>
        </ReportContainer>
    )
}
export const Basic = ReportItemContainerTemplate.bind({})
Basic.args = {
    style: { backgroundColor: 'yellow', margin: '24px' },
}

const TwoReportItemContainerTemplate = ({ ...args }) => {
    return (
        <ReportContainer style={{ backgroundColor: 'Red' }}>
            <ReportItemContainer style={args.style}>
                This is first Report item Container which takes the 50% width
            </ReportItemContainer>
            <ReportItemContainer style={args.style}>
                This is second Report item Container which takes the 50% width
            </ReportItemContainer>
        </ReportContainer>
    )
}
export const WithTwoItem = TwoReportItemContainerTemplate.bind({})
WithTwoItem.args = {
    style: { height: '200px', width: '50%', backgroundColor: 'yellow', margin: '24px' },
}

const ThreeReportItemContainerTemplate = ({ ...args }) => {
    return (
        <ReportContainer style={{ backgroundColor: 'Red' }}>
            <ReportItemContainer style={args.style}>
                This is fisrt Report item Container which takes the 30% width
            </ReportItemContainer>
            <ReportItemContainer style={args.style}>
                This is second Report item Container which takes the 30% width
            </ReportItemContainer>
            <ReportItemContainer style={args.style}>
                This is third Report item Container which takes the 30% width
            </ReportItemContainer>
        </ReportContainer>
    )
}
export const WithThreeItem = ThreeReportItemContainerTemplate.bind({})
WithThreeItem.args = {
    style: { height: '200px', width: '30%', backgroundColor: 'yellow', margin: '24px' },
}
