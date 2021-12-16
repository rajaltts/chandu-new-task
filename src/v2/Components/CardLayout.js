import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Card, CardContent } from '@material-ui/core'

const useStyles = makeStyles({
    cardContent: {
        padding: '20px',
    },
})

const CardLayout = ({ children, cardClassName, contentClassName }) => {
    const classes = useStyles()

    return (
        <Card className={cardClassName} elevation={0}>
            <CardContent className={`${classes.cardContent} ${contentClassName}`}>{children}</CardContent>
        </Card>
    )
}

CardLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    cardClassName: PropTypes.any,
    contentClassName: PropTypes.any,
}

export default CardLayout
