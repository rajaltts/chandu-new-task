import React from 'react'
import { Icon, Box, Tooltip } from '@material-ui/core'
import WarningIcon from '@material-ui/icons/Warning'
import MediaCard from '../MediaCard/MediaCard'
import Typography from '../Typography/Typography'
import { useStyles } from './RadioCard.styles'

const RadioCard = ({ label, onClick, selected, loading, feasible, relaxed, tooltipTitleUnfeasible, mediaCardProps, typographyProps }) => {
    const classes = useStyles()
    debugger

    return (
        <Box className={classes.root}>
            {!feasible && selected && (
                <Tooltip
                    data-simplecard-tooltip
                    title={tooltipTitleUnfeasible}>
                    <Icon className={classes.warningIcon}>
                        <WarningIcon />
                    </Icon>
                </Tooltip>
            )}
            <MediaCard
                selected={selected}
                disabled={loading || !feasible}
                error={relaxed}
                onClick={onClick}
                {...mediaCardProps}>
                <Typography bold variant='body1' align='center' {...typographyProps}>
                    {label}
                </Typography>
            </MediaCard>
        </Box>
    )
}

export default RadioCard
