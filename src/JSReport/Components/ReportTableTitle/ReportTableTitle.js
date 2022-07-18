import React from 'react'
import reportStyles from '../reportStyles'

const ReportTableTitle = ({ titleInformation }) => {
    const style = titleInformation.style ? titleInformation.style : ''
    return (
        <div
            id={titleInformation.id ? titleInformation.id : `report_table_title_${titleInformation.title}`}
            style={{
                ...reportStyles['tableTitle'],
                ...style,
            }}>
            {titleInformation.title}
        </div>
    )
}

export default ReportTableTitle
