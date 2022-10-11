// React
import React, { useCallback } from 'react'

// Material
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core'

// Libs
import classnames from 'classnames'

// Styles
import { useCandidateCardDetailsStyles } from './CandidateCardDetails.styles'

const CandidateCardDetails = ({ detailsData }) => {
    const classes = useCandidateCardDetailsStyles()

    const createLine = useCallback(
        (title, unit, values, highlightedIndex, borderPos, isCooling, isHeating) => {
            const realTitle = `${title} ${unit ? `(${unit})` : ''}`

            const tableCellContainer = []

            for (let i = 0; i < values.length; i += 1) {
                const value = values[i]
                const isHighlighted = i === highlightedIndex
                const cellClass = classnames(classes.tableCell, {
                    [classes.tableCellHighlighted]: isHighlighted,
                    [classes.tableCellHighlightedTop]: isHighlighted && borderPos === 'top',
                    [classes.tableCellHighlightedBottom]: isHighlighted && borderPos === 'bottom',
                })
                tableCellContainer.push(<TableCell className={cellClass}>{value}</TableCell>)
            }

            return (
                <TableRow>
                    <TableCell
                        className={`
                            ${classes.tableCell}
                            ${isCooling ? classes.coolingCell : ''}
                            ${isHeating ? classes.heatingCell : ''}`}
                    >
                        {realTitle}
                    </TableCell>
                    {tableCellContainer}
                </TableRow>
            )
        },
        [detailsData]
    )

    return (
        <TableContainer>
            <Table id='CandidateCardDetails'>
                <TableBody id='CandidateCardDetails_body'>
                    {detailsData &&
                        detailsData.map((v, i) =>
                            createLine(
                                v.title,
                                v.unit,
                                v.values,
                                v.highlightedIndex,
                                i === 0 ? 'top' : i === detailsData.length - 1 ? 'bottom' : null,
                                v.hasCooling,
                                v.hasHeating
                            )
                        )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CandidateCardDetails
