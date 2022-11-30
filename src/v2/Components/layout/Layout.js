// React
import React, { useState } from 'react'
import { injectIntl } from 'react-intl'

// Material
import { makeStyles, Hidden, Grid } from '@material-ui/core'

import StickyAside from '../StickyAside'
import CardLayout from '../CardLayout'
import VerticalIcons from '../VerticalIcons'
import BottomActions from '../BottomActions'
import DrawerLayout from '../Drawers/DrawerLayout'
import globalStyles from '../styles/globalStyles'
import ReportsList from '../ReportList/ReportsList'

const useStyles = makeStyles(() => ({
    '.MuiBreadcrumbs-root': {
        margin: '14px 0 14px 40px',
    },
}))

const Layout = ({
    children,
    activeStep,
    stepHandler,
    steps,
    isUnderSm,
    cartDrawerOpen,
    showCartAsModal,
    Stepper,
    Cart,
    setCartDrawerOpen,
    cartData,
    reports,
    setSaveTagModalOpen,
    setSaveTemplateModalOpen,
    step1,
    step2,
    cartConfig,
}) => {
    const classes = useStyles()
    const globalClasses = globalStyles()
    const [reportDrawerOpen, setReportDrawerOpen] = useState(false)

    return (
        <div id='js-app-wrapper' className={`workflow ${classes.appWrapper}`}>
            <Stepper steps={steps} active={activeStep} handlerClick={stepHandler} />
            <main id='js-main-app-inner' className={globalClasses.appContainer}>
                <Grid container spacing={isUnderSm ? 0 : 3}>
                    {children}
                    {cartDrawerOpen && !showCartAsModal && (
                        <Hidden mdDown>
                            <Grid item lg={4}>
                                <StickyAside>
                                    <CardLayout>
                                        <Cart showBottomSpacer={false} closeCart={() => setCartDrawerOpen(false)} />
                                    </CardLayout>
                                </StickyAside>
                            </Grid>
                        </Hidden>
                    )}
                </Grid>
                <VerticalIcons
                    setCartDrawerOpen={setCartDrawerOpen}
                    setReportDrawerOpen={setReportDrawerOpen}
                    cart={cartData}
                    reports={reports}
                    cartDrawerOpen={cartDrawerOpen}
                />
            </main>
            <BottomActions
                displaySaveTagModal={setSaveTagModalOpen}
                displaySaveTemplateModal={setSaveTemplateModalOpen}
                steps={steps}
                activeStep={activeStep}
                changeStep={stepHandler}
                setReportDrawerOpen={setReportDrawerOpen}
                step1={step1}
                step2={step2}
            />
            <Hidden mdUp={showCartAsModal ? false : true}>
                <DrawerLayout isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)}>
                    <Cart cartConfig={cartConfig} closeCart={() => setCartDrawerOpen(false)} />
                </DrawerLayout>
            </Hidden>
            <DrawerLayout isOpen={reportDrawerOpen} onClose={() => setReportDrawerOpen(false)}>
                <ReportsList closeReportDrawer={() => setReportDrawerOpen(false)} />
            </DrawerLayout>
        </div>
    )
}

export default injectIntl(Layout)
