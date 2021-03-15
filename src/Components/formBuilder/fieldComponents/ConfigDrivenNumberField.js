import React, { useState, useRef } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import { keyboard, formatValue } from '@carrier/workflowui-globalfunctions';
import translation from "../../Translation";
import classNames from 'classnames'
import '../formBuilder.css'
import { inputStyles } from '../formBuilderStyles';

const ConfigDrivenNumberField = (props) => {
    const { rowData = {}, rowIndex, config = {}, value = 0, doNotTranslate } = props;
    const { step = "1", min = "-99999999", max = "99999999", className = null, onClick = null,
        isEditable = false, validations = {} } = config;
    const [editable, setEditable] = useState(false);
    const [editedValue, setEditedValue] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [validationmessage, setValidationMessage] = useState('');
    const [containerWidth, setContainerWidth] = useState({width: '100%'});
    const { InputRoot } = inputStyles(containerWidth);
    const ref1 = useRef(null);

    const onClickHandler = () => {
        setContainerWidth({width: `${(ref1.current.offsetWidth - 5)}px`});
        setEditedValue(getFormatedValue());
        setEditable(true);
    };

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
                    type='number'
                    variant="outlined"
                    fullWidth
                    inputProps={{ min, max, step }}
                    InputProps={{
                        classes: {
                          input: InputRoot,
                        }
                    }}
                    value={editedValue}
                    autoFocus
                    margin='none'
                    size='small'
                    onKeyUp={enterKeyPressHandler}
                    onChange={onChangeHandler}
                    onBlur={updateValue}
                />
                {!isValid && <span className="errorMsg">{validationmessage}</span>}
            </React.Fragment>
            :
            <Tooltip ref={ref1} title={doNotTranslate ? "Click to Edit" : translation("ClickToEdit", "Click to Edit")} arrow>
                <div className={classes} onClick={onClickHandler}>{getFormatedValue()}</div>
            </Tooltip>
    )
}

export default ConfigDrivenNumberField;