import React from 'react'
import { injectIntl } from 'react-intl'
import { Grid } from '@material-ui/core'

// Translation
import { injectIntlTranslation } from '@carrier/workflowui-globalfunctions'

import Select from '../Select/Select'
import Discrete from '../ControlTypes/Discrete'
import RadioGroup from '../RadioGroup/RadioGroup'
import Boolean from '../ControlTypes/Boolean'
import Checkbox from '../Checkbox/Checkbox'
import RangeWithUnit from '../ControlTypes/RangeWithUnit'
import InputRange from '../InputRange/InputRange'
import ImageContent from '../ImageContent/ImageContent'

const ChildProps = ({
    childData = [],
    rulesJson,
    rulesLoading,
    onNewAssignment,
    intl,
    step4,
    SECTION_NAMES,
    configurationData,
    onChangeflagSelectionRulesDirty,
    customControlType = {},
}) => {
    const renderControls = () => {
        return childData.map((child, i) => {
            let DataControlElement
            let DataFormElement

            switch (child.Attributes.ControlType) {
                case 'DROPDOWN':
                    DataControlElement = Discrete
                    DataFormElement = Select
                    break

                case 'RADIO':
                    DataControlElement = Discrete
                    DataFormElement = RadioGroup
                    break

                case 'CHECKBOX':
                    DataControlElement = Boolean
                    DataFormElement = Checkbox
                    break

                case 'RANGE':
                    DataControlElement = RangeWithUnit
                    DataFormElement = InputRange
                    break

                case 'IMAGE':
                    DataControlElement = Discrete
                    DataFormElement = ImageContent
                    break

                default:
                    break
            }

            //check to see if child.Attributes.ControlType is customControlType(CUSTOMCOMPONENT_ERV), If so, render custom component
            const customControlData = customControlType[child.Attributes.ControlType]
            if (customControlData) {
                const { controlElementType, customElement } = customControlData
                DataControlElement = controlElementType
                DataFormElement = customElement
            }

            //Check to see if we are missing info to render our child.  If so, show error about unknown control type.
            if (!DataControlElement || !DataFormElement)
                return (
                    <>
                        `${injectIntlTranslation(intl, 'ERROR_UNKNOWN_CHILD_CONTROLTYPE')} $
                        {child.Attributes.ControlType}`
                    </>
                )
            return (
                <Grid container item xs={12} spacing={3} key={i}>
                    <Grid key={i} item xs={12} sm={6}>
                        <DataControlElement
                            name={child.Value}
                            tags={child.tags}
                            isConfiguration
                            rulesJson={rulesJson}
                            rulesLoading={rulesLoading}
                            onNewAssignment={onNewAssignment}>
                            <DataFormElement
                                row
                                step4={step4}
                                SECTION_NAMES={SECTION_NAMES}
                                configurationData={configurationData}
                                rulesLoading={rulesLoading}
                                onNewAssignment={onNewAssignment}
                                onChangeflagSelectionRulesDirty={onChangeflagSelectionRulesDirty}
                            />
                        </DataControlElement>
                    </Grid>
                </Grid>
            )
        })
    }

    return (
        <Grid container direction='column'>
            {renderControls()}
        </Grid>
    )
}

export default injectIntl(ChildProps)
