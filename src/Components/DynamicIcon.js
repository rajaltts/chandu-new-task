import React from 'react';
import * as AllIcons from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './formBuilder/formBuilder.css';

const DynamicIcon = (props) => {
    const { icon, className = '', style = {}, title = '', alt = '', onClick = null, rowData, rowIndex, value = '' } = props;

    const onClickHandler = (event) => {
        if (onClick) {
            if (rowData) {
                onClick(event, rowData, rowIndex);
            }
            else {
                onClick(event);
            }
        }
    };


    if (icon && icon.iconName) {
        return <FontAwesomeIcon icon={icon} className={className} style={style} />;
    }
    else if (AllIcons[icon]) {
        return React.createElement(AllIcons[icon], { title, className, style });
    }
    else {
        return <img src={icon} className={`${onClick ? 'formBuilderPointerCursor' : ''} ${className}`} style={style} alt={alt} onClick={onClickHandler}/>;
    }
};

export default DynamicIcon;
