import React from 'react'
import reportStyles from '../reportStyles'
import { Format } from '../ReportPage/Format'
const ReportTableBody = ({ rowData }) => {
    const {
        bgGrey,
        spaceBetween,
        justifycenter,
        justifyend,
        paddingLeftRight,
        tableTd,
        whiteSpace,
        tableTr,
        rowContainer,
    } = reportStyles

    const showTableElements = (text, textData, item) => {
        const textStyle = textData['style'] || {}
        if (text === 'component')
            // to have more possibilities on Cell content (than just a value)
            return textData()
        return (
            <span style={{ ...paddingLeftRight, ...textStyle, ...(text === 'secondaryText' ? whiteSpace : {}) }}>
                {tableTdData(textData, item)}
            </span>
        )
    }
    const tableTdData = (textData, item) => {
        if (!textData['value']) {
            if (item.hideLoader) {
                return ''
            }
            return <Format loading>{''}</Format>
        }
        return (
            <>
                {textData['value']}
                {textData['supValue'] ? <sup> {textData['supValue']}</sup> : ''}
                {textData['subValue'] ? <sub> {textData['subValue']} </sub> : ''}
            </>
        )
    }
    return (
        <tr style={{ ...tableTr }}>
            {rowData.map((item, index) => {
                const bgType = item.bgType ? reportStyles[item.bgType] : bgGrey
                const rowSpan = item.rowSpan || 1
                const colSpan = item.colSpan || 1
                const style = item.style ? item.style : {}
                const headerType = item.headerType ? item.headerType : {}
                const positionType = item.positionType ? item.positionType : 'left'
                const id = item.id ? item.id : index
                return (
                    <td
                        id={id}
                        key={index}
                        colSpan={colSpan}
                        rowSpan={rowSpan}
                        style={{
                            ...tableTd,
                            ...bgType,
                            ...reportStyles[headerType],
                            ...style,
                        }}>
                        <div
                            style={{
                                ...rowContainer,
                                ...(positionType === 'left'
                                    ? spaceBetween
                                    : positionType === 'right'
                                    ? justifyend
                                    : justifycenter),
                            }}>
                            {item.component ? showTableElements('component', item.component, item) : ''}
                            {item.primaryText ? showTableElements('primaryText', item.primaryText, item) : ''}
                            {item.secondaryText ? showTableElements('secondaryText', item.secondaryText, item) : ''}
                        </div>
                    </td>
                )
            })}
        </tr>
    )
}
export default ReportTableBody
