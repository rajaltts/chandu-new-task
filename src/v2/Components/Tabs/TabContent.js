// React
import React from 'react'

// Material
import { Grid, Hidden, useMediaQuery, useTheme } from '@material-ui/core'

// Layout
import LayoutDivider from '../LayoutDivider'
import StickyAside from '../StickyAside'
import ScrollStepper from '../layout/ScrollStepper'

const TabContent = ({
    steps,
    step,
    context,
    gridProps = {},
    additionalProps = {},
    handlerClick = () => {},
    showLayoutDivider = false,
}) => {
    const theme = useTheme()
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
    const { cartDrawerOpen, showCartAsModal, configurationData, properties, relaxed, step: currentStep } = context
    const lgSize = cartDrawerOpen && isMdUp && !showCartAsModal ? 6 : 10

    return (
        <>
            <Hidden mdDown>
                <Grid item lg={2}>
                    <StickyAside>
                        <ScrollStepper
                            steps={steps}
                            active={step}
                            handlerClick={handlerClick}
                            configurationData={configurationData}
                            properties={properties}
                            relaxed={relaxed}
                            currentStep={currentStep}
                        />
                    </StickyAside>
                </Grid>
            </Hidden>
            <Grid item xs={12} lg={lgSize} {...gridProps}>
                {steps.map((step) => {
                    return (
                        <>
                            {React.cloneElement(step.component, {
                                ...context,
                                ...additionalProps,
                                stepsContent: steps,
                                stepInfo: step,
                            })}
                            {showLayoutDivider && <LayoutDivider />}
                        </>
                    )
                })}
            </Grid>
        </>
    )
}

export default TabContent
