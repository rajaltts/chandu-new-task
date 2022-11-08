import React, { useState } from 'react'
import { isEmptyArray } from '@carrier/workflowui-globalfunctions'
import { injectIntl } from 'react-intl'
import Boolean from '../../../ControlTypes/Boolean'
import OptionAccordion from '../../../OptionAccordion/OptionAccordion'
import ChildProps from '../../../CustomChildProps/ChildProps'

const CheckboxControl = (props) => {
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
        <Boolean
            name={name}
            tags={tags}
            isConfiguration
            rulesLoading={rulesLoading}
            rulesJson={rulesJson}
            onNewAssignment={onNewAssignment}
            onChange={onChange}>
            <OptionAccordion
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
            />
        </Boolean>
    )
}

export default injectIntl(CheckboxControl)
