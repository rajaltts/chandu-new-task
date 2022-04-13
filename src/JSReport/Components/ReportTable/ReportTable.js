import React from 'react'
import ReportTableTitle from '../ReportTableTitle/ReportTableTitle'
import ReportTableBody from '../ReportTableBody/ReportTableBody'
import reportStyles from '../reportStyles'
const ReportTable = ({ TableData = [], titleInformation = {} }) => {
    return (
        <>
            {titleInformation['title'] && <ReportTableTitle titleInformation={titleInformation} />}
            {TableData && !!TableData.length && (
                <table style={reportStyles['table']}>
                    {TableData.map((rowData, index) => {
                        if (rowData && !rowData.length) {
                            return null
                        }
                        return <ReportTableBody rowData={rowData} />
                    })}
                </table>
            )}
        </>
    )
}

export default ReportTable
