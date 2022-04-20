import React from 'react'
import { Card, CardActionArea, CardContent } from '@material-ui/core'
import classNames from 'classnames'

import { useStyles } from './MediaCard.styles'

const MediaCard = ({
    direction,
    selected,
    error,
    disabled,
    color,
    src,
    imgProps,
    contentProps,
    children,
    ...props
}) => {
    const classes = useStyles()

    return (
        <Card
            classes={{
                root: classNames(classes.root, props.className, `color-${color}`, {
                    [classes.rootSelected]: selected,
                    [classes.error]: error,
                    [classes.disabled]: disabled,
                    'no-media': !imgProps?.src,
                }),
            }}
            {...props}
        >
            <CardActionArea className={classes.cardActionArea}>
                <CardContent
                    {...contentProps}
                    className={classNames(classes.cardContent, contentProps?.className, {
                        [classes.cardContentColumn]: direction === 'column',
                    })}
                >
                    {(imgProps?.src || src) && (
                        <img
                            {...imgProps}
                            src={imgProps?.src || src}
                            className={classNames(imgProps?.className, classes.cardImg)}
                        />
                    )}
                    {children}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

MediaCard.defaultProps = {
    direction: 'row',
}

export default MediaCard
