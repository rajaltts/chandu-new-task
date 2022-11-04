// React
import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

//Redux
import { connect } from 'react-redux'

// Material
import { Grid, makeStyles } from '@material-ui/core'

//Translations
import { injectIntl } from 'react-intl'

import ImageContent from '../ImageContent/ImageContent'
import RadioGroup from '../RadioGroup/RadioGroup'
import InputRange from '../InputRange/InputRange'
import Discrete from '../ControlTypes/Discrete'
import RangeWithUnit from '../ControlTypes/RangeWithUnit'

const useStyles = makeStyles(() => ({
    controlsColumnwise: {
        display: 'flex',
        flexDirection: 'column',
    },
}))

const CustomComponent_ERV = ({
    visible = true,
    blobStorage,
    step4,
    SECTION_NAMES,
    configurationData,
    rulesLoading,
    onNewAssignment,
    onChangeflagSelectionRulesDirty,
}) => {
    const customComponentContainerRef = useRef(null)

    const { DC_fReturnAir, DC_fRecirculatingAir } = step4[SECTION_NAMES.OPTIONS_CUSTOM]
    const { QC_sERVWheel_Image, QC_sWheelERVType } = step4[SECTION_NAMES.QUOTE_CONTROLS]

    const classes = useStyles()

    useEffect(() => {
        if (customComponentContainerRef) {
            customComponentContainerRef.current.parentNode.className = 'MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12'
        }
    }, [])

    if (!visible) {
        return <></>
    }
    return (
        <Grid
            ref={customComponentContainerRef}
            container
            direction='row'
            justifyContent='space-evenly'
            alignItems='center'
            spacing={3}>
            <Grid item xs>
                <Discrete
                    name={QC_sERVWheel_Image.propName}
                    isConfiguration
                    rulesJson={configurationData}
                    rulesLoading={rulesLoading}
                    onNewAssignment={onNewAssignment}>
                    <ImageContent url={`${blobStorage}ecatui/ecatimages/`} />
                </Discrete>
            </Grid>
            <Grid container xs className={classes.controlsColumnwise}>
                <Grid item xs>
                    <Discrete
                        name={QC_sWheelERVType.propName}
                        isConfiguration
                        rulesJson={configurationData}
                        rulesLoading={rulesLoading}
                        onNewAssignment={onNewAssignment}
                        onChange={onChangeflagSelectionRulesDirty}>
                        <RadioGroup row />
                    </Discrete>
                </Grid>
                <Grid container xs>
                    <Grid item xs>
                        <RangeWithUnit
                            name={DC_fReturnAir.propName}
                            isConfiguration
                            rulesJson={configurationData}
                            rulesLoading={rulesLoading}
                            onNewAssignment={onNewAssignment}>
                            <InputRange />
                        </RangeWithUnit>
                    </Grid>
                    <Grid item xs>
                        <RangeWithUnit
                            name={DC_fRecirculatingAir.propName}
                            isConfiguration
                            rulesJson={configurationData}
                            rulesLoading={rulesLoading}
                            onNewAssignment={onNewAssignment}>
                            <InputRange />
                        </RangeWithUnit>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

CustomComponent_ERV.defaultProps = {
    color: 'primary',
    enabled: false,
    relaxed: false,
}

CustomComponent_ERV.propTypes = {
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

export default injectIntl(connect(mapStateToProps, null)(CustomComponent_ERV))
