// React
import React from 'react'

// Material
import { IconButton, makeStyles, Radio, TableCell, TableRow, Tooltip } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import ErrorIcon from '@material-ui/icons/Error'
import DoneIcon from '@material-ui/icons/Done'

// Libs
import classnames from 'classnames'

const useStyles = makeStyles((theme) => ({
    row: {
        cursor: 'pointer',
        '&:hover': {
            '& .subGroupRow': {
                backgroundColor: theme.palette.grey['450'],
            },
        },
    },
    rowError: {
        cursor: 'not-allowed',
    },
    rowHighlighted: {
        border: `1px solid ${theme.palette.secondary.main}`,
    },
    rowHighlightedIcon: {
        color: theme.palette.secondary.main,
    },
    coolingCell: {
        backgroundColor: 'rgba(0, 118, 244, 0.1) !important',
    },
    heatingCell: {
        backgroundColor: 'rgba(211, 19, 54, 0.1) !important',
    },
    rowCell: {
        borderBottom: 'none',
        cursor: 'inherit',
        padding: theme.spacing(0.2, 0, 0.2, 0),
    },
    subRowCell: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(0, 0.5),
        height: 40,
    },
    subRowSelectableCell: {
        backgroundColor: 'white',
    },
    subGroupRowCell: {
        backgroundColor: '#E5E7ED',
    },
    errorCell: {
        color: theme.palette.text.disabled,
    },
}))

const CandidateRow = ({
    selected = null,
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
    ...tableRowProps
}) => {
    const classes = useStyles()
    const rowClass = classnames(classes.row, {
        [classes.rowHighlighted]:
            ((isHighlighted && !hasGroupWithOverridedHighlight) || isOverrideHighlight) && !isError,
        [classes.rowError]: isError,
    })

    const subRowCellClass = classnames(classes.subRowCell, {
        [classes.subRowSelectableCell]: isSelectable,
        [classes.subGroupRowCell]: isSubGroupRow,
        ['subGroupRow']: isSubGroupRow && !isError,
        [classes.errorCell]: isError,
    })
    const subRowCellCoolingClass = classnames(subRowCellClass, { [classes.coolingCell]: isHighlighted })
    const subRowCellHeatingClass = classnames(subRowCellClass, { [classes.heatingCell]: isHighlighted })

    const handleClick = () => {
        if (!isError && onClick) onClick()
    }

    return (
        <TableRow {...tableRowProps} className={rowClass} onClick={handleClick}>
            {rowContent &&
                rowContent.map((v, i) => {
                    const content = []

                    console.log(v.id, 'hasGroupWithOverridedHighlight', hasGroupWithOverridedHighlight)
                    console.log(v.id, 'isOverrideHighlight', isOverrideHighlight)

                    if (v.isGroupRowExpander) {
                        content.push(
                            <IconButton
                                disabled={isError}
                                size='small'
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onOpen(!isOpen)
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
                                <div className={subRowCellClass} key={`DoneIcon_${v.id}`}>
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
                                className={
                                    v.hasCooling
                                        ? subRowCellCoolingClass
                                        : v.hasHeating
                                        ? subRowCellHeatingClass
                                        : subRowCellClass
                                }
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
