import React from 'react';
import { getLocalDate } from '@carrier/workflowui-globalfunctions';
import classNames from 'classnames'
import '../formBuilder.css'

const ConfigDrivenDateField = (props) => {
    const { rowData = {}, rowIndex, config = {}, value = '' } = props;
    const { format = null, className, onClick = null, updatedByKey } = config;

    const onClickHandler = (event) => {
        onClick && onClick(event, rowData, rowIndex);
    };

    const classes = classNames(className, onClick ? 'formBuilderActive' : 'formBuilderNormal');
    return (
        <div className={classes}>
            <div onClick={onClickHandler}>
                { format ? getLocalDate(value, format) : value }
            </div>
            { updatedByKey && <div className="formBuilderOpacity">by {rowData[updatedByKey]}</div> }
        </div>
    )
}

export default ConfigDrivenDateField;