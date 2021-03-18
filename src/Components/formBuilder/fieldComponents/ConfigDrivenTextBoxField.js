import React, { useState, useRef } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import { keyboard, formatValue } from '@carrier/workflowui-globalfunctions';
import translation from "../../Translation";
import classNames from 'classnames'
import '../formBuilder.css'
import { inputStyles } from '../formBuilderStyles';

const ConfigDrivenTextBoxField = (props) => {
    const { rowData = {}, rowIndex, config = {}, value = 0, doNotTranslate } = props;
    const { className = null, onClick = null, onDoubleClick = null, isEditable = false, validations = {} } = config;
    const [isValid, setIsValid] = useState(true);
    const [editable, setEditable] = useState(false);
    const [editedValue, setEditedValue] = useState(false);
    const getFieldTitle = () => {
        if(onClick){
           return doNotTranslate ? "Click to Edit" : translation("ClickToEdit", "Click to Edit");
        }
        if(onDoubleClick){
            return doNotTranslate ? "Doubleclick to Edit" : translation("DoubleclickToEdit", "Doubleclick to Edit");
        }
        return '';
    }
    const [title, setTitle] = useState(getFieldTitle());
    const [validationmessage, setValidationMessage] = useState({width: '100%'});
    const [containerWidth, setContainerWidth] = useState({width: '100%'});
    const { InputRoot } = inputStyles(containerWidth);
    const ref1 = useRef(null);

    const onClickHandler = () => {
        if(onClick){
            setTextBoxField();
        }
    };
    
    const onDoubleClickHandler = () => {
        if(onDoubleClick){
            setTextBoxField();
        }
    }

    const setTextBoxField = () => {
        setContainerWidth({width: `${(ref1.current.offsetWidth - 5)}px`});
        setEditedValue(getFormatedValue());
        setEditable(true);
    }

    const updateValue = (event) => {
        if (checkValidation()) {
            setIsValid(true);
            setEditable(false);
            onClick && onClick(event, editedValue, rowData, rowIndex);
        }
    }

    const checkValidation = () => {
        if (editedValue === value) {
            setEditable(false);
            return false;
        }
        if (validations.validation) {
            const message = validations.validation(editedValue);
            if (message) {
                setValidationMessage(message);
                setIsValid(false);
                return false;
            }
        }
        return true;
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

    return (
        editable ?
            <React.Fragment>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={editedValue}
                    InputProps={{
                        classes: {
                          input: InputRoot,
                        }
                    }}
                    autoFocus
                    margin={'none'}
                    size={'small'}
                    onKeyUp={enterKeyPressHandler}
                    onChange={onChangeHandler}
                    onBlur={updateValue}
                />
                {!isValid && <span className="errorMsg">{validationmessage}</span>}
            </React.Fragment>
            :
            <Tooltip title={title} arrow>
                <div ref={ref1} className={classes} onClick={onClickHandler} onDoubleClick={onDoubleClickHandler}>{getFormatedValue()}</div>
            </Tooltip>
    )
}

export default ConfigDrivenTextBoxField;