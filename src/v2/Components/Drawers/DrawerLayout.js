import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Drawer } from '@material-ui/core'
import classnames from 'classnames'

import { useStyles } from './DrawerLayout.styles'

const DrawerLayout = ({ children, isOpen, onClose, anchor, elevation, variant, drawerContentProps }) => {
    const classes = useStyles()

    const drawerContentClass = classnames(classes.drawerContent, drawerContentProps?.className)

    useEffect(() => {
        setTimeout(() => {
            if (isOpen) {
                document.body.setAttribute('style', 'overflow-y: auto!important')
            } else {
                document.body.setAttribute('style', 'overflow-y: inherit')
            }
        }, 150)
    }, [isOpen])

    return (
        <Drawer
            elevation={elevation}
            className={classes.drawer}
            open={isOpen}
            onClose={onClose}
            anchor={anchor}
            BackdropProps={{ invisible: true }}
            variant={variant}>
            <div className={drawerContentClass}>
                {children}
            </div>
        </Drawer>
    )
}

DrawerLayout.defaultProps = {
    anchor: 'right',
    elevation: 3,
}

DrawerLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
}

export default DrawerLayout
