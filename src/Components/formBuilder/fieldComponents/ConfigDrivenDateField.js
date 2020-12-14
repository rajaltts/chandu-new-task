import React from 'react';
import { getLocalDate } from '@carrier/workflowui-globalfunctions';
import classNames from 'classnames'
import '../formBuilder.css'

const ConfigDrivenDateField = (props) => {
    const { rowData = {}, rowIndex, config = {}, value = '' } = props;
    const { format = null, className, onClick = null } = config;

    const onClickHandler = (event) => {
        onClick && onClick(event, rowData, rowIndex);
    };

    const classes = classNames(className, onClick ? 'formBuilderActive' : 'formBuilderNormal');
    return (
        <span className={classes} onClick={onClickHandler}>
            {format ?
                getLocalDate(value, format)
                :
                value
            }
        </span>
    )
}

export default ConfigDrivenDateField;