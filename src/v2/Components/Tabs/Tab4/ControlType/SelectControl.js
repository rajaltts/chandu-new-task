import React, { useState } from 'react'
import { injectIntl } from 'react-intl'
import { Grid } from '@material-ui/core'
import { isEmptyArray } from '@carrier/workflowui-globalfunctions'
import ChildProps from '../../../CustomChildProps/ChildProps'
import Discrete from '../../../ControlTypes/Discrete'
import SelectWithAccordion from '../../../SelectWithAccordion/SelectWithAccordion'

const SelectControl = (props) => {
    const {
        name,
        childProps,
        tags,
        rulesJson,
        rulesLoading,
        onNewAssignment,
        onChange,
        step4,
        SECTION_NAMES,
        configurationData,
        onChangeflagSelectionRulesDirty,
    } = props
    const [accordionOpen, setAccordionOpen] = useState(false)

    const onAccordionChange = (e, expanded, hasDetails) => {
        if (!hasDetails) {
            return
        }
        setAccordionOpen(expanded)
    }

    return (
        <Grid item xs={12} sm={12}>
            <Discrete
                name={name}
                tags={tags}
                isConfiguration
                rulesJson={rulesJson}
                rulesLoading={rulesLoading}
                onNewAssignment={onNewAssignment}
                onChange={onChange}>
                <SelectWithAccordion
                    accordionChange={onAccordionChange}
                    isOpen={accordionOpen}
                    isConfiguration
                    childProps={
                        !isEmptyArray(childProps) && (
                            <ChildProps
                                childData={childProps}
                                rulesJson={rulesJson}
                                rulesLoading={rulesLoading}
                                onNewAssignment={onNewAssignment}
                                step4={step4}
                                SECTION_NAMES={SECTION_NAMES}
                                configurationData={configurationData}
                                onChangeflagSelectionRulesDirty={onChangeflagSelectionRulesDirty}
                            />
                        )
                    }
                    keepDetailsOpen={!isEmptyArray(childProps)}
                    rulesJson={rulesJson}
                    noIcon={true}
                />
            </Discrete>
        </Grid>
    )
}

export default injectIntl(SelectControl)
