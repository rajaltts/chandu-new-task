// React
import React, { useState } from 'react'

// Local
import { CandidateTable as SortCandidateTable } from './Sort'

export const CandidateTable = ({ tableConfig, ...restProps }) => {
    const [selectedIds, setSelectedIds] = useState([0])

    const localContent = tableConfig?.content

    if (localContent) {
        localContent.forEach((line) => {
            line.onClick = (id, value) => {
                if (value) setSelectedIds((oldValue) => [...oldValue, id])
                else setSelectedIds((oldValue) => oldValue.filter((v) => v !== id))
            }
            line.selected = selectedIds.includes(line.id)
        })
    }

    return <SortCandidateTable {...restProps} tableConfig={tableConfig} />
}
