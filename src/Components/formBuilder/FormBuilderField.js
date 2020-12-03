import React, { Fragment } from 'react';
import {columnType, formatValue} from '@carrier/workflowui-globalfunctions';
import ConfigDrivenUrlField from './fieldComponents/ConfigDrivenUrlField';
import DynamicIcon from '../DynamicIcon';
import Button from '../Button';

const FormBuilderField = (props) => {
    const { config, value } = props;
    const formattedValue = formatValue(config, value);
    
    switch (config.columnType) {
        case columnType.url:
            return <ConfigDrivenUrlField {...props} />;
        case columnType.icon:
            return <DynamicIcon icon={value} {...config} {...props} />
        case columnType.button:
            return <Button name={config.name} styles={config.className} onClick={() => config.onClick(props.rowData)} />
        case columnType.customComponent:
            return config.component ? React.cloneElement(config.component, {custProp: value}) : null;
        default:
            return <Fragment>{formattedValue}</Fragment>;
    };
}

export default FormBuilderField;