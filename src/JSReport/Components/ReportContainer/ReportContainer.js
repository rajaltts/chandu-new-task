import React from 'react'
import reportStyles from '../reportStyles'

const ReportContainer = ({ children, style = {} }) => {
    const { reportContainer } = reportStyles
    return <div style={{ ...reportContainer, ...style }}>{children}</div>
}

export default ReportContainer
