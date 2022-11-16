// React
import React from 'react'

import OptionTabsList from './OptionTabsList/OptionTabsList'

const OptionTabListComponent = (props) => {
    const {
        configurationData,
        onNewAssignment,
        onChangeflagSelectionRulesDirty,
        propsThatMakeSelectionRulesDirty,
        sectionNames,
        step4,
        stepInfo,
        stepsContent,
        tabOptionsProps,
    } = props

    return (
        <>
            <OptionTabsList
                optionProps={tabOptionsProps(stepInfo.anchor, stepsContent)}
                configurationData={configurationData}
                onNewAssignment={onNewAssignment}
                onChangeflagSelectionRulesDirty={onChangeflagSelectionRulesDirty}
                propsThatMakeSelectionRulesDirty={propsThatMakeSelectionRulesDirty}
                step4={step4}
                SECTION_NAMES={sectionNames}
            />
        </>
    )
}

export default OptionTabListComponent
