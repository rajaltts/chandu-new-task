// React
import React, { useCallback } from 'react'

// Material
import { Table, TableBody, TableCell, TableContainer, TableRow, makeStyles } from '@material-ui/core'

// Libs
import classnames from 'classnames'

const useStyles = makeStyles((theme) => {
    const border = `1px solid ${theme.palette.secondary.main}`
    return {
        coolingCell: {
            backgroundColor: 'rgba(0, 118, 244, 0.1)',
        },
        heatingCell: {
            backgroundColor: 'rgba(211, 19, 54, 0.1)',
        },
        tableCell: {
            padding: theme.spacing(1),
        },
        tableCellHighlighted: {
            borderLeft: border,
            borderRight: border,
        },
        tableCellHighlightedTop: {
            borderTop: border,
        },
        tableCellHighlightedBottom: {
            borderBottom: border,
        },
    }
})

const CandidateCardDetails = ({ detailsData }) => {
    const classes = useStyles()

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
                            ${isHeating ? classes.heatingCell : ''}`}>
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