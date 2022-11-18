import React from 'react'
import { makeStyles } from '@material-ui/core'
import Typography from '../Typography/Typography'

const useStyles = makeStyles((theme) => ({
    selectionName: {
        ...theme.common.displayFlexRow,
        background: theme.palette.background.white,
        height: theme.rem[80],
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    selectedModelText: {
        ...theme.typography.subtitleBold,
        ...theme.typography.subtitleBold2,
        color: theme.palette.grey[750],
        width: theme.rem[150],
    },
    selectionNameSpan: {
        height: 'inherit',
        width: theme.rem[9],
        backgroundColor: theme.palette.secondary.main,
    },
    selectedModelContainer: {
        ...theme.common.displayFlexColumn,
        height: 'inherit',
        justifyContent: theme.alignPosition.center,
        marginLeft: theme.rem[11],
    },
    selectedModelValue: {
        ...theme.typography.text,
        ...theme.typography.fontFamily,
    },
}))

export const SelectedModel = ({ title, value, className, ...rest }) => {
    const classes = useStyles()

    return (
        <div id='selection-name' className={`${classes.selectionName} ${className}`} {...rest}>
            <span className={classes.selectionNameSpan} />
            <div className={classes.selectedModelContainer}>
                <Typography className={classes.selectedModelText} variant='body2'>
                    {title}
                </Typography>
                <span className={classes.selectedModelValue}>{value}</span>
            </div>
        </div>
    )
}
