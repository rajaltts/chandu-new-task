// React
import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'

// Translation
import { slugify, injectIntlTranslation } from '@carrier/workflowui-globalfunctions'

// Material
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    FormControlLabel,
    Grid,
    Tooltip,
} from '@material-ui/core'
import { Check, ArrowDropDown } from '@material-ui/icons'

// Checkbox
import Checkbox from '../Checkbox/Checkbox'

// Styles
import useStyles from './OptionAccordion.styles'
import clsx from 'clsx'

const OptionAccordion = ({
    name,
    defaultExpanded,
    isOpen,
    accordionChange,
    handleChange,
    alwaysSelected,
    defaultLabel,
    label,
    rightContent,
    selectName,
    value,
    disabled,
    valid,
    relaxed,
    color,
    intl,
    details,
    rulesJson,
    childProps,
    keepDetailsOpen,
}) => {
    const classes = useStyles()
    const error = !valid || relaxed
    const selectedOption = rulesJson[name]?.values.find((prop) => prop.Value === 'TRUE')
    const { DETAILS } = rulesJson[name]?.subprops || {}
    const selectedOptionDescription = selectedOption?.Attributes.Description
    const selectedOptionDetails = DETAILS || details
    const selectedOptionPrice = selectedOption?.Attributes.MLP
    const selectedOptionQuantity = selectedOption?.Attributes.QTY
    const selectedOptionPartNumber = selectedOption?.Attributes.PN
    const currentLabel = defaultLabel ? defaultLabel : selectedOptionDescription
    const hasDetails = selectName || selectedOptionDetails || childProps
    let id = slugify(defaultLabel ? defaultLabel : label)

    const Label = () => {
        const optionLabel = (
            <div>
                <div>{currentLabel}</div>
                {selectedOptionPartNumber ? <div className={classes.partNumber}>{selectedOptionPartNumber}</div> : null}
            </div>
        )

        return (
            <>
                {error ? (
                    <Tooltip
                        data-WarningText={`${name}__CONTROL_SELECTION_WARNING`}
                        title={injectIntlTranslation(intl, 'CONTROL_SELECTION_WARNING')}
                    >
                        {optionLabel}
                    </Tooltip>
                ) : (
                    optionLabel
                )}
            </>
        )
    }

    return (
        <Accordion
            id={id}
            className={`${classes.accordion} ${!hasDetails ? 'no-accordion' : ''}`}
            defaultExpanded={defaultExpanded}
            expanded={keepDetailsOpen ? keepDetailsOpen : isOpen}
            onChange={(e, expanded) => accordionChange(e, expanded, hasDetails)}
            elevation={0}
        >
            <AccordionSummary expandIcon={<ArrowDropDown />}>
                <Grid container>
                    {alwaysSelected ? (
                        <Box className={classes.readonlyOptionTitle} display='flex'>
                            <Check />
                            <Label data-Label={`${name}__${currentLabel}`} />
                        </Box>
                    ) : (
                        <FormControlLabel
                            className={clsx({
                                [classes.labelDisabled]: disabled,
                                [classes.error]: error,
                            })}
                            aria-label={currentLabel}
                            control={
                                <Checkbox
                                    id={name}
                                    checked={value}
                                    value={value}
                                    name={currentLabel}
                                    color={color}
                                    disabled={disabled}
                                    onChange={handleChange}
                                    data-Disabled={`${name}__${disabled}`}
                                    data-Error={`${name}__${error}`}
                                    data-Checked={`${name}__${value}`}
                                />
                            }
                            label={<Label data-Label={`${name}__${currentLabel}`} />}
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                        />
                    )}
                    <div className={classes.optionRightContent}>
                        {selectedOptionQuantity && (
                            <Typography className={classes.optionPrice} color='primary'>
                                {`${injectIntlTranslation(intl, 'Quantity: ')}`} {selectedOptionQuantity}
                            </Typography>
                        )}
                        {selectedOptionPrice && (
                            <Typography className={classes.optionPrice} color='primary'>
                                $ {selectedOptionPrice}
                            </Typography>
                        )}
                        {rightContent}
                    </div>
                </Grid>
            </AccordionSummary>
            {hasDetails && (
                <AccordionDetails>
                    <Grid container>
                        <Grid item xs={12}>
                            {selectedOptionDetails && (
                                <Box>
                                    <Typography
                                        variant='body1'
                                        color='textPrimary'
                                        className={classes.optionDescrTitle}
                                    >
                                        {injectIntlTranslation(intl, 'Description')}
                                    </Typography>
                                    <Typography variant='body1' color='textPrimary'>
                                        {selectedOptionDetails}
                                    </Typography>
                                </Box>
                            )}
                            {childProps && (
                                <Box>
                                    <Typography
                                        variant='body1'
                                        color='textPrimary'
                                        className={!disabled ? classes.optionDescrTitle : classes.optionDisabled}
                                    >
                                        {injectIntlTranslation(intl, 'Related Properties')}
                                    </Typography>
                                    {childProps}
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </AccordionDetails>
            )}
        </Accordion>
    )
}

OptionAccordion.defaultProps = {
    alwaysSelected: false,
    defaultExpanded: false,
    isOpen: false,
    color: 'primary',
}

OptionAccordion.propTypes = {
    defaultExpanded: PropTypes.bool,
    isOpen: PropTypes.bool,
    accordionChange: PropTypes.func,
    alwaysSelected: PropTypes.bool,
    label: PropTypes.string,
    selectName: PropTypes.string,
    description: PropTypes.string,
    advantage: PropTypes.string,
    price: PropTypes.string,
    rightContent: PropTypes.any,
    color: PropTypes.oneOf(['default', 'primary', 'secondary']),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    disabled: PropTypes.bool,
    relaxed: PropTypes.bool,
    valid: PropTypes.bool,
}

export default injectIntl(OptionAccordion)
