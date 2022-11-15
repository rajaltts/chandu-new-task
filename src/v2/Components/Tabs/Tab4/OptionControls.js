import React, { useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import { OptionTypes } from './OptionTypes'

const OptionControls = (props) => {
    const {
        controls,
        activeTab,
        allCategories,
        configurationData,
        onNewAssignment,
        onChangeflagSelectionRulesDirty,
        propsThatMakeSelectionRulesDirty,
        step4,
        SECTION_NAMES,
    } = props
    const [activeControls, setActiveControls] = useState([])
    useEffect(() => {
        if (controls.length) {
            if (!activeTab && allCategories) {
                setActiveControls(controls)
                return
            }
            setActiveControls([controls[activeTab]])
        }
    }, [controls, activeTab])

    const renderControls = (control) => {
        const { name, tags, subprops, visible, children } = control
        const visibleChildrenGroup =
            children !== undefined
                ? children.map(({ Value }) => {
                      return { name: Value, visible: configurationData[Value].visible }
                  })
                : []

        const { CONTROLTYPE } = subprops
        if (!CONTROLTYPE && !visible) {
            return null
        }

        const isAnyChildrenVisible =
            visibleChildrenGroup.length !== 0 &&
            visibleChildrenGroup.some(({ visible }) => {
                return visible === true
            })

        const isChangeMakesSelectionRulesDirty = propsThatMakeSelectionRulesDirty.current.includes(name)

        const CHILDREN = configurationData[name]?.children ?? []
        const optionTypesData = {
            name,
            tags,
            type: CONTROLTYPE,
            childProps: isAnyChildrenVisible ? CHILDREN : isAnyChildrenVisible,
            rulesJson: configurationData,
            onNewAssignment: onNewAssignment,
            onChange: isChangeMakesSelectionRulesDirty ? onChangeflagSelectionRulesDirty : null,
            step4: step4,
            SECTION_NAMES: SECTION_NAMES,
            configurationData: configurationData,
            onChangeflagSelectionRulesDirty: onChangeflagSelectionRulesDirty,
        }
        return <OptionTypes optionTypesData={optionTypesData} />
    }

    return activeControls.map((control) => {
        return control.propertyList.map((item) => {
            return renderControls(item)
        })
    })
}

export default injectIntl(OptionControls)
