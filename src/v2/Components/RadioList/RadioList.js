// React
import React, { useMemo } from 'react'

// Material
import { Box, IconButton, Grid } from '@material-ui/core'
import WarningIcon from '@material-ui/icons/Warning'

// Components
import RadioCard from '../RadioCard/RadioCard'
import Typography from '../Typography/Typography'

import { useStyles } from './RadioList.styles'

/**
 * A rule component to manage only one item selection
 * @prop {string | number} value The current rule value
 * @prop {Array<string | number>} [values=[]]
 * @prop {boolean} [loading=false]
 * @prop {boolean} [relaxed=false]
 * @prop {string} [color='primary']
 * @prop {Function} [renderItems=null] Render you own child item component
 * @prop {Object} [defaultItemProps=null] Render the default child item component where you can adjusted some properties
 * @prop {Function} [defaultItemProps.render] Callback function with the default child item component turn back
 * @prop {Object} [defaultItemProps.radioCardProps] Default @see RadioCard properties
 * @prop {gridProps} [defaultItemProps.gridProps] Default grid props @see {@link https://v4.mui.com/api/grid/}
 * @prop {Function} [onClick=null] On item selection triggered
 * @prop {Object} [gridProps={}] Default @see {@link https://v4.mui.com/api/grid/} properties
 * @example
 *  <RadioList
 *      values={[1,2,3]}
 *      value={2}
 *      onClick={(val) => console.log(val)}
 *      defaultItemProps={(defaultProps, item) => ({
 *          ...defaultProps,
 *          gridProps: {
 *              xs: 12,
 *              sm: 6,
 *              md: 3,
 *          },
 *          render: (component) => (
 *              <>
 *                  <h1>My custom rendering with the item component</h1>
 *                  {component}
 *              </>
 *          ),
 *          radioCardProps: {
 *              ...defaultProps.radioCardProps,
 *              mediaCardProps: { ...defaultProps.mediaCardProps, direction: 'column' },
 *          },
 *      })}
 *  />
 * @example
 * <RadioList
 *      values={[1,2,3]}
 *      value={2}
 *      onClick={(val) => console.log(val)}
 *      renderItems={(defaultProps, item, index) => (
 *         <Box className={classes.itemContainer}>
 *             <RadioCard
 *                 {...item}
 *                 {...defaultProps}
 *                 typographyProps={{ uppercase: true }}
 *                 mediaCardProps={{ ...defaultProps.mediaCardProps, elevation: 3, className: classes.item }}
 *             />
 *         </Box>
 *     )}
 * />
 *
 */
const RadioList = ({
    value,
    values = [],
    loading = false,
    relaxed = false,
    color = 'secondary',
    renderItems = null,
    defaultItemProps = null,
    onChange = null,
    tooltipLabelUnfeasible = null,
    gridProps = {},
}) => {
    /*
     *
     *{
     *    render: null,
     *    radioCardProps: null,
     *    gridProps: null,
     *},
     */
    const classes = useStyles()

    const sortedValues = useMemo(() => values.filter((a) => a.feasible).concat(values.filter((a) => !a.feasible)), [
        values,
    ])

    const items = useMemo(() => {
        return sortedValues.map((item, index) => {
            const defaultProps = {
                selected: value === item.value,
                loading: loading,
                tooltipTitleUnfeasible: tooltipLabelUnfeasible,
                mediaCardProps: {
                    direction: 'row',
                    elevation: 0,
                    color,
                    src: item?.media,
                },
                onClick: () => onChange && onChange(item.value),
            }
            if (renderItems) return renderItems(defaultProps, item, index)

            const defaultRadioCardProps = { ...item, ...defaultProps }
            let defaultGridProps = {}
            let itemComponent = <RadioCard {...defaultRadioCardProps} />
            if (defaultItemProps) {
                const { render = null, radioCardProps = {}, gridProps = {} } = defaultItemProps(
                    defaultProps,
                    item,
                    index
                )
                defaultGridProps = gridProps
                const radioCardComponent = <RadioCard {...defaultRadioCardProps} {...radioCardProps} />
                itemComponent = render ? render(radioCardComponent) : radioCardComponent
            }

            return (
                <Grid item key={`${item.name}_${index}`} {...defaultGridProps}>
                    {itemComponent}
                </Grid>
            )
        })
    }, [value, sortedValues, renderItems, defaultItemProps])

    return (
        <>
            {relaxed && (
                <Box className={classes.errorMsg}>
                    <IconButton className={classes.unfeasibleTooltipBtn}>
                        <WarningIcon />
                    </IconButton>
                    <Typography color='error'>{tooltipLabelUnfeasible}</Typography>
                </Box>
            )}
            <Grid container spacing={1} {...gridProps}>
                {items}
            </Grid>
        </>
    )
}

export default RadioList
