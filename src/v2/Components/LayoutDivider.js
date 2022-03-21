import React from 'react'
import { Divider, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    divider: {
        margin: `${theme.spacing(3)}px 0 20px`,
        [theme.breakpoints.up('sm')]: {
            margin: theme.spacing(4, 0),
        },
        [theme.breakpoints.up('md')]: {
            margin: theme.spacing(5, 0),
        },
    },
}))

const LayoutDivider = () => {
    const classes = useStyles()

    return <Divider className={classes.divider} />
}

export default LayoutDivider
