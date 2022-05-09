// React
import React from 'react'
import PropTypes from 'prop-types'

// Material
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/styles'
import { Box, Card, CardContent, Grid, IconButton, Tooltip } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import WarningIcon from '@material-ui/icons/Warning'

// Styles
import useStyles from './InputRadioCardList.styles'

const propTypeGridRange = (props, propName, componentName) => {
    componentName = componentName || 'ANONYMOUS'

    if (props[propName]) {
        let value = props[propName]
        if (typeof value === 'number') {
            return value >= 1 && value <= 6
                ? null
                : new Error(propName + ' in ' + componentName + ' is not within 1 to 6')
        }
    }

    // assume all ok
    return null
}

const InputRadioCard = ({
    id,
    name,
    label,
    description,
    hasMedia,
    mediaPrefix,
    media,
    checked,
    handleChange,
    loading,
    feasible,
    relaxed,
    className,
    color,
    elevation,
    tooltipTitleUnfeasible,
}) => {
    const classes = useStyles()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

    return (
        <Card
            className={`${classes.cardWrapper} ${checked ? classes.cardWrapperChecked : ''} ${
                relaxed ? 'relaxed' : ''
            } ${loading ? 'loading' : ''} ${!feasible ? 'unfeasible' : ''} ${!hasMedia ? 'no-media' : ''} ${
                className || ''
            } color-${color}`}
            elevation={elevation}>
            <input
                className={classes.cardInput}
                type='radio'
                id={id}
                name={name}
                value={id}
                checked={checked}
                onChange={handleChange}
                disabled={loading}
            />
            <label htmlFor={name} className={classes.cardLabel}>
                {!feasible && checked && (
                    <Tooltip title={tooltipTitleUnfeasible}>
                        <IconButton className={classes.unfeasibleTooltipCardBtn}>
                            <WarningIcon />
                        </IconButton>
                    </Tooltip>
                )}
                {hasMedia && media && (
                    <Box className={classes.cardImgWrapper}>
                        <img
                            className={classes.cardImg}
                            src={`${mediaPrefix}${media}`}
                            title={`${label} ${description}`}
                        />
                    </Box>
                )}
                <CardContent className={classes.cardContent}>
                    <Box className={classes.cardContentBox} mr={isMobile ? 0 : 3}>
                        <Typography variant='body1' className={classes.cardPrimaryText}>
                            {label}
                        </Typography>
                    </Box>
                    {description && (
                        <Typography variant='subtitle1' className={classes.cardSecondaryText}>
                            {description}
                        </Typography>
                    )}
                </CardContent>
            </label>
        </Card>
    )
}

export const InputRadioCardList = ({
    name,
    values,
    value,
    className,
    color,
    handleChange,
    loading,
    relaxed,
    hasMedia,
    nbItemsPerRowMobile,
    nbItemsPerRow,
    mediaPrefix,
    wrongValueText,
}) => {
    const classes = useStyles()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
    const sortedValues = values.filter((a) => a.feasible).concat(values.filter((a) => !a.feasible))

    return (
        <>
            {relaxed && (
                <Box className={classes.errorMsg} display='flex'>
                    <IconButton className={classes.unfeasibleTooltipBtn}>
                        <WarningIcon />
                    </IconButton>
                    <Typography color='error'>{wrongValueText}</Typography>
                </Box>
            )}
            <Grid container spacing={isMobile ? 1 : 2}>
                {sortedValues.map(({ value: itemValue, media, label, secondaryLabel, feasible }) => {
                    const id = `${name}_${itemValue}`
                    return (
                        <Grid
                            key={id}
                            item
                            xs={12 / nbItemsPerRowMobile}
                            sm={nbItemsPerRow === 5 ? 3 : 12 / nbItemsPerRow}>
                            <InputRadioCard
                                id={id}
                                name={name}
                                label={label}
                                description={secondaryLabel}
                                hasMedia={hasMedia}
                                mediaPrefix={mediaPrefix}
                                media={media}
                                checked={value === itemValue}
                                className={`${className || ''}`}
                                handleChange={() => handleChange(itemValue)}
                                loading={loading}
                                feasible={feasible}
                                relaxed={relaxed}
                                color={color}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

InputRadioCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    description: PropTypes.string,
    checked: PropTypes.bool,
    handleChange: PropTypes.func,
    loading: PropTypes.bool,
    feasible: PropTypes.bool,
    relaxed: PropTypes.bool,
    color: PropTypes.string,
}

InputRadioCardList.defaultProps = {
    nbItemsPerRowMobile: 1,
    nbItemsPerRow: 3,
    hasMedia: false,
    color: 'secondary',
}

InputRadioCardList.propTypes = {
    name: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            media: PropTypes.string,
            label: PropTypes.string.isRequired,
            description: PropTypes.string,
            feasible: PropTypes.bool,
            enable: PropTypes.bool,
            advantage: PropTypes.string,
            secondaryLabel: PropTypes.string,
        }).isRequired
    ).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    handleChange: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    relaxed: PropTypes.bool,
    hasMedia: PropTypes.bool,
    mediaPrefix: PropTypes.string,
    nbItemsPerRowMobile: propTypeGridRange,
    nbItemsPerRow: propTypeGridRange,
    color: PropTypes.oneOf(['default', 'primary', 'secondary']),
    wrongValueText: PropTypes.string,
}

export default InputRadioCardList
