import React, { Fragment } from 'react'
import { columnType, formatValue } from '@carrier/workflowui-globalfunctions'
import ConfigDrivenUrlField from './fieldComponents/ConfigDrivenUrlField'
import ConfigDrivenDateField from './fieldComponents/ConfigDrivenDateField'
import ConfigDrivenNumberField from './fieldComponents/ConfigDrivenNumberField'
import ConfigDrivenTextBoxField from './fieldComponents/ConfigDrivenTextBoxField'
import ConfigDrivenMeatBallMenuField from './fieldComponents/ConfigDrivenMeatBallMenuField'
import DynamicIcon from '../DynamicIcon'
import Button from '../Button'

const FormBuilderField = (props) => {
    const { config, value, rowData } = props
    const formattedValue = formatValue(config, value, rowData)

    switch (config.columnType) {
        case columnType.url:
            return <ConfigDrivenUrlField {...props} />
        case columnType.icon:
            return <DynamicIcon icon={value} {...config} {...props} />
        case columnType.date:
            return <ConfigDrivenDateField {...props} />
        case columnType.number:
            return <ConfigDrivenNumberField {...props} />
        case columnType.textBox:
            return <ConfigDrivenTextBoxField {...props} />
        case columnType.button:
            return <Button name={config.name} styles={config.className} onClick={() => config.onClick(rowData)} />
        case columnType.meatballMenu:
            return <ConfigDrivenMeatBallMenuField {...props} />
        case columnType.customComponent:
            return config.component ? React.createElement(config.component, { ...props }) : null
        default:
            return (
                <span
                    className={config.className}
                    onClick={(event) => config.onClick && config.onClick(event, rowData)}
                >
                    {formattedValue}
                </span>
            )
    }
}

export default FormBuilderField
