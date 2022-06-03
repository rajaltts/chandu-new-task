// React
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'

// Translation
import { slugify, injectIntlTranslation } from '@carrier/workflowui-globalfunctions'

// Material
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { Box, FormControlLabel, Grid, Tooltip } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import CheckIcon from '@material-ui/icons/Check'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Checkbox  from '@material-ui/core/Checkbox'

// Styles
import useStyles from './OptionAccordion.styles'

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
    keepDetailsOpen
}) => {
    const classes = useStyles()
    const error = !valid || relaxed;
    const selectedOption = rulesJson[name]?.values.find((prop) => prop.Value === 'TRUE');
    const { DETAILS } = rulesJson[name]?.subprops || {};
    const selectedOptionDescription = selectedOption?.Attributes.Description
    const selectedOptionDetails = DETAILS || details;
    const selectedOptionPrice = selectedOption?.Attributes.MLP
    const selectedOptionQuantity = selectedOption?.Attributes.QTY;
    const selectedOptionPartNumber = selectedOption?.Attributes.PN
    const currentLabel = defaultLabel ? defaultLabel : selectedOptionDescription
    const hasDetails = selectName || selectedOptionDetails || childProps
    let id = slugify(defaultLabel ? defaultLabel : label)

    const Label = () => {

        const optionLabel = (
            <div>
                <div>
                    {currentLabel}
                </div>
                {selectedOptionPartNumber ? (
                    <div className={classes.partNumber}>
                    {selectedOptionPartNumber}
                </div>
                ) : null}
            </div>
        );

        return (
            <>
                {error ? (
                    <Tooltip
                        data-WarningText={`${name}__CONTROL_SELECTION_WARNING`}
                        title={injectIntlTranslation(intl, "CONTROL_SELECTION_WARNING")}
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
            elevation={0}>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                <Grid container>
                    {alwaysSelected ? (
                        <Box className={classes.readonlyOptionTitle} display='flex'>
                            <CheckIcon />
                            <Label data-Label={`${name}__${currentLabel}`} />
                        </Box>
                    ) : (
                        <FormControlLabel
                            className={`${error ? classes.error : ''}`}
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
                            <Typography className={classes.optionPrice} color='secondary'>
                                {`${injectIntlTranslation(intl, "Quantity: ")}`} {selectedOptionQuantity}
                            </Typography>
                        )}
                        {selectedOptionPrice && (
                            <Typography className={classes.optionPrice} color='secondary'>
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
                                        className={classes.optionDescrTitle}>
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
                                        className={classes.optionDescrTitle}>
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
    color: 'secondary',
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
