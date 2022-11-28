import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './formBuilder/formBuilder.css'

const DynamicIcon = (props) => {
    const { icon, className = '', style = {}, alt = '', onClick = null, rowData, rowIndex, id = '' } = props

    const dynamicIconId = id ? `dynamicIconId_${ id }` : '';
    const dynamicImgId = id ? `dynamicImgId_${ id }` : '';

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
        return <FontAwesomeIcon id={dynamicIconId} icon={icon} className={className} style={style} />
    }
    return (
        <img
            id={dynamicImgId}
            src={icon}
            className={`${onClick ? 'formBuilderPointerCursor' : ''} ${className}`}
            style={style}
            alt={alt}
            onClick={onClickHandler}
        />
    )
}

export default DynamicIcon
