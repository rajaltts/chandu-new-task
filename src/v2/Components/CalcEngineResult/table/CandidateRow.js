// React
import React from 'react'

// Material
import { IconButton, Radio, TableCell, TableRow, Tooltip } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import ErrorIcon from '@material-ui/icons/Error'
import DoneIcon from '@material-ui/icons/Done'

// Libs
import classnames from 'classnames'

// Styles
import { useCandidateRowStyles } from './CandidateRow.styles'

const CandidateRow = ({
    id,
    selected = false,
    onOpen = null,
    isSelectable = false,
    isSubGroupRow = false,
    isHighlighted = false,
    isError = false,
    isOpen = false,
    rowContent,
    onClick,
    hasGroupWithOverridedHighlight = false,
    isOverrideHighlight = false,
}) => {
    const classes = useCandidateRowStyles()
    const rowClass = classnames(classes.row, {
        [classes.rowHighlighted]:
            ((isHighlighted && !hasGroupWithOverridedHighlight) || isOverrideHighlight) && !isError,
        [classes.rowError]: isError,
    })

    const subRowCellClass = classnames(classes.subRowCell, {
        [classes.subGroupRowCell]: isSubGroupRow,
        ['subGroupRow']: isSubGroupRow && !isError,
        [classes.errorCell]: isError,
    })
    const subRowCellCoolingClass = classnames(subRowCellClass, { [classes.coolingCell]: isHighlighted })
    const subRowCellHeatingClass = classnames(subRowCellClass, { [classes.heatingCell]: isHighlighted })

    const handleClick = () => {
        if (!isError && onClick && (isSelectable || isSubGroupRow)) onClick(id, !selected)
    }

    return (
        <TableRow className={rowClass} onClick={handleClick}>
            {rowContent &&
                rowContent.map((v, i) => {
                    const content = []

                    if (v.isGroupRowExpander) {
                        content.push(
                            <IconButton
                                disabled={isError}
                                size='small'
                                onClick={(e) => {
                                    e.stopPropagation()
                                    if (onOpen) onOpen(id, !isOpen)
                                }}
                            >
                                {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        )
                    } else if (v.isInfoZone) {
                        if (isSelectable && !isError) {
                            const key = `CandidateRow_Radio_${v.id}`
                            content.push(<Radio id={key} checked={selected} key={key} />)
                        }
                        if (((isHighlighted && !hasGroupWithOverridedHighlight) || isOverrideHighlight) && !isError) {
                            content.push(
                                <div key={`DoneIcon_${v.id}`}>
                                    <DoneIcon className={classes.rowHighlightedIcon} />
                                </div>
                            )
                        }
                        if (isError) {
                            content.push(
                                <div className={subRowCellClass} key={`ErrorIcon_${v.id}`}>
                                    <Tooltip
                                        disableHoverListener={v.errorMessage === undefined}
                                        placement='right'
                                        title={v.errorMessage}
                                    >
                                        <ErrorIcon color='error' />
                                    </Tooltip>
                                </div>
                            )
                        }
                    } else if (v.label !== undefined && v.label !== null) {
                        content.push(v.label)
                    }

                    const tableCellClassName = `${v.hasCooling ? classes.coolingCell : ''} ${
                        v.hasHeating ? classes.heatingCell : ''
                    } ${classes.rowCell}`

                    return (
                        <TableCell className={tableCellClassName} key={`tableCell_${i}`}>
                            <div
                                className={`
                                    ${
                                        v.hasCooling
                                            ? subRowCellCoolingClass
                                            : v.hasHeating
                                            ? subRowCellHeatingClass
                                            : subRowCellClass
                                    } 
                                    ${v.isInfoZone ? classes.subRowCellInfoZone : ''}`}
                            >
                                {content}
                            </div>
                        </TableCell>
                    )
                })}
        </TableRow>
    )
}

export default CandidateRow
