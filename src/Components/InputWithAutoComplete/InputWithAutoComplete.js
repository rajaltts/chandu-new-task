import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const InputWithAutoComplete = (props) => {
    const { label, options, defaultOptions, classes = {}, multiple, disableCloseOnSelect, onChange, outlined } = props

    function handleOnChange(event, value, reason){
        if(typeof(onChange) === 'function'){
            onChange(event, value, reason)
        }
    }

    return(
        <div className={classes.root}>
            <Autocomplete
                multiple={multiple}
                id={label}
                size="small"
                options={options}
                defaultValue={defaultOptions}
                getOptionLabel={(option) => attrName ? option[attrName] : option.title}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant={outlined&&"outlined"}
                        label={label}
                    />
                )}
                disableCloseOnSelect={disableCloseOnSelect}
                onChange={handleOnChange}
            />
        </div>
    )
}

export default InputWithAutoComplete;