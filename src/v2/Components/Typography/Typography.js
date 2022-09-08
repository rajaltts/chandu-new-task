import { Typography as MaterialTypography } from '@material-ui/core'

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import useTypographyStyles from './Typography.style'

const Typography = ({ bold, uppercase, className, ...rest }) => {
    const classes = useTypographyStyles()
    return (
        <MaterialTypography
            classes={{ paragraph: classes.paragraph }}
            className={classNames(className, classes.root, {
                [classes.bold]: bold,
                [classes.uppercase]: uppercase,
            })}
            {...rest}
        />
    )
}

Typography.propTypes = {
    bold: PropTypes.bool,
    uppercase: PropTypes.bool,
    color: PropTypes.oneOf(['initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error']),
    align: PropTypes.oneOf(['inherit', 'left', 'center', 'right', 'justify']),
    variant: PropTypes.oneOf([
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'button',
        'overline',
        'srOnly',
        'inherit',
    ]),
}

export default Typography
