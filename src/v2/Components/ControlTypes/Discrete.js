import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { extractDataFromRules, DISCRETE_TYPE } from '@carrier/workflowui-globalfunctions'

const Discrete = ({
    name,
    ruleset,
    tags,
    excludeUnfeasible,
    autoSelectFirst,
    removeUselessAny,
    intl,
    children,
    onChange,
    isConfiguration = false,
    customHandleChange = null,
    rulesJson,
    rulesLoading,
    onNewAssignment,
}) => {
    const { value, label, values, visible, valid, relaxed, enabled, default: defaultValue } = extractDataFromRules(rulesJson, name, intl, excludeUnfeasible)

    const handleChange = (value) => {
        //Create an assignment for the rules property and value for this component
        const newAssignments = { [name]: value }

        if (customHandleChange) {
            return customHandleChange(newAssignments, ruleset, tags, values, isConfiguration)
        }

        //Call the WorkflowContainer component's callback to handle the change
        onNewAssignment(newAssignments, ruleset, tags, () => {
            const selectedValue = values.find((v) => v.value === value)
            if (onChange) {
                onChange({
                    manualChange: true,
                    property: {
                        name,
                        label,
                    },
                    value: selectedValue,
                })
            }
        }, null, isConfiguration)
    }

    if (autoSelectFirst && values.length && !value) {
        onNewAssignment([{ Name: name, Value: values[0].value }], ruleset, tags, () => {
            if (onChange) {
                onChange({ manualChange: false, name, value: values[0].value })
            }
        })
        return null
    }

    let removeAny = false
    if (removeUselessAny && values.length === 2 && values.find((v) => v.value === 'ANY')) {
        removeAny = true
    }

    //const disabled = rulesLoading || removeAny || (values.length === 1 && values[0].value === value)

    const getValue = () => {
        if (!value) {
            return defaultValue || "";
        }
        return value;
    }

    const childrenWithProps = React.Children.map(children, (child) => {
        return React.cloneElement(child, {
            values: removeAny ? values.filter((v) => v.value !== 'ANY') : values,
            value: getValue(),
            label,
            handleChange,
            name,
            valid,
            relaxed,
            visible,
            disabled: rulesLoading || !enabled,
        })
    })

    return <>{childrenWithProps}</>
}

Discrete.defaultProps = {
    type: DISCRETE_TYPE.SELECT,
}

Discrete.propTypes = {
    name: PropTypes.string,
    intl: PropTypes.object,
    onChange: PropTypes.func,
    children: PropTypes.object,
    excludeUnfeasible: PropTypes.bool,
    autoSelectFirst: PropTypes.bool,
}

export default injectIntl(Discrete)
