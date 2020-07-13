import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = (props) => {
    const { id, disabled, onClick, icon, name, styles='' } = props;

    const onClickHandler = (event) => {
        onClick && onClick(event);
    }
    
    return (
        <button id={id} className={styles} disabled={disabled} onClick={onClickHandler}>
            {icon && <FontAwesomeIcon icon={icon} />}
            {name}
        </button>
    )
}

export default Button;