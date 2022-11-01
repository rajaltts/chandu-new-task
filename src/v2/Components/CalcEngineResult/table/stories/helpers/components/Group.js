// React
import React, { useEffect, useState } from 'react'

// Local
import { CandidateTable as SelectCandidateTable } from './SimpleSelect'
import { createBasicConfig } from '../utils/createBasicConfig'

export const groupInfoZone = (openIds, line) => {
    return createBasicConfig(line || 6, 5, {
        selectableRow: [0, 1, 2, 3, 4, 5],
        selectedRow: [0],
        infoZone: [0],
        groupRow: [
            { index: 0, expanderIndex: 1, open: openIds.includes(0) },
            { index: 1, expanderIndex: 1, open: openIds.includes(1) },
            { index: 2, expanderIndex: 1, open: openIds.includes(2) },
            { index: 3, expanderIndex: 1, open: openIds.includes(3), errors: [0] },
            { index: 4, expanderIndex: 1, open: openIds.includes(4), errors: [0, 1, 2] },
        ],
        cooling: [2],
        heating: [3],
    })
}

export const CandidateTable = ({ lineNumber, disableInternalData, tableConfig, ...restProps }) => {
    const [localTableConfig, setLocalTableConfig] = useState({})
    const [openIds, setOpenIds] = useState([])

    useEffect(() => {
        const localContent = tableConfig?.content
        if (localContent) {
            const localOpenIds = []
            localContent.forEach((line) => {
                const { rowContent } = line
                rowContent.forEach((elem) => {
                    if (elem.isGroupRowExpander) {
                        if (line.isOpen) localOpenIds.push(line.id)
                    }
                })
            })
            setOpenIds(localOpenIds)
        }
    }, [])

    useEffect(() => {
        const config = disableInternalData ? tableConfig : groupInfoZone(openIds, lineNumber)
        const localContent = config?.content
        if (localContent) {
            localContent.forEach((line) => {
                const { rowContent } = line
                rowContent.forEach((elem) => {
                    if (elem.isGroupRowExpander) {
                        line.onOpen = (id, value) => {
                            if (value) setOpenIds((oldValue) => [...oldValue, id])
                            else setOpenIds((oldValue) => oldValue.filter((v) => v !== id))
                            if (disableInternalData) line.isOpen = value
                        }
                    }
                })
            })
        }
        setLocalTableConfig(config)
    }, [openIds])

    return <SelectCandidateTable {...restProps} tableConfig={localTableConfig} />
}
