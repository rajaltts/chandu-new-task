import React from 'react'
import reportStyles from '../reportStyles'

const ReportTableTitle = ({ titleInformation }) => {
    const style = titleInformation.style ? titleInformation.style : ''
    return (
        <div
            style={{
                ...reportStyles['tableTitle'],
                ...style,
            }}>
            {titleInformation.title}
        </div>
    )
}

export default ReportTableTitle
