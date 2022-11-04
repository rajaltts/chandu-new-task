// React
import React, { useEffect, useState } from 'react'

// Local
import { config } from '../utils/createBasicConfig'
import { CandidateTable as BaseCandidateTable } from './Base'

export const CandidateTable = ({ tableConfig, order, orderBy, requestSortCallback, ...restProps }) => {
    const [localConfig, setLocalConfig] = useState({})
    const [localOrder, setLocalOrder] = useState(order)
    const [localOrderBy, setLocalOrderBy] = useState(
        orderBy || tableConfig?.header?.find((element) => element.dataKey)?.dataKey || 'name'
    )

    useEffect(() => {
        setLocalOrder(order)
    }, [order])

    useEffect(() => {
        setLocalOrderBy(orderBy)
    }, [orderBy])

    useEffect(() => {
        if (tableConfig?.content) {
            const headerIndex = tableConfig?.header?.findIndex((v) => v.dataKey === localOrderBy)
            const index = config.findIndex((v) => v.dataKey === localOrderBy)
            if (index >= 0 && config[index]?.dataKeyComparator) {
                const sortedContent = tableConfig?.content?.sort((a, b) => {
                    const aValue = a?.rowContent[headerIndex]?.label
                    const bValue = b?.rowContent[headerIndex]?.label
                    if (aValue !== undefined && bValue !== undefined) {
                        return config[index].dataKeyComparator(aValue, bValue, localOrder)
                    }
                    return 0
                })
                setLocalConfig({ ...tableConfig, content: sortedContent })
                if (requestSortCallback) requestSortCallback(localOrder, localOrderBy)
            } else {
                setLocalConfig(tableConfig)
            }
        }
    }, [localOrder, localOrderBy, tableConfig?.content])

    const handleRequestSort = (property, newOrder) => {
        if (requestSortCallback) {
            setLocalOrder(newOrder)
            setLocalOrderBy(property)
        }
    }

    return (
        <BaseCandidateTable
            {...restProps}
            tableConfig={{ ...localConfig }}
            order={localOrder}
            orderBy={localOrderBy}
            requestSortCallback={handleRequestSort}
        />
    )
}
