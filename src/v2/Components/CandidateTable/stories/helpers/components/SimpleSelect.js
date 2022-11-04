// React
import React, { useState } from 'react'

// Local
import { CandidateTable as SortCandidateTable } from './Sort'

export const CandidateTable = ({ tableConfig, ...restProps }) => {
    const [selectedId, setSelectedId] = useState(0)

    const localContent = tableConfig?.content

    if (localContent) {
        localContent.forEach((line) => {
            line.onClick = (id) => {
                setSelectedId(id)
            }
            line.selected = line.id === selectedId
        })
    }

    return <SortCandidateTable {...restProps} tableConfig={tableConfig} />
}
