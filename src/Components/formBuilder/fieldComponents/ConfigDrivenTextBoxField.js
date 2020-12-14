import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { keyboard } from '@carrier/workflowui-globalfunctions';
import translation from "../../Translation";
import classNames from 'classnames'
import '../formBuilder.css'

const ConfigDrivenTextBoxField = (props) => {
    const { rowData = {}, rowIndex, config = {}, value = 0, doNotTranslate } = props;
    const { className = null, onClick = null } = config;
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
    return (
        <span className={classes} onClick={onClickHandler}>
            {editable ?
                <input
                    type="text"
                    value={editedValue}
                    autoFocus
                    onKeyUp={enterKeyPressHandler}
                    onChange={onChangeHandler}
                    onBlur={updateValue}
                />
                :
                <Tooltip title={doNotTranslate ? "Click to Edit" : translation("ClickToEdit", "Click to Edit")} arrow>
                    <span>{value}</span>
                </Tooltip>
            }
        </span>
    )
}

export default ConfigDrivenTextBoxField;