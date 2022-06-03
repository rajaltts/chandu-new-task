import React from 'react'
import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab'
import Badge from '@material-ui/core/Badge'
import useStyles from './FabWithBadge.styles'

const FabWithBadge = ({ className, onClick, color, badgeContent, badgeColor, icon }) => {
    const classes = useStyles()

    return (
        <Fab color={color} className={`${classes.fabWithBadge} ${className}`} onClick={onClick}>
            <Badge badgeContent={badgeContent} color={badgeColor}>
                {icon}
            </Badge>
        </Fab>
    )
}

FabWithBadge.defaultProps = {
    color: 'secondary',
    badgeColor: 'primary',
}

FabWithBadge.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
    badgeContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    badgeColor: PropTypes.oneOf(['default', 'error', 'primary', 'secondary']),
    icon: PropTypes.any,
}

export default FabWithBadge
