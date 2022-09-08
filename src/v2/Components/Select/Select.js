// React
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

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
} from '@material-ui/core'

import WarningIcon from '@material-ui/icons/Warning'

// Components
import Typography from '../Typography/Typography'

import { createAuthorizedProps } from '../utils/createAuthorizedProps'

import useStyles from './Select.styles'

import classNames from 'classnames'

const Select = ({
    label,
    value,
    values,
    renderValue = null,
    handleChange,
    visible = true,
    disabled,
    valid = true,
    relaxed,
    optionAction,
    excludeActionOption,
    info,
    tooltipErrorLabel,
    notCompatibleLabel,
    formControlProps,
    inputLabelProps,
    inputProps,
    showLabel = true,
    selectRootClassName = '',
    formControlClassName = '',
    isKeyBoardAccessible,
    ...rest
}) => {
    const inputLabel = useRef(null)
    const [labelWidth, setLabelWidth] = useState(0)
    const [error, setError] = useState(false)
    const classes = useStyles()

    const authorizedProps = createAuthorizedProps(MaterialSelect, rest)

    useEffect(() => {
        setLabelWidth(visible ? inputLabel.current.offsetWidth : 0)
    }, [])

    useEffect(() => {
        setError(disabled || !visible ? false : !valid || relaxed)
    }, [disabled, visible, valid, relaxed])

    if (!visible) {
        return <></>
    }
    return (
        <>
            <FormControl
                classes={{ root: classes.formControl }}
                variant='outlined'
                disabled={disabled}
                error={error}
                {...formControlProps}>
                <InputLabel shrink={showLabel} {...inputLabelProps} ref={inputLabel}>
                    {showLabel ? label : ''}
                </InputLabel>
                <MaterialSelect
                    id={`Select_${label}`}
                    input={<OutlinedInput notched labelWidth={labelWidth} {...inputProps} />}
                    autoFocus={isKeyBoardAccessible}
                    MenuProps={{
                        classes: {
                            paper: classes.menuWrapper,
                            list: classes.menu,
                        },
                        style: {
                            zIndex: 9999999,
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
                        ...authorizedProps?.MenuProps,
                    }}
                    {...authorizedProps}
                    label={showLabel ? label : ''}
                    className={classNames(classes.selectRoot, selectRootClassName)}
                    onChange={(event) => handleChange && handleChange(event.target.value)}
                    value={value}
                    renderValue={renderValue}>
                    {values &&
                        values.map((v) => {
                            const box = (
                                <Box className={classes.menuItemContainer}>
                                    <Typography color={!v.feasible ? 'error' : 'inherit'}>{v.label}</Typography>
                                    <Box className={classes.adornments}>
                                        <Typography
                                            className={classes.priceMlp}
                                            color={!v.feasible ? 'error' : 'inherit'}>
                                            {v.attributes?.MLP ? '$ ' + v.attributes?.MLP : null}
                                        </Typography>
                                        {!v.feasible && (
                                            <Tooltip label={tooltipErrorLabel}>
                                                <WarningIcon fontSize='small' color='error' />
                                            </Tooltip>
                                        )}
                                    </Box>
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
    handleChange: PropTypes.func,
    info: PropTypes.string,
    tooltipErrorLabel: PropTypes.string,
    notCompatibleLabel: PropTypes.string,
    formControlProps: PropTypes.object,
    inputLabelProps: PropTypes.object,
    inputProps: PropTypes.object,
    rest: PropTypes.object,
}

export default Select
