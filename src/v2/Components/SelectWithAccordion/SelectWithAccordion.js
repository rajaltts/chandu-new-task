// React
import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'

// Material
import { Box, Grid, Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core'
import { ArrowDropDown } from '@material-ui/icons'

// Styles
import useStyles from './SelectWithAccordion.styles'

//Form Controls
import Select from '../Select/Select'

// Translation
import { slugify, injectIntlTranslation } from '@carrier/workflowui-globalfunctions'

import classnames from 'classnames'

const SelectWithAccordion = (props) => {
    const {
        intl,
        name,
        defaultExpanded,
        isOpen,
        accordionChange,
        defaultLabel,
        label,
        selectName,
        details,
        childProps,
        keepDetailsOpen,
        noIcon = false,
        rulesJson,
    } = props

    const classes = useStyles()
    const { DETAILS } = rulesJson[name]?.subprops || {}
    const selectedOptionDetails = DETAILS || details
    const hasDetails = selectName || selectedOptionDetails || childProps
    let id = slugify(defaultLabel ? defaultLabel : label)

    return (
        <Accordion
            id={id}
            className={classnames(
                `${classes.accordion} ${!hasDetails ? 'no-accordion' : ''}`,
                !hasDetails && noIcon && classes.noIcon
            )}
            defaultExpanded={defaultExpanded}
            expanded={keepDetailsOpen ? keepDetailsOpen : isOpen}
            onChange={(e, expanded) => accordionChange(e, expanded, hasDetails)}
            elevation={0}
        >
            <AccordionSummary expandIcon={<ArrowDropDown />}>
                <Grid container>
                    <Select {...props} />
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
                                        className={classes.optionDescrTitle}
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

SelectWithAccordion.defaultProps = {
    alwaysSelected: false,
    defaultExpanded: false,
    isOpen: false,
    color: 'secondary',
}

SelectWithAccordion.propTypes = {
    defaultExpanded: PropTypes.bool,
    isOpen: PropTypes.bool,
    accordionChange: PropTypes.func,
    label: PropTypes.string,
    selectName: PropTypes.string,
    isConfiguration: PropTypes.bool,
    name: PropTypes.string.isRequired,
    defaultLabel: PropTypes.string,
}

export default injectIntl(SelectWithAccordion)
