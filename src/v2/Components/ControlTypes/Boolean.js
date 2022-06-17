import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { extractDataFromRules } from '@carrier/workflowui-globalfunctions'

const Boolean = ({
    name,
    intl,
    ruleset,
    children,
    tags,
    onChange,
    isConfiguration = false,
    customHandleChange = null,
    rulesJson,
    rulesLoading,
    onNewAssignment,
}) => {
    const {
        value,
        values,
        label,
        relaxed,
        valid,
        visible,
        enabled,
        default: defaultValue,
    } = extractDataFromRules(rulesJson, name, intl)

    const handleChange = (event) => {
        const value = event.target.checked ? 'TRUE' : 'FALSE'

        if (customHandleChange) {
            return customHandleChange({ [name]: value }, ruleset, tags, values, isConfiguration)
        }

        onNewAssignment(
            { [name]: value },
            ruleset,
            tags,
            () => {
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
            },
            null,
            isConfiguration
        )
    }

    const getValue = () => {
        if (!value) {
            if (defaultValue) {
                return defaultValue === 'TRUE'
            }
            return ''
        }
        return value === 'TRUE'
    }

    const childrenWithProps = React.Children.map(children, (child) => {
        return React.cloneElement(child, {
            values: values,
            value: getValue(),
            label,
            handleChange,
            disabled: rulesLoading || !enabled,
            name,
            relaxed,
            valid,
            visible,
        })
    })

    return <>{childrenWithProps}</>
}

Boolean.propTypes = {
    name: PropTypes.string,
    intl: PropTypes.object,
    children: PropTypes.object,
    onChange: PropTypes.func,
}

export default injectIntl(Boolean)
