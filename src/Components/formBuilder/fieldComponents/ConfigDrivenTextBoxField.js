import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import { keyboard, formatValue } from '@carrier/workflowui-globalfunctions';
import translation from "../../Translation";
import classNames from 'classnames'
import '../formBuilder.css'

const ConfigDrivenTextBoxField = (props) => {
    const { rowData = {}, rowIndex, config = {}, value = 0, doNotTranslate } = props;
    const { className = null, onClick = null, isEditable = false } = config;
    const [editable, setEditable] = useState(false);
    const [editedValue, setEditedValue] = useState(false);

    const onClickHandler = () => {
        setEditedValue(getFormatedValue());
        setEditable(true);
    };

    const updateValue = (event) => {
        setEditable(false);
        onClick && onClick(event, editedValue, rowData, rowIndex);
    }

    const enterKeyPressHandler = (event) => {
        event.stopPropagation();
        if (event.key === keyboard.ENTER) {
            updateValue(event)
        }
    }

    const onChangeHandler = (event) => {
        setEditedValue(event.target.value);
    }

    const getFormatedValue = () => {
        return formatValue(config, value);
    }

    const classes = classNames(className, onClick ? 'formBuilderActive' : 'formBuilderNormal');

    if (!isEditable) {
        return getFormatedValue();
    }

    return (editable ?
        <TextField
            variant="outlined"
            value={editedValue}
            autoFocus
            margin={'dense'}
            size={'small'}
            onKeyUp={enterKeyPressHandler}
            onChange={onChangeHandler}
            onBlur={updateValue}
        />
        :
        <Tooltip title={doNotTranslate ? "Click to Edit" : translation("ClickToEdit", "Click to Edit")} arrow>
            <div className={classes} onClick={onClickHandler}>{getFormatedValue()}</div>
        </Tooltip>
        
    )
}

export default ConfigDrivenTextBoxField;