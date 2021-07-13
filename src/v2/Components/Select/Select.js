// React
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

// Material
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Tooltip,
    IconButton,
    OutlinedInput,
} from '@material-ui/core'
import WarningIcon from '@material-ui/icons/Warning'

// Styles
import globalStyles from '../../../styles/globalStyles'
import selectStyles from './Select.styles'

const Select = ({
    id,
    label,
    values,
    value,
    handleChange,
    className,
    disabled,
    relaxed,
    optionAction,
    excludeActionOption,
    valueNotCompatibleText
}) => {
    const inputLabel = useRef(null)
    const [labelWidth, setLabelWidth] = useState(0)
    const globalClasses = globalStyles()
    const classes = selectStyles()

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth)
    }, [])

    const menuProps = {
        classes: {
            paper: globalClasses.menuWrapper,
            list: globalClasses.menu,
        },
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
        },
        transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
        },
        getContentAnchorEl: null,
    }

    return (
        <FormControl
            variant='outlined'
            size='small'
            classes={{
                root: classes.formControl,
            }}
            disabled={disabled}
            error={relaxed}>
            <InputLabel
                classes={{ root: classes.formLabel }}
                shrink
                ref={inputLabel}
                htmlFor='outlined-age-native-simple'>
                {label}
            </InputLabel>
            <Select
                value={value}
                onChange={(event) => handleChange(event.target.value)}
                input={
                    <OutlinedInput
                        classes={{ root: classes.input, focused: classes.inputFocused }}
                        notched
                        labelWidth={labelWidth}
                    />
                }
                label={label}
                MenuProps={menuProps}
                inputProps={
                    id
                        ? {
                              id,
                          }
                        : null
                }
                classes={{ root: classes.selectRoot }}
                className={`${className || ''}`}>
                {values.map((v) => (
                    <MenuItem
                        key={v.value}
                        value={v.value}
                        className={`${classes.optionItem} ${!v.feasible ? 'unfeasible' : ''}`}>
                        {v.label}
                        {!v.feasible && (
                            <Tooltip
                                title={intl.formatMessage({
                                    id: 'WRONG_VALUE_MESSAGE',
                                })}>
                                <IconButton className={classes.unfeasibleTooltipBtn}>
                                    <WarningIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                        {optionAction && excludeActionOption !== v.value && optionAction}
                    </MenuItem>
                ))}
            </Select>
            {relaxed && (
                <FormHelperText>
                    {valueNotCompatibleText}
                </FormHelperText>
            )}
        </FormControl>
    )
}

Select.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    values: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            media: PropTypes.string,
            label: PropTypes.string.isRequired,
            description: PropTypes.string,
            feasible: PropTypes.bool,
            enable: PropTypes.bool,
        }).isRequired
    ).isRequired,
    value: PropTypes.any,
    handleChange: PropTypes.func,
    disabled: PropTypes.bool,
    relaxed: PropTypes.bool,
    optionAction: PropTypes.any,
    excludeActionOption: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    className: PropTypes.string,
    valueNotCompatibleText: PropTypes.string,
}

export default Select