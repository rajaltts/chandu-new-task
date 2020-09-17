import React from 'react';
import { FormattedMessage as Culture } from 'react-intl';

const translation = (id, defaultMessage = '') => {
    return <Culture id={id} defaultMessage={defaultMessage} />
}

export default translation;