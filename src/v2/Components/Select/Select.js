// React
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Material
import { MenuItem, Tooltip, TextField, Divider } from '@material-ui/core'

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
    adornments,
    info,
    tooltipErrorLabel,
    notCompatibleLabel,
    inputLabelProps,
    inputProps,
    selectProps,
    menuProps,
    showLabel = true,
    selectRootClassName = '',
    isKeyBoardAccessible,
    ...rest
}) => {
    const [error, setError] = useState(false)
    const classes = useStyles()

    const authorizedProps = createAuthorizedProps(TextField, rest)

    useEffect(() => {
        setError(disabled || !visible ? false : !valid || relaxed)
    }, [disabled, visible, valid, relaxed])

    if (!visible) {
        return null
    }
    return (
        <>
            <TextField
                id={`Select_${label}`}
                select
                variant='outlined'
                size='small'
                disabled={disabled}
                error={error}
                helperText={relaxed && notCompatibleLabel}
                InputProps={inputProps}
                autoFocus={isKeyBoardAccessible}
                InputLabelProps={inputLabelProps}
                SelectProps={{
                    MenuProps: {
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
                        ...menuProps,
                    },
                    renderValue,
                    ...selectProps,
                }}
                {...authorizedProps}
                label={showLabel ? label : ''}
                className={classNames(classes.selectRoot, selectRootClassName)}
                onChange={(event) => handleChange && handleChange(event.target.value)}
                value={value}>
                {values &&
                    values
                        .map((v) => {
                            const box = (
                                <>
                                    <Typography noWrap>{v.label}</Typography>
                                    <span className={classes.adornments}>
                                        <Typography className={classes.priceMlp}>
                                            {v.attributes?.MLP ? '$ ' + v.attributes?.MLP : null}
                                        </Typography>
                                        {!v.feasible && (
                                            <Tooltip label={tooltipErrorLabel}>
                                                <WarningIcon fontSize='small' color='error' />
                                            </Tooltip>
                                        )}
                                        {adornments !== undefined
                                            ? typeof adornments === 'function'
                                                ? adornments(v)
                                                : adornments
                                            : null}
                                        {/* FIXME: Check usage */}
                                        {optionAction && excludeActionOption !== v.value && optionAction}
                                    </span>
                                </>
                            )

                            return (
                                <MenuItem
                                    id={`MenuItem_${v.value}`}
                                    className={classNames(classes.menuItem, !v.feasible && 'unfeasible')}
                                    key={v.value}
                                    value={v.value}
                                    dense>
                                    {v.secondaryLabel ? <Tooltip title={v.secondaryLabel}>{box}</Tooltip> : box}
                                </MenuItem>
                            )
                        })
                        // Add dividers
                        .flatMap((item, i, array) => (array.length - 1 !== i ? [item, <Divider key={i} />] : item))}
            </TextField>
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
    adornments: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
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
