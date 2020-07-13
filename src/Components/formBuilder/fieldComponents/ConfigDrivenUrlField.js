import React from 'react';
import { formatValue } from '@carrier/workflowui-globalfunctions';
import '../formBuilder.css'

const ConfigDrivenUrlField = (props) => {
    const { rowData = {}, rowIndex, config = {}, value = '' } = props;
    const { href, className, onClick = null } = config;

    const onClickHandler = (event) => {
        onClick && onClick(event, rowData, rowIndex);
    };

    const classes = `${className} ${onClick ? 'active' : 'normal'}`;
    return (
        <a href={href} className={classes} target='_blank' onClick={onClickHandler}>
            {formatValue(config, value)}
        </a>
    )
}

export default ConfigDrivenUrlField;