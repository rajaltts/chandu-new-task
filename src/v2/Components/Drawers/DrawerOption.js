//React
import React from 'react'
import { injectIntl } from 'react-intl'
import { useDrag } from 'react-dnd'

//Constants
import PropTypes from 'prop-types'

//Material UI
import DeleteIcon from '@material-ui/icons/Delete'
import { Box, Grid, IconButton, Typography, useTheme, useMediaQuery } from '@material-ui/core'

//Styles
import useStyles from './DrawerOption.styles'

//Assets
import DragHandleSvg from './drag-handle.svg'

import { getPriceString } from '@carrier/workflowui-globalfunctions'

const DrawerOption = ({
    defaultOption,
    name,
    defaultLabel,
    label,
    anchor,
    draggable,
    moveOption,
    removeOptionFromCart,
    selected,
    alwaysSelected,
    intl,
    columnData,
    scrollTo,
    slugify,
    scrollOffset,
}) => {
    const theme = useTheme()
    const isUpMd = useMediaQuery(theme.breakpoints.up('md'))
    const classes = useStyles()
    const currentLabel = defaultOption ? defaultLabel : label
    let currentAnchor = null

    if (!columnData) {
        return null
    }

    if (anchor) {
        currentAnchor = slugify(defaultOption ? defaultLabel : label)
    }

    const handleLinkClick = () => {
        if (anchor && isUpMd) {
            scrollTo(`#${currentAnchor}`, scrollOffset)
        }
    }

    const [{ isDragging }, drag] = useDrag({
        item: { name, type: selected ? 'SelectedOption' : 'AvailableOption' },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()

            if (item && dropResult) {
                moveOption(item.name)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    })

    const LegendHeader = () => {
        return (
            <Grid container className={classes.legendWrapper}>
                <Grid item xs={2}></Grid>
                <Grid item xs={10} className={classes.priceContainer}>
                    {Object.keys(columnData).map((priceLabel) => (
                        <Box key={priceLabel}>
                            <Typography variant='caption' className={classes.legend}>
                                {intl.formatMessage({
                                    id: priceLabel,
                                })}
                            </Typography>
                        </Box>
                    ))}
                </Grid>
            </Grid>
        )
    }

    return (
        <>
            {defaultOption && <LegendHeader />}
            <div
                className={`${classes.option} ${isDragging ? 'is-dragging' : ''} ${defaultOption ? 'is-default' : ''}`}
                ref={draggable ? drag : null}
                style={{ opacity: isDragging ? 0.5 : 1 }}
                onDoubleClick={() => moveOption(name)}
            >
                <Grid container>
                    <Grid item xs={12}>
                        <Box className={classes.topLine} display='flex'>
                            {/* Description of the option */}
                            <Typography
                                color='textPrimary'
                                className={`${classes.optionName} ${defaultOption ? 'bold' : ''} ${
                                    anchor ? 'link' : ''
                                }`}
                                onClick={handleLinkClick}
                            >
                                {currentLabel}
                            </Typography>

                            {/* Delete button */}
                            <Box className={classes.topLineBtns}>
                                {!defaultOption && !alwaysSelected && (
                                    <IconButton className={classes.removeOptionBtn} onClick={removeOptionFromCart}>
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                                {draggable && (
                                    <IconButton className={classes.dragHandleBtn}>
                                        <DragHandleSvg className={classes.dragHandleIcon} />
                                    </IconButton>
                                )}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Columns of data for the option.  For example: Part Number, Quantity, and MLP */}
                    <Grid item xs={2}></Grid>
                    <Grid item xs={10} container className={classes.priceContainer}>
                        {columnData.map((col) => (
                            <Grid
                                item
                                sm={col.columnWidth}
                                xs={col.columnWidth}
                                key={col.key}
                                style={col.priceUnit ? { textAlign: 'right' } : { textAlign: 'center' }}
                            >
                                <Typography variant='subtitle1' color='secondary'>
                                    {col.priceUnit ? getPriceString(col.priceUnit, col.value) : col.value}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

DrawerOption.propTypes = {
    defaultOption: PropTypes.bool,
    name: PropTypes.string,
    draggable: PropTypes.bool,
    getPriceString: PropTypes.func.isRequired,
    scrollTo: PropTypes.func.isRequired,
    slugify: PropTypes.func.isRequired,
}

export default injectIntl(DrawerOption)
