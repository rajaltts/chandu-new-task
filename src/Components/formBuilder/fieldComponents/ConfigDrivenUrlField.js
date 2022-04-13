import React from 'react'
import { formatValue } from '@carrier/workflowui-globalfunctions'
import classNames from 'classnames'
import '../formBuilder.css'

const ConfigDrivenUrlField = (props) => {
    const { rowData = {}, rowIndex, config = {}, value = '' } = props
    const { href, className, onClick = null } = config

    const onClickHandler = (event) => {
        onClick && onClick(event, rowData, rowIndex)
    }

    const classes = classNames(className, onClick ? 'formBuilderActive' : 'formBuilderNormal')
    return (
        <a href={href} className={classes} target='_blank' onClick={onClickHandler}>
            {formatValue(config, value, rowData)}
        </a>
    )
}

export default ConfigDrivenUrlField
