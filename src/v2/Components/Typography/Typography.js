import { Typography as MaterialTypography } from '@material-ui/core'
import useTypographyStyles from './Typography.style'
import React from 'react'
import classNames from 'classnames'

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

export default Typography
