import React, { useState, useEffect } from 'react'
import { Grid, Hidden, makeStyles } from '@material-ui/core'
import { UI_SIZES } from './utils/constants'

import { ShoppingBasket, Description } from '@material-ui/icons'
import FabWithBadge from './FabWithBadge/FabWithBadge'
import IconButtonWithBadge from './IconButtonWithBadge/IconButtonWithBadge'

const useStyles = makeStyles((theme) => ({
    rightIconsWrapper: {
        position: 'fixed',
        right: 10,
        top: 'initial',
        bottom: 70,
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'column',
            top: `calc(${UI_SIZES.HEADER_HEIGHT}px + ${UI_SIZES.STEPPER_HEIGHT}px + 10px)`,
            bottom: 0,
        },
        '& .MuiFab-root': {
            '&:not(:last-child)': {
                marginRight: theme.spacing(1),
            },
        },
    },
    rightCol: {
        '&::before': {
            content: '""',
            position: 'absolute',
            width: '1px',
            top: 0,
            bottom: 0,
            background: theme.palette.grey[350],
        },
    },
    basketBtn: {
        display: 'flex',
        margin: '0 auto',
        '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 1,
            width: 40,
            background: theme.palette.grey[350],
            margin: '0 auto',
        },
    },
}))

const VerticalIcons = ({ setCartDrawerOpen, setReportDrawerOpen, cart, reports, cartDrawerOpen }) => {
    const [optionsNb, setOptionsNb] = useState(0)
    const [reportsNb, setReportsNb] = useState(0)
    const classes = useStyles()

    useEffect(() => {
        setOptionsNb(Object.keys(cart).length)
    }, [cart])

    useEffect(() => {
        setReportsNb(Object.keys(reports).length)
    }, [reports])

    return (
        <div className={classes.rightIconsWrapper}>
            <Hidden xsDown>
                <Grid item sm={1} className={`${classes.rightCol}`}>
                    <IconButtonWithBadge
                        className={classes.basketBtn}
                        onClick={() => setCartDrawerOpen(!cartDrawerOpen)}
                        badgeContent={optionsNb}
                        icon={<ShoppingBasket />}
                    />
                </Grid>
            </Hidden>
            <Hidden smUp>
                <FabWithBadge
                    onClick={() => setCartDrawerOpen(!cartDrawerOpen)}
                    badgeContent={optionsNb}
                    icon={<ShoppingBasket />}
                />
            </Hidden>
            <Hidden xsDown>
                <Grid item sm={1} className={`${classes.rightCol}`}>
                    <IconButtonWithBadge
                        className={classes.reportBtn}
                        onClick={() => setReportDrawerOpen(true)}
                        badgeContent={reportsNb}
                        icon={<Description />}
                    />
                </Grid>
            </Hidden>
            <Hidden smUp>
                <FabWithBadge
                    onClick={() => setReportDrawerOpen(true)}
                    badgeContent={reportsNb}
                    icon={<Description />}
                />
            </Hidden>
        </div>
    )
}

export default VerticalIcons
