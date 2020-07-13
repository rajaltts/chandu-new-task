import React from 'react';
import { FormattedMessage as Culture } from 'react-intl';

const translation = (id) => {
    return <Culture id={id} />
}

export default translation;