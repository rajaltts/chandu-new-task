import React, { useState } from 'react'
import { GetUnitConversion } from '@carrier/ngecat-unitsconversion'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { extractDataFromRules, SUFFIX_DEFAULT_UNIT, roundingAndPrecision } from '@carrier/workflowui-globalfunctions'

const RangeWithUnit = ({
    unit: unitSystem, 
    name, 
    ruleset, 
    tags, 
    intl, 
    children, 
    customConversion,
    customHandleChange = null, 
    rulesLoading,
    rulesJson,
    onNewAssignment,
    isConfiguration = false, 
    className
}) => {

    //Extract data for the child components from the rules property
    const extractedData = extractDataFromRules(rulesJson, name, intl)
    let {
        value: basedValue,
        displayUnits,
        unit,
        displayUnit,
        percent,
        relatedProperty,
        relatedPropertyValue,
        min,
        max,
        visible,
        valid,
        label,
        enabled,
        roundingDigits,
        roundingMethod
    } = extractedData
    const [percentofAnotherValue, setPercentofAnotherValue] = useState(percent)//unit === '%' ? true : false)

    // if the value is displayed based on percent of another value, lets recompute using related property else just convert
    if (percentofAnotherValue) {
        basedValue = (basedValue * 100) / relatedPropertyValue
    } else if (unit !== displayUnit) {
        if (customConversion) {
            let { value, minvalue, maxvalue } = customConversion(extractedData)
            basedValue = value
            min = minvalue
            max = maxvalue
        }
        else {
            basedValue = GetUnitConversion(unit, displayUnit, basedValue, 0, {})
            min = GetUnitConversion(unit, displayUnit, min, 0, {})
            max = GetUnitConversion(unit, displayUnit, max, 0, {})
        }
    }

    const handleChange = (value) => {
        if (percentofAnotherValue) {
            selectionChangedHandler({ [name]: (value * relatedPropertyValue) / 100 })
        } else if (unit !== displayUnit) {
            let newVal
            if (customConversion) {
                let { value } = customConversion(extractedData)
                newVal = value
            }
            else {
                newVal = GetUnitConversion(displayUnit, unit, value, 0, {
                    toFixed: roundingDigits,
                })
            }
            selectionChangedHandler({ [name]: `${newVal}`, [`${name}${SUFFIX_DEFAULT_UNIT}`]: displayUnit })
        } else {
            selectionChangedHandler({ [name]: `${value}` })
        }
    }

    const selectionChangedHandler = (newAssignments, values) => {
        if (customHandleChange) {
            return customHandleChange(newAssignments, ruleset, tags, values, isConfiguration)
        }
        onNewAssignment(newAssignments, ruleset, tags, null, null, isConfiguration)
    }

    const unitChange = (value) => {
        if (value === '%') {
            setPercentofAnotherValue(true)
        } else {
            setPercentofAnotherValue(false)
            const newUnit = value
            selectionChangedHandler({ [`${name}${SUFFIX_DEFAULT_UNIT}`]: newUnit })
        }
    }
    
    const childrenWithProps = React.Children.map(children, (child) => {
        return React.cloneElement(child, {
            value: roundingAndPrecision(basedValue, roundingMethod, roundingDigits),
            label,
            units: relatedProperty ? displayUnits.concat('%') : displayUnits,
            unit: percent ? '%' : displayUnit,
            min: roundingAndPrecision(min, roundingMethod, roundingDigits),
            max: roundingAndPrecision(max, roundingMethod, roundingDigits),
            handleChange,
            unitChange,
            relatedProperty,
            loading: rulesLoading,
            disabled: rulesLoading || !enabled,
            visible,
            name,
            valid,
            className: className
        })
    })

    return <>{childrenWithProps}</>
}

const mapStateToProps = (state) => ({
    unit: state.locale.unit,
})

RangeWithUnit.propTypes = {
    name: PropTypes.string,
    intl: PropTypes.object,
    children: PropTypes.object,
    excludeUnfeasible: PropTypes.bool,
    autoSelectFirst: PropTypes.bool,
}

export default injectIntl(connect(mapStateToProps, null)(RangeWithUnit))