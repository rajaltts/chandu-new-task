// React
import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { injectIntl } from 'react-intl'
import {
    isEmptyArray,
    createAssignment,
    updateAssignment,
    injectIntlTranslation,
    showErrorNotification,
    FilterAndReconfigureVersioned,
    getAssignmentsAfterChanged,
    openNewWindowPopUp,
    mergeVariableDomainsInProperties,
    getRulesAssignmentValue,
    RULES_VERSION,
} from '@carrier/workflowui-globalfunctions'

// Styles
import useStyles from './PostalCode.styles'

// Material
import { Grid, Box, Typography } from '@material-ui/core'

// Layout
import Discrete from '../../../ControlTypes/Discrete'
import RangeWithUnit from '../../../ControlTypes/RangeWithUnit'
import Boolean from '../../../ControlTypes/Boolean'
import Checkbox from '../../../Checkbox/Checkbox'
import Input from '../../../Input/Input'
import Select from '../../../Select/Select'
import CardLayout from '../../../CardLayout'
import { LayoutButton } from '../../../LayoutButton/LayoutButton'
import LoadingIcon from '../../../LoadingIcon/LoadingIcon'
import withExtraProps from '../../../../../HOC/withExtraProps'

const PostalCode = (props) => {
    const {
        intl,
        tags,
        baseApi,
        showErrorNotification,
        ConfigurationInputData,
        setRelaxed,
        onNewAssignment,
        step4,
        sectionNames,
        ruleSet,
    } = props
    const { rulesEngineApi: rulesApi, blobStorage } = baseApi
    const classes = useStyles()
    const [message, setMessage] = useState(null)
    const [postalRules] = useState({})
    const [postalRulesInput, setPostalRulesInput] = useState([])
    const [loadingPostalRules, setLoadingPostalRules] = useState(true)
    const {
        PC_In_bLocalCorrosiveEnv,
        PC_In_sCountryCode,
        PC_In_sPostalCode,
        PC_Out_sMessage,
        PC_In_bHasLowLoadMCHXRestriction,
        PC_In_sLowLoadQuestion1,
        PC_In_sLowLoadQuestion2,
    } = step4[sectionNames.POSTAL_CODE]

    const hasLowLoadRestriction = getRulesAssignmentValue(
        ConfigurationInputData,
        PC_In_bHasLowLoadMCHXRestriction.propName
    )

    const corrosionGuide = `${blobStorage}ecatui/CorrosionGuide.pdf`

    useEffect(() => {
        //When the component loads, load the postal code data
        if (!isEmptyArray(ConfigurationInputData)) {
            getInitialPostalRules()
        }
    }, [])

    const getInitialPostalRules = async () => {
        try {
            setLoadingPostalRules(true)
            const res = await FilterAndReconfigureVersioned(
                rulesApi,
                RULES_VERSION,
                ruleSet.POSTAL_CODE_LINE,
                ruleSet.POSTAL_CODE,
                null,
                null,
                ConfigurationInputData
            )
            mergeVariableDomainsInProperties(postalRules, res.VariableDomains)
            setPostalRulesInput(createAssignment(postalRules))
            setLoadingPostalRules(false)
        } catch (err) {
            //Show error
            showErrorNotification(
                injectIntlTranslation(intl, 'CANNOT_CONNECT_POSTAL_CODE').replace('_ERROR_', err),
                false
            )
        }
    }

    const filterAndReconfigureOnChange = async (propertiesChanged, tags) => {
        try {
            setLoadingPostalRules(true)
            const assignments = getAssignmentsAfterChanged({ inputData: postalRulesInput, propertiesChanged })
            const postalRes = await FilterAndReconfigureVersioned(
                rulesApi,
                RULES_VERSION,
                ruleSet.POSTAL_CODE_LINE,
                ruleSet.POSTAL_CODE,
                tags,
                null,
                assignments
            )
            setRelaxed(postalRes.RelaxedVarNames)
            mergeVariableDomainsInProperties(postalRules, postalRes.VariableDomains)
            setPostalRulesInput(updateAssignment(postalRes.VariableDomains, postalRulesInput))

            //Strip the postal code rules output down to name/value pairs to send as our changed properties
            //parameter in call to onNewAssignment
            const postalProps = trimRulesOutputToNameValuePairs(postalRes)

            onNewAssignment(postalProps, null, null, null, ConfigurationInputData, true)
            setMessage(postalRes.VariableDomains[PC_Out_sMessage.propName].Value)
        } catch (error) {
            showErrorNotification(injectIntlTranslation(intl, 'CANNOT_CONNECT_RULES').replace('_ERROR_', error), false)
        } finally {
            setLoadingPostalRules(false)
        }
    }

    /**
     * Trims a rules output json down, returning an object that is just the property names and values.  For example:
     * {
     *      BU_sModel: "48A",
     *      BU_sUnitSize: "030"
     * }
     * @param {object} rulesOutputJson
     * @returns {object} rules output object stripped down to Name/vale pairs.  See example output above.
     */
    const trimRulesOutputToNameValuePairs = (rulesOutputJson) => {
        let trimmedRulesOutput = {}

        const properties = rulesOutputJson?.VariableDomains
        if (properties) {
            //Iterate through the properties and build an object with only name and value
            for (const prop in properties) {
                trimmedRulesOutput = { ...trimmedRulesOutput, [prop]: properties[prop].Value }
            }
        }

        return trimmedRulesOutput
    }

    if (loadingPostalRules && !Object.keys(postalRules).length) {
        return (
            <Box id={sectionNames.INSTALL_LOCATION} className={classes.mainBox}>
                <Typography variant='h2' color='primary'>
                    {injectIntlTranslation(intl, 'INSTALL_LOCATION', 'Install Location')}
                </Typography>
                <Grid container item alignItems='center' justify='center'>
                    <LoadingIcon width={100} />
                </Grid>
            </Box>
        )
    }

    return (
        <Box id={sectionNames.INSTALL_LOCATION} className={classes.mainBox}>
            <Typography variant='h2' color='primary'>
                {injectIntlTranslation(intl, 'INSTALL_LOCATION', 'Install Location')}
            </Typography>
            <CardLayout>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Discrete
                            name={PC_In_sCountryCode.propName}
                            ruleset={ruleSet.POSTAL_CODE}
                            tags={tags}
                            customHandleChange={filterAndReconfigureOnChange}
                            rulesJson={postalRules}
                            rulesLoading={loadingPostalRules}>
                            <Select />
                        </Discrete>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RangeWithUnit
                            name={PC_In_sPostalCode.propName}
                            ruleset={ruleSet.POSTAL_CODE}
                            tags={tags}
                            customHandleChange={filterAndReconfigureOnChange}
                            className={classes.addMargin}
                            rulesJson={postalRules}
                            rulesLoading={loadingPostalRules}>
                            <Input isInteger />
                        </RangeWithUnit>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Boolean
                            name={PC_In_bLocalCorrosiveEnv.propName}
                            ruleset={ruleSet.POSTAL_CODE}
                            tags={tags}
                            customHandleChange={filterAndReconfigureOnChange}
                            rulesJson={postalRules}
                            rulesLoading={loadingPostalRules}>
                            <Checkbox />
                        </Boolean>
                    </Grid>
                    {hasLowLoadRestriction === 'TRUE' && (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {postalRules[PC_In_sLowLoadQuestion1.propName].visible && (
                                    <Typography variant='h3' color='primary'>
                                        {injectIntlTranslation(intl, 'LOW_LOAD_Q1')}
                                    </Typography>
                                )}
                                <Grid container spacing={3}>
                                    <Grid item xs={2}>
                                        <Discrete
                                            name={PC_In_sLowLoadQuestion1.propName}
                                            ruleset={ruleSet.POSTAL_CODE}
                                            tags={tags}
                                            customHandleChange={filterAndReconfigureOnChange}
                                            rulesJson={postalRules}
                                            rulesLoading={loadingPostalRules}>
                                            <Select showLabel={false} />
                                        </Discrete>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                {postalRules[PC_In_sLowLoadQuestion2.propName].visible && (
                                    <Typography variant='h3' color='primary'>
                                        {injectIntlTranslation(intl, 'LOW_LOAD_Q2')}
                                    </Typography>
                                )}
                                <Grid container spacing={3}>
                                    <Grid item xs={2}>
                                        <Discrete
                                            name={PC_In_sLowLoadQuestion2.propName}
                                            ruleset={ruleSet.POSTAL_CODE}
                                            tags={tags}
                                            customHandleChange={filterAndReconfigureOnChange}
                                            rulesJson={postalRules}
                                            rulesLoading={loadingPostalRules}>
                                            <Select showLabel={false} />
                                        </Discrete>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Typography variant='h5' color='error'>
                            {message}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <LayoutButton
                            className={classes.dropdownButton}
                            variant='outlined'
                            size='small'
                            onClick={() => openNewWindowPopUp(corrosionGuide)}>
                            {injectIntlTranslation(intl, 'More Info', 'More Info')}
                        </LayoutButton>
                    </Grid>
                </Grid>
            </CardLayout>
        </Box>
    )
}

export default injectIntl(withRouter(withExtraProps(PostalCode, { showErrorNotification })))
