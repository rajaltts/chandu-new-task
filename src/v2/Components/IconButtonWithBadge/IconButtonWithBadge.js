import React from 'react'
import PropTypes from 'prop-types'
import { IconButton, Badge } from '@material-ui/core'
import useStyles from './IconButtonWithBadge.styles'

const IconButtonWithBadge = ({ className, onClick, color, badgeContent, badgeColor, icon }) => {
    const classes = useStyles()

    return (
        <IconButton className={`${classes.iconButtonWithBadge} ${className}`} color={color} onClick={onClick}>
            <Badge badgeContent={badgeContent} color={badgeColor}>
                {icon}
            </Badge>
        </IconButton>
    )
}

IconButtonWithBadge.defaultProps = {
    color: 'default',
    badgeColor: 'secondary',
}

IconButtonWithBadge.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
    onClick: PropTypes.func,
    badgeContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    badgeColor: PropTypes.oneOf(['default', 'error', 'primary', 'secondary']),
    icon: PropTypes.any,
}

export default IconButtonWithBadge
