import React, { useState } from 'react'
import { isEmptyArray } from '@carrier/workflowui-globalfunctions'
import { injectIntl } from 'react-intl'
import Boolean from '../../../ControlTypes/Boolean'
import OptionAccordion from '../../../OptionAccordion/OptionAccordion'
import ChildProps from '../../../CustomChildProps/ChildProps'
import Discrete from '../../../ControlTypes/Discrete'
import CUSTOMCOMPONENT_ERV from '../../../CustomComponent_ERV/CustomComponent_ERV'

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

    const customControlType = {
        CUSTOMCOMPONENT_ERV: {
            controlElementType: Discrete,
            customElement: CUSTOMCOMPONENT_ERV,
        },
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
                            customControlType={customControlType}
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
