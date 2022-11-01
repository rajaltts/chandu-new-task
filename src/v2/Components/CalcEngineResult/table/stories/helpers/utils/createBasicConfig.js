const sortByStringComparator = (a, b, order) => {
    if (a !== undefined && b !== undefined) {
        if (b < a) return order === 'asc' ? 1 : -1
        if (b > a) return order === 'asc' ? -1 : 1
    }
    return 0
}

const sortByNumberComparator = (a, b, order) => {
    return order === 'asc' ? a - b : b - a
}

export const config = [
    {
        label: 'Name',
        getValue: (index) => `Label (${index + 1})`,
        dataKey: 'name',
        dataKeyComparator: sortByStringComparator,
    },
    {
        label: 'Numeric asc',
        getValue: (index) => index,
        dataKey: 'numericAsc',
        dataKeyComparator: sortByNumberComparator,
    },
    {
        label: 'Numeric desc',
        getValue: (index) => 1000 - index,
        dataKey: 'numericDesc',
        dataKeyComparator: sortByNumberComparator,
    },
    {
        label: 'Numeric random',
        getValue: (index) => Math.floor(Math.random() * (200 - 0 + 1) + 0),
        dataKey: 'numericRandom',
        dataKeyComparator: sortByNumberComparator,
    },
    {
        label: 'Alphabet asc',
        getValue: (index) => String.fromCharCode(97 + index),
        dataKey: 'alphabetAsc',
        dataKeyComparator: sortByStringComparator,
    },
    {
        label: 'Alphabet desc',
        getValue: (index) => String.fromCharCode(90 - index),
        dataKey: 'alphabetDesc',
        dataKeyComparator: sortByStringComparator,
    },
    {
        label: 'Alphabet word',
        getValue: (index) => ['Lithium', 'Beryllium', 'Sodium', 'Magnesium', 'Aluminum'][index % 5],
        dataKey: 'alphabetWord',
        dataKeyComparator: sortByStringComparator,
    },
]

export const createBasicConfig = (
    line = 1,
    column = 1,
    options = {
        cooling: [],
        error: [],
        heating: [],
        highlighted: [],
        infoZone: [],
        sort: [],
        addFakeData: false,
        selectableRow: [],
        selectedRow: [],
        withHeader: true,
        groupRow: [],
    }
) => {
    const header = []
    const content = []

    if (options?.addFakeData === undefined) options.addFakeData = false
    if (options?.withHeader === undefined) options.withHeader = true
    if (options?.selectableRow === undefined) options.selectableRow = []
    if (options?.selectedRow === undefined) options.selectedRow = []
    if (options?.cooling === undefined) options.cooling = []
    if (options?.error === undefined) options.error = []
    if (options?.heating === undefined) options.heating = []
    if (options?.highlighted === undefined) options.highlighted = []
    if (options?.infoZone === undefined) options.infoZone = []
    if (options?.sort === undefined) options.sort = []
    if (options?.groupRow === undefined) options.groupRow = []

    try {
        const endInfoZoneIndex = options?.infoZone?.find((v) => v >= line)
        const deltaInfoZone = endInfoZoneIndex ? 1 : 0

        for (let contentIndex = 0; contentIndex < line; contentIndex += 1) {
            const isSelectable = options?.selectableRow?.includes(contentIndex)
            const isSelected = options?.selectedRow?.includes(contentIndex)
            const isHighlighted = options?.highlighted?.includes(contentIndex)
            const isError = options?.error?.find((v) => v?.index === contentIndex)

            const isGroupRow = options?.groupRow?.find((v) => v?.index === contentIndex)
            const expanderIndex = isGroupRow?.expanderIndex
            const isRowOpen = isGroupRow?.open

            const rowContent = []
            let infoZoneClone = [...(options?.infoZone || [])]
            for (let index = 0; index < column + deltaInfoZone; index += 1) {
                const isCooling = options?.cooling?.includes(index)
                const isHeating = options?.heating?.includes(index)
                const isInfoZone = infoZoneClone?.includes(index)
                const isSortable = options?.sort?.includes(index)

                let headerText = `Header ${index + 1}`
                let rowText =
                    index >= expanderIndex
                        ? ''
                        : isGroupRow
                        ? `Row ${contentIndex + 1}`
                        : `Row ${contentIndex + 1}/${index + 1}`

                if (options.addFakeData) {
                    const fakeConfig = config[index]
                    if (fakeConfig) {
                        headerText = fakeConfig.label
                        rowText = fakeConfig.getValue(contentIndex)
                    }
                }

                if (isInfoZone) {
                    rowContent.push({
                        isInfoZone,
                        ...(isError?.errorMessage && { errorMessage: isError?.errorMessage }),
                    })
                } else {
                    rowContent.push({
                        label: rowText,
                        ...(isCooling && rowText && { hasCooling: isCooling }),
                        ...(isHeating && rowText && { hasHeating: isHeating }),
                        ...(index === expanderIndex && { isGroupRowExpander: true }),
                    })
                }

                if (options?.withHeader && header.length < column + (options?.infoZone?.length || 0)) {
                    if (isInfoZone) {
                        header.push({})
                    } else {
                        let headerDataKey = isSortable && config[index]?.dataKey
                        header.push({
                            label: headerText,
                            ...(headerDataKey && { dataKey: headerDataKey }),
                            ...(isCooling && { isCooling }),
                            ...(isHeating && { isHeating }),
                        })
                    }
                }

                if (isInfoZone) {
                    infoZoneClone?.shift()
                    if (index < column) index -= 1
                }
            }
            content.push({
                id: contentIndex,
                rowContent,
                ...(isSelectable && { isSelectable: true }),
                ...(isSelected && { selected: true }),
                ...(isError && { isError: isError ? true : false }),
                ...(isHighlighted && { isHighlighted }),
                ...(isRowOpen && { isOpen: true }),
            })

            if (isGroupRow && isRowOpen) {
                const errorLines = isGroupRow?.errors
                for (let i = 0; i < 3; i += 1) {
                    infoZoneClone = [...(options?.infoZone || [])]
                    const groupRowContent = []
                    for (let index = 0; index < column + deltaInfoZone; index += 1) {
                        const isCooling = options?.cooling?.includes(index)
                        const isHeating = options?.heating?.includes(index)
                        const isInfoZone = infoZoneClone?.includes(index)
                        if (isInfoZone) {
                            groupRowContent.push({
                                isInfoZone,
                                ...(isError?.errorMessage && { errorMessage: isError?.errorMessage }),
                            })
                        } else {
                            groupRowContent.push({
                                label: `SubRow ${i + 1}/${index + 1}`,
                                ...(isCooling && { hasCooling: isCooling }),
                                ...(isHeating && { hasHeating: isHeating }),
                            })
                        }

                        if (isInfoZone) {
                            infoZoneClone?.shift()
                            if (index < column) index -= 1
                        }
                    }
                    content.push({
                        id: `${contentIndex}_${i}`,
                        isSubGroupRow: true,
                        rowContent: groupRowContent,
                        ...(i === contentIndex && { isHighlighted: true }),
                        ...(errorLines?.includes(i) && { isError: true }),
                    })
                }
            }
        }
    } catch (e) {
        console.warn('ERROR', e)
    }

    return { ...(options?.withHeader && { header }), content }
}
