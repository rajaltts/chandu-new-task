import React from 'react'
import { GetProp } from '@carrier/workflowui-globalfunctions'
import { GetMetricValue } from '@carrier/ngecat-unitsconversion'
import { FormatTransKey } from '@carrier/workflowui-globalfunctions'
import { FormattedMessage as Culture } from 'react-intl'

const SimpleTagDescription = (props) => {
    const {
        propName,
        RulesJSON,
        isLabel,
        unitahriRounding,
        ahriRounding,
        unitConversion,
        unitcode,
        unitPropName,
        GetAHRIDigits,
    } = props

    const getDescription = (propName) => {
        const PropData = GetProp(propName, RulesJSON)
        let PropDescription
        if (isLabel === 'true') {
            if (ahriRounding) {
                return unitConversion
                    ? handleUnitConversion(PropData.Value)
                    : GetAHRIDigits && GetAHRIDigits(PropData.Value, ahriRounding)
            }
            return PropData
                ? PropData.Value === 'FALSE'
                    ? 'No'
                    : PropData.Value === 'TRUE'
                    ? 'Yes'
                    : unitConversion
                    ? checkUserTempUnit(PropData.Value)
                    : PropData.Value
                : ''
        } else {
            if (PropData && PropData.Values) {
                PropDescription = PropData.Values.find((data) => {
                    return data.Value === PropData.Value
                })
            }
            return PropDescription && PropDescription.Attributes && PropDescription.Attributes.Description
        }
    }

    const handleUnitConversion = (value) => {
        const unitProp = GetProp(unitPropName, RulesJSON)
        return (
            GetAHRIDigits &&
            GetAHRIDigits(unitcode === unitProp.Value ? value : GetMetricValue(value, unitcode), ahriRounding)
        )
    }

    const checkUserTempUnit = (value) => {
        const propUnit = GetProp('User_sTemperatureUnit', RulesJSON)
        return propUnit.Value === 'F' ? value : GetAHRIDigits && GetAHRIDigits(((value - 32) * 5) / 9, unitahriRounding)
    }

    return (
        <label id={`Ctrl${propName}`}>
            {props.NeedToTranslate ? (
                <Culture id={FormatTransKey(getDescription(propName))} />
            ) : (
                <span>{getDescription(propName)}</span>
            )}
        </label>
    )
}

export default SimpleTagDescription
