import { Box, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

import { useStyles } from './Section.style'

import Typography from '../Typography/Typography'

const Section = ({ id, title, visible = true, divider = true, children, typographyProps, dividerProps, ...rest }) => {
    const classes = useStyles()
    if (!visible) return null
    return (
        <Box id={`sectionBox_${id}`} {...rest} classes={{ root: classes.root, ...rest?.classes }}>
            {divider && (
                <Divider
                    id={`sectionDivider_${id}`}
                    {...dividerProps}
                    classes={{ root: classes.divider, ...dividerProps?.classes }}
                />
            )}
            <Typography
                id={`sectionTypo_${id}`}
                paragraph
                variant='h2'
                className={`titleTypo ${classes.typography}`}
                {...typographyProps}>
                {title}
            </Typography>
            {children}
        </Box>
    )
}

Section.defaultProps = {
    visible: true,
    divider: true,
}

Section.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    divider: PropTypes.bool,
    typographyProps: PropTypes.object,
}

export default Section
