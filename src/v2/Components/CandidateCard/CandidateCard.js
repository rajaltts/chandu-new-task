// React
import React from 'react'

// Material
import { IconButton } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'

// Local
import Typography from '../Typography/Typography'
import MediaCard from '../MediaCard/MediaCard'

// Styles
import { useCandidateCardStyles } from './CandidateCard.styles'

const CandidateCard = ({ details, index, openPopupCallback, ...mediaCardProps }) => {
    const classes = useCandidateCardStyles()

    const handleVisibilityButtonClick = (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (openPopupCallback) openPopupCallback(index)
    }

    return (
        <MediaCard
            elevation={0}
            direction='column'
            imgProps={{ height: 140 }}
            contentProps={{ className: classes.content }}
            color='secondary'
            {...mediaCardProps}>
            <>
                <IconButton className={classes.visibilityButton} onClick={handleVisibilityButtonClick}>
                    <VisibilityIcon />
                </IconButton>
                <table className={classes.table}>
                    {details.map(({ label, value, unit, typographyValueProps, typographyLabelProps }) => (
                        <tr key={label}>
                            <td>
                                <Typography variant='body2' {...typographyLabelProps}>
                                    {label}
                                </Typography>
                            </td>
                            <td className={classes.rightAlign}>
                                <Typography variant='body2' {...typographyValueProps}>
                                    {value} {unit}
                                </Typography>
                            </td>
                        </tr>
                    ))}
                </table>
            </>
        </MediaCard>
    )
}

export default CandidateCard
