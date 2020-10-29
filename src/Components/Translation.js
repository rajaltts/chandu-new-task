import React from 'react';
import { FormattedMessage as Culture } from 'react-intl';

const translation = (id, defaultMessage = '', value={}) => {
    return <Culture id={id} defaultMessage={defaultMessage} values={value} />
}

export default translation;