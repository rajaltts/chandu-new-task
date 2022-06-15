// Material
import {
    FormControl,
    InputLabel,
    Select as MaterialSelect,
    MenuItem,
    FormHelperText,
    Tooltip,
    OutlinedInput,
    Box,
    makeStyles,
} from '@material-ui/core'
import WarningIcon from '@material-ui/icons/Warning'

// React
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

// Components
import Typography from '../Typography/Typography'

import { createAuthorizedProps } from '../utils/createAuthorizedProps'

const useStyles = makeStyles(() => ({
    formControl: {
        minWidth: 240,
    },
    menuItemContainer: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        width: '100%',
    },
}))

const Select = ({
    label,
    values,
    onChange,
    disabled,
    relaxed,
    optionAction,
    excludeActionOption,
    info,
    tooltipErrorLabel,
    notCompatibleLabel,
    formControlProps,
    inputLabelProps,
    inputProps,
    ...rest
}) => {
    const inputLabel = useRef(null)
    const [labelWidth, setLabelWidth] = useState(0)
    const classes = useStyles()

    const authorizedProps = createAuthorizedProps(MaterialSelect, rest)

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth)
    }, [])

    return (
        <>
            <FormControl
                classes={{ root: classes.formControl }}
                variant='outlined'
                disabled={disabled}
                error={relaxed}
                {...formControlProps}>
                <InputLabel shrink {...inputLabelProps} ref={inputLabel}>
                    {label}
                </InputLabel>
                <MaterialSelect
                    id={`Select_${label}`}
                    input={<OutlinedInput notched labelWidth={labelWidth} {...inputProps} />}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                        },
                        transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                        },
                        getContentAnchorEl: null,
                        ...authorizedProps?.MenuProps,
                    }}
                    {...authorizedProps}
                    label={label}
                    onChange={(event) => onChange && onChange(event.target.value)}>
                    {values &&
                        values.map((v) => {
                            const box = (
                                <Box className={classes.menuItemContainer}>
                                    <Typography color={!v.feasible ? 'error' : 'inherit'}>{v.label}</Typography>
                                    {!v.feasible && (
                                        <Tooltip label={tooltipErrorLabel}>
                                            <WarningIcon fontSize='small' color='error' />
                                        </Tooltip>
                                    )}
                                </Box>
                            )

                            return (
                                <MenuItem id={`MenuItem_${v.value}`} key={v.value} value={v.value}>
                                    {v.secondaryLabel ? <Tooltip title={v.secondaryLabel}>{box}</Tooltip> : box}
                                    {optionAction && excludeActionOption !== v.value && optionAction}
                                </MenuItem>
                            )
                        })}
                </MaterialSelect>
                {relaxed && <FormHelperText>{notCompatibleLabel}</FormHelperText>}
            </FormControl>
            {info && (
                <div className={classes.infoContainer}>
                    <WarningIcon />
                    <Typography variant='caption'>{info}</Typography>
                </div>
            )}
        </>
    )
}

Select.propTypes = {
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
    disabled: PropTypes.bool,
    relaxed: PropTypes.bool,
    optionAction: PropTypes.any,
    excludeActionOption: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    onChange: PropTypes.func,
    info: PropTypes.string,
    tooltipErrorLabel: PropTypes.string,
    notCompatibleLabel: PropTypes.string,
    formControlProps: PropTypes.object,
    inputLabelProps: PropTypes.object,
    inputProps: PropTypes.object,
    rest: PropTypes.object,
}

export default Select
