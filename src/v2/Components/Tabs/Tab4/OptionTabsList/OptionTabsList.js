import React, { useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import { Box, Typography } from '@material-ui/core'
import { injectIntlTranslation, extractDataFromRules, RULES_SUBPROPS } from '@carrier/workflowui-globalfunctions'
import OptionControls from '../OptionControls'
import TabsList from '../../../TabsList/TabsList'

const OptionTabsList = (props) => {
    const {
        intl,
        optionProps: { rulesPropertyName, anchor, allCategories, sectionLabel },
        configurationData,
        rulesLoading,
        onNewAssignment,
        onChangeflagSelectionRulesDirty,
        propsThatMakeSelectionRulesDirty,
        step4,
        SECTION_NAMES,
    } = props
    const [tabsList, setTabsList] = useState([])
    const [activeTab, setActiveTab] = useState(0)
    const [controls, setControls] = useState([])

    const allCategoriesTab = {
        label: injectIntlTranslation(intl, 'ALL_CATEGORIES'),
        value: 'tab-all-categories',
    }

    const setOptionControls = () => {
        const allControls = []
        tabsList.forEach((tab) => {
            let hasError = false
            const controls = {
                label: tab.label,
                propertyList: [],
            }
            Object.keys(configurationData).forEach((config) => {
                const data = configurationData[config]
                if (data && data?.name) {
                    const subprop = [RULES_SUBPROPS.DISPLAYUNIT, RULES_SUBPROPS.UNIT, 'CONTROLTYPE'].some((item) =>
                        data.name.includes(`.${item}`)
                    )
                    if (!subprop && data.tags.includes(tab.value)) {
                        controls.propertyList.push(data)
                        if (!hasError) {
                            const { valid, relaxed } = extractDataFromRules(configurationData, data.name, intl)
                            if (!valid || relaxed) {
                                hasError = true
                                tab.hasError = hasError
                                if (tabsList[0].value === allCategoriesTab.value) {
                                    tabsList[0].hasError = hasError
                                }
                            }
                        }
                    }
                }
            })
            allControls.push(controls)
        })
        setControls(allControls)
    }

    const setOptionTabs = () => {
        if (rulesPropertyName) {
            const { values } = extractDataFromRules(configurationData, rulesPropertyName, intl)
            let tabs = values.map((value) => {
                const {
                    attributes: { Description },
                    value: data,
                } = value
                return {
                    label: Description,
                    value: data,
                }
            })
            if (allCategories && tabs.length > 1) {
                tabs = [allCategoriesTab, ...tabs]
            }
            setTabsList(tabs)
        }
    }

    useEffect(() => {
        if (tabsList.length) {
            setOptionControls()
        }
    }, [tabsList])

    useEffect(() => {
        if (configurationData && Object.keys(configurationData).length && !rulesLoading) {
            setOptionTabs()
        }
    }, [configurationData, rulesLoading])

    const handleChangeTab = (tab) => {
        setActiveTab(tab)
    }

    return (
        <Box id={anchor} mb={2}>
            <Typography variant='h2' color='primary'>
                {sectionLabel}
            </Typography>
            <TabsList tabsList={tabsList} handleChangeTab={handleChangeTab} activeTab={activeTab} />
            <OptionControls
                controls={controls}
                activeTab={activeTab}
                allCategories={allCategories}
                configurationData={configurationData}
                onNewAssignment={onNewAssignment}
                onChangeflagSelectionRulesDirty={onChangeflagSelectionRulesDirty}
                propsThatMakeSelectionRulesDirty={propsThatMakeSelectionRulesDirty}
                step4={step4}
                SECTION_NAMES={SECTION_NAMES}
            />
        </Box>
    )
}

export default injectIntl(OptionTabsList)
