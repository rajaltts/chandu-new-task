// React
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Material
import { IconButton, List, ListItem, ListItemText, TextField } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'

// Styles
import useStyles from './Autocomplete.styles'

const Autocomplete = ({ className, label, values, value, handleChange, allowNewValue }) => {
    const [currentValue, setCurrentValue] = useState(value)
    const [listOpen, setListOpen] = useState(false)
    const classes = useStyles()
    const foundValues = currentValue
        ? values.filter((v) => v.label.toLowerCase().includes(currentValue.toLowerCase()))
        : values

    const clearValue = () => {
        setCurrentValue('')
        handleChange('')
    }

    const openList = () => {
        setListOpen(true)
    }

    const closeList = () => {
        setListOpen(false)
    }

    const listItemHandleClick = (item) => {
        setCurrentValue(item.label)
        setListOpen(false)
        handleChange(item)
    }

    const handleBlur = (item) => {
        if (allowNewValue) {
            setCurrentValue(item)
            handleChange(item)
        }
    }

    return (
        <div className={`${classes.autocomplete} ${className} autocomplete`}>
            <div className={classes.inputWrapper}>
                <TextField
                    type='text'
                    label={label}
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    onBlur={(e) => handleBlur(e.target.value)}
                    onKeyDown={() => setListOpen(true)}
                    variant='outlined'
                    InputLabelProps={{
                        className: classes.label,
                        shrink: true,
                    }}
                    InputProps={{
                        classes: {
                            input: classes.input,
                            focused: classes.inputFocused,
                            notchedOutline: classes.inputNotchedOutline,
                        },
                    }}
                />
                <div className={classes.inputActions}>
                    {currentValue && currentValue !== '' && (
                        <IconButton onClick={clearValue}>
                            <CloseIcon />
                        </IconButton>
                    )}
                    <IconButton onClick={listOpen ? closeList : openList}>
                        {listOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </IconButton>
                </div>
            </div>
            {listOpen && (
                <List className={`${classes.list}`}>
                    {foundValues.map((v) => {
                        return (
                            <ListItem
                                key={v.value}
                                className={classes.listItem}
                                onClick={() => listItemHandleClick(v)}
                                selected={currentValue === v.label}
                            >
                                {<ListItemText primary={v.label} />}
                            </ListItem>
                        )
                    })}
                </List>
            )}
        </div>
    )
}

Autocomplete.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    values: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
        }).isRequired
    ).isRequired,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    allowNewValue: PropTypes.bool,
}

export default Autocomplete
