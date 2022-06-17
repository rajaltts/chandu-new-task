// React
import React from 'react'
import PropTypes from 'prop-types'

// Material
import { Paper, Tooltip } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import { translation } from '@carrier/ngecat-reactcomponents'

// Styles
import useStyles from './ImageContent.styles.js'

const ImageContent = ({ className, value, label, enabled, name, visible = true, id, url, relaxed }) => {
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
        <Paper
            id={id}
            classes={{
                label: classes.label,
            }}
            className={`${className || ''} ${relaxed ? classes.relaxed : ''}`}
            aria-label={label}
            disabled={!enabled}
            label={<Label data-Label={`${name}__${label}`} />}>
            <div
                style={{
                    opacity: !enabled ? '0.15' : '1',
                    pointerEvents: !enabled ? 'none' : 'initial',
                }}>
                <img src={`${url}${value}`} alt={label} />
            </div>
        </Paper>
    )
}

ImageContent.defaultProps = {
    color: 'secondary',
    enabled: false,
    relaxed: false,
}

ImageContent.propTypes = {
    value: PropTypes.bool,
    label: PropTypes.string,
    color: PropTypes.oneOf(['default', 'primary', 'secondary']),
    enabled: PropTypes.bool,
    handleChange: PropTypes.func,
    relaxed: PropTypes.bool,
    className: PropTypes.string,
}

export default injectIntl(ImageContent)
