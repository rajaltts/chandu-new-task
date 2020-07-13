import React, { Fragment } from 'react';
import {ColumnType, formatValue} from '@carrier/workflowui-globalfunctions';
import ConfigDrivenUrlField from './fieldComponents/ConfigDrivenUrlField';
import DynamicIcon from '../DynamicIcon';
import Button from '../Button';

const FormBuilderField = (props) => {
    const { config, value } = props;
    const formattedValue = formatValue(config, value);
    
    switch (config.ColumnType) {
        case ColumnType.url:
            return <ConfigDrivenUrlField {...props} />;
        case ColumnType.icon:
            return <DynamicIcon icon={value} {...config} {...props} />
        case ColumnType.button:
            return <Button name={config.name} styles={config.className} onClick={() => config.onClick(props.rowData)} />
        default:
            return <Fragment>{formattedValue}</Fragment>;
    };
}

export default FormBuilderField;