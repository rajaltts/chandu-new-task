import React from 'react'
import ReportTableTitle from './ReportTableTitle'

export default {
    title: 'Report Table Title',
    component: ReportTableTitle
}

const titleInformation = {
  title: "Title Information",
  style : {fontSize : "14px",color:"red",background : "lightblue"}
}

const defaultTitleInformation = {
  title: "Title Information",
}

const ReportTableTitleTemplate = ({ ...args }) => {
    return <ReportTableTitle {...args} />
}

export const ReportTableTitleWithProps = ReportTableTitleTemplate.bind({})
ReportTableTitleWithProps.args = {
    titleInformation: titleInformation,
}

export const ReportTableTitleWithDefaultData = ReportTableTitleTemplate.bind({})
ReportTableTitleWithDefaultData.args = {
    titleInformation: defaultTitleInformation
}