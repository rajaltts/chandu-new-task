import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        [theme.breakpoints.up('lg')]: {
            position: 'sticky',
            top: 170,
        },
    },
}))

const StickyAside = ({ children }) => {
    const classes = useStyles()

    return (
        <div id='sticky-aside' className={classes.wrapper}>
            {children}
        </div>
    )
}

StickyAside.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default StickyAside
