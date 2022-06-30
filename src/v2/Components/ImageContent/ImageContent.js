// React
import React from 'react'
import PropTypes from 'prop-types'

// Material
import { Box, Card, CardContent, Grid, Paper, Tooltip, Typography } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import { translation } from '@carrier/ngecat-reactcomponents'

// Styles
import useStyles from './ImageContent.styles.js'
import clsx from 'clsx'

const ImageContent = ({ className, value, label, disabled, name, visible = true, id, url, relaxed }) => {
    const classes = useStyles()
    const Label = () => {
        return (
            <>
                {relaxed ? (
                    <Tooltip
                        data-WarningText={`${name}__CONTROL_SELECTION_WARNING`}
                        title={translation('CONTROL_SELECTION_WARNING')}>
                        <span>{translation(label)}</span>
                    </Tooltip>
                ) : (
                    label
                )}
            </>
        )
    }

    if (!visible) {
        return <></>
    }
    return (
        <Box>
            <Grid item xs>
                <Card
                    elevation={0}
                    id={id || label}
                    classes={{
                        label: classes.label,
                    }}
                    className={`${className || ''} ${relaxed ? classes.relaxed : ''}`}
                    aria-label={label}
                    disabled={disabled}>
                    <CardContent>
                        <Typography className={classes.title} color='textSecondary' gutterBottom>
                            <Label data-Label={`${name}__${label}`} />
                        </Typography>
                        <Paper
                            elevation={0}
                            className={clsx({
                                [classes.pictureTagDisabled]: disabled,
                                [classes.pictureTagEnabled]: !disabled,
                            })}>
                            {/* Picture tag accepts different of src image formats. 
                            To improve image load performance we can use new next gen image formats. 
                            Example given as below */}
                            <picture>
                                {/* <source srcSet={ERV_WheelType_AVIF} type='image/avif' /> */}
                                {/* <source srcSet={ERV_WheelType_WEBP} type='image/webp' /> */}
                                <img src={`${url}${value}`} alt={`${name} Reference`} style={{width: "100%"}} />
                            </picture>
                        </Paper>
                    </CardContent>
                </Card>
            </Grid>
        </Box>
    )
}

ImageContent.defaultProps = {
    color: 'secondary',
    disabled: false,
    relaxed: false,
}

ImageContent.propTypes = {
    value: PropTypes.bool,
    label: PropTypes.string,
    color: PropTypes.oneOf(['default', 'primary', 'secondary']),
    disabled: PropTypes.bool,
    handleChange: PropTypes.func,
    relaxed: PropTypes.bool,
    className: PropTypes.string,
}

export default injectIntl(ImageContent)
