import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    labelWithInput: {
        fontSize: "13px",
        marginLeft: "5px"
    },
});
function LabelWithInput(props) {
    const { labelWithInput } = useStyles();
    const { type, name, controlId, checked, labelText, OnControlChange, value, disabled = false, constant } = props;

    const onChangeHandler = (e) => {
        const { checked } = e.target;
        OnControlChange && OnControlChange(e.target.type === 'radio' ? e.target.value : checked, constant)
    }

    return (
        <label>
            <input
                type={type}
                name={name}
                id={controlId}
                onChange={onChangeHandler}
                checked={checked}
                value={value}
                disabled={disabled}
            />
            <span className={labelWithInput}>{labelText}</span>
        </label>
    )
}

export default LabelWithInput;