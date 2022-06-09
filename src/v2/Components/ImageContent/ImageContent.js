// React
import React from 'react'
import PropTypes from 'prop-types'

//Redux
import { connect } from 'react-redux'

// Material
import { Paper, Tooltip } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import { injectIntlTranslation } from '@carrier/workflowui-globalfunctions'
import { translation } from '@carrier/ngecat-reactcomponents'

// Styles
import useStyles from './ImageContent.styles.js'

const ImageContent = ({
    className,
    value,
    handleChange,
    label,
    color,
    enabled,
    relaxed,
    name,
    visible = true,
    intl,
    id,
    blobStorage,
}) => {
    const classes = useStyles()
    const Label = () => {
        return (
            <>
                {relaxed ? (
                    <Tooltip
                        data-WarningText={`${name}__CONTROL_SELECTION_WARNING`}
                        title={injectIntlTranslation(intl, 'CONTROL_SELECTION_WARNING')}>
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
            id={label}
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
                <img src={`${blobStorage}ecatui/ecatimages/${value}`} alt={label} />
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
const mapStateToProps = (state) => ({
    blobStorage: state.api.blobStorage,
})

export default injectIntl(connect(mapStateToProps, null)(ImageContent))
