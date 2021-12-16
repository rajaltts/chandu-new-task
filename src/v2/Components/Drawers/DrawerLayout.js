import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import { UI_SIZES } from '../utils/constants'

const useStyles = makeStyles((theme) => ({
    drawer: {
        zIndex: '999!important',
        [theme.breakpoints.up('sm')]: {
            zIndex: '1!important',
        },
        '& .MuiDrawer-paper': {
            [theme.breakpoints.only('xs')]: {
                width: '80%',
            },
        },
    },
    drawerContent: {
        display: 'flex',
        flex: 1,
        padding: `calc(${UI_SIZES.HEADER_HEIGHT}px + 10px) 0 0`,
        [theme.breakpoints.up('sm')]: {
            width: '474px',
            padding: `calc(${UI_SIZES.HEADER_HEIGHT}px + ${UI_SIZES.STEPPER_HEIGHT}px + 10px) 0 calc(${UI_SIZES.FOOTER_HEIGHT}px + ${UI_SIZES.BOTTOM_ACTIONS_HEIGHT}px)`,
        },
        '&:focus': {
            outline: 'none',
        },
    },
}))

const DrawerLayout = ({ children, isOpen, onClose }) => {
    const classes = useStyles()

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
            elevation={3}
            className={classes.drawer}
            open={isOpen}
            onClose={onClose}
            anchor='right'
            BackdropProps={{ invisible: true }}>
            <div className={classes.drawerContent}>{children}</div>
        </Drawer>
    )
}

DrawerLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
}

export default DrawerLayout
