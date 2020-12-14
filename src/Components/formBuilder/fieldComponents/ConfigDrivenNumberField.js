import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { keyboard } from '@carrier/workflowui-globalfunctions';
import translation from "../../Translation";
import classNames from 'classnames'
import '../formBuilder.css'

const ConfigDrivenNumberField = (props) => {
    const { rowData = {}, rowIndex, config = {}, value = 0, doNotTranslate } = props;
    const { step = "1", min = "-99999999", max = "99999999", className = null, onClick = null } = config;
    const [editable, setEditable] = useState(false);
    const [editedValue, setEditedValue] = useState(false);

    const onClickHandler = () => {
        setEditedValue(value);
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

    const classes = classNames(className, onClick ? 'formBuilderActive' : 'formBuilderNormal');
    return ( editable ?
        <input
            type="number"
            className={classes}
            step={step}
            min={min}
            max={max}
            value={editedValue}
            autoFocus
            onKeyUp={enterKeyPressHandler}
            onChange={onChangeHandler}
            onBlur={updateValue}
        />
        :
        <Tooltip title={doNotTranslate ? "Click to Edit" : translation("ClickToEdit", "Click to Edit")} arrow>
            <div className={classes} onClick={onClickHandler}>{value}</div>
        </Tooltip>
    )
}

export default ConfigDrivenNumberField;