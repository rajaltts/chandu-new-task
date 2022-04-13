import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './formBuilder/formBuilder.css'

const DynamicIcon = (props) => {
    const {
        icon,
        className = '',
        style = {},
        title = '',
        alt = '',
        onClick = null,
        rowData,
        rowIndex,
        value = '',
    } = props

    const onClickHandler = (event) => {
        if (onClick) {
            if (rowData) {
                onClick(event, rowData, rowIndex)
            } else {
                onClick(event)
            }
        }
    }

    if (icon && icon.iconName) {
        return <FontAwesomeIcon icon={icon} className={className} style={style} />
    } else {
        return (
            <img
                src={icon}
                className={`${onClick ? 'formBuilderPointerCursor' : ''} ${className}`}
                style={style}
                alt={alt}
                onClick={onClickHandler}
            />
        )
    }
}

export default DynamicIcon
