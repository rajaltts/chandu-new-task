import React from 'react'
import PropTypes from 'prop-types'
import { Fab, Badge } from '@material-ui/core'
import useStyles from './FabWithBadge.styles'

const FabWithBadge = ({ className, onClick, color, badgeContent, badgeColor, icon, disabled }) => {
    const classes = useStyles()

    return (
        <Fab color={color} className={`${classes.fabWithBadge} ${className}`} disabled={disabled} onClick={onClick}>
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
    disabled: PropTypes.bool,
    icon: PropTypes.any,
}

export default FabWithBadge
