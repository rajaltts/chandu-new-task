import React, { memo } from 'react'
import reportStyles from '../../reportStyles'

const ReportNotes = ({ notes = [], type = '', classes = {}, headerType = '' }) => {
    const { olList = {}, liList = {} } = classes

    const createNotes = () => {
        const containerStyle = reportStyles['notesContainer']
        let bulletType = {}
        let olClassType = ''
        switch (type) {
            case 'numeric':
                olClassType = 'numeric'
                bulletType = reportStyles['noListDisc']
                break
            case 'roman':
                bulletType = reportStyles['romanList']
                break
            case 'star':
            default:
                bulletType = reportStyles['noListDisc']
                break
        }
        return (
            <ol style={{ ...containerStyle, ...bulletType, ...reportStyles[headerType], ...olList }}>
                {notes.map((note, index) => {
                    const noteValue = olClassType === 'numeric' ? `(${index + 1}) ${note}` : note
                    return (
                        <li style={liList} key={index}>
                            {noteValue}
                        </li>
                    )
                })}
            </ol>
        )
    }
    return <>{createNotes()}</>
}

export default memo(ReportNotes)
