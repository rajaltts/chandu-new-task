// React
import React, { useState, useEffect } from 'react'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router'

// Material UI
import { Grid, styled, useMediaQuery, useTheme } from '@material-ui/core'

// Components
import Loading from '../../Loading/Loading'
import LoadingIcon from '../../LoadingIcon/LoadingIcon'
import TabContent from '../TabContent'

const Options = (props) => {
    const theme = useTheme()
    const [step, setStep] = useState(0)
    const {
        intl,
        cartDrawerOpen,
        rulesLoading,
        configurationData,
        loadConfigurationRules,
        sectionNames,
        getTab4Steps,
    } = props
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

    const LoadingGrid = styled(Grid)(() => ({
        '&': {
            position: 'fixed',
            width: '100%',
            height: '100vh',
            left: '0px',
            background: 'rgba(0,0,0,0.25)',
            top: '0px',
            zIndex: '999',
        },
        '& div': {
            width: '100px',
            position: 'fixed',
            top: '50%',
            left: '48%',
            zIndex: '1000',
        },
    }))

    useEffect(() => {
        //When the component loads, load the configuration data
        loadConfigurationRules()
    }, [])

    const handleStepChange = (index) => {
        setStep(index)
    }

    if (rulesLoading && !Object.keys(configurationData).length) {
        return (
            <Grid item xs={12} lg={cartDrawerOpen && isMdUp ? 8 : 12}>
                <Loading />
            </Grid>
        )
    }

    return (
        <>
            {rulesLoading && (
                <LoadingGrid item xs={12} lg={cartDrawerOpen && isMdUp ? 8 : 12}>
                    <LoadingIcon width={100} />
                </LoadingGrid>
            )}
            <TabContent
                steps={getTab4Steps(intl, sectionNames)}
                step={step}
                context={props}
                showLayoutDivider={true}
                handlerClick={handleStepChange}
            />
        </>
    )
}

export default injectIntl(withRouter(Options))
