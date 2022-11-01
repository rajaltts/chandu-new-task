import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Box, Hidden, Menu, MenuItem, makeStyles, useTheme, useMediaQuery } from '@material-ui/core'
import { LayoutButton } from './LayoutButton/LayoutButton'
import { RulesContext } from '../../Components/context'
import globalStyles from './styles/globalStyles'
import {
    injectIntlTranslation,
    isEmptyObject,
    getTagIdFromUrl,
    errorStatus,
    getVariableDomains,
    UI_SIZES,
    getAnyOptionAllowedProperty,
} from '@carrier/workflowui-globalfunctions'
import { ArrowDropDown, ArrowLeft, ArrowRight, Save } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    endIconWrapper: {
        margin: '8px !important',
        borderLeft: '1px solid black !important',
    },
    actionsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'fixed',
        bottom: UI_SIZES.FOOTER_HEIGHT,
        padding: `0 ${theme.spacing(3)}px`,
        alignItems: 'center',
        background: 'white',
        height: `60px`,
        [theme.breakpoints.down('xs')]: {
            borderTop: `1px solid ${theme.palette.grey[350]}`,
        },
        [theme.breakpoints.up('sm')]: {
            background: 'transparent',
            height: `${theme.spacing(10)}px`,
        },
        pointerEvents: 'none',
    },
    mobileBottomActionBtn: {
        [theme.breakpoints.down('xs')]: {
            '&.MuiButtonBase-root': {
                background: 'transparent',
                border: 0,
                boxShadow: 'none',
                padding: 0,
                minWidth: 'auto',

                '&:hover': {
                    background: 'transparent',

                    '& .MuiButton-startIcon': {
                        '& .MuiSvgIcon-root': {
                            fill: theme.palette.text.primary,
                        },
                    },
                },

                '& .MuiButton-label': {
                    display: 'flex',
                    flexDirection: 'column',
                    color: theme.palette.text.primary,
                },

                '& .MuiButton-startIcon': {
                    margin: '0 auto 2px',
                    height: 20,

                    '& .MuiSvgIcon-root': {
                        fill: theme.palette.grey[450],
                    },
                },
            },
        },
    },
    rightBtnsWrapper: {
        width: '100%',
    },
    backBtn: {
        marginRight: 'auto !important',
        [theme.breakpoints.down('xs')]: {
            width: '33.33%',
            '&.MuiButtonBase-root': {
                '& .MuiButton-startIcon': {
                    fontSize: 28,
                },
            },
        },
        pointerEvents: 'auto',
    },
    saveBtnWrapper: {
        [theme.breakpoints.down('xs')]: {
            position: 'relative',
            width: '33.33%',
            textAlign: 'center',

            '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                bottom: 0,
                width: 1,
                height: 34,
                marginTop: '-16px',
                background: `${theme.palette.grey.main}80`,
            },

            '&::before': {
                left: 0,
            },

            '&::after': {
                right: 0,
            },
        },
    },
    saveBtn: {
        paddingRight: '0px !important',
        [theme.breakpoints.down('xs')]: {
            '&.MuiButtonBase-root': {
                '& .MuiButton-startIcon': {
                    '& .MuiSvgIcon-root': {
                        fill: theme.palette.text.primary,
                    },
                },
            },
        },
        pointerEvents: 'auto',
    },
    nextBtn: {
        [theme.breakpoints.down('xs')]: {
            width: '33.33%',
            '&.MuiButtonBase-root': {
                '& .MuiButton-startIcon': {
                    fontSize: 28,
                },
            },
        },
        pointerEvents: 'auto',
    },
}))

const BottomActions = ({
    displaySaveTagModal,
    displaySaveTemplateModal,
    steps,
    activeStep,
    changeStep,
    intl,
    step1,
    step2,
}) => {
    const {
        properties,
        relaxed,
        rulesLoading,
        allowStepChange,
        selectedCandidate,
        SelectionInputData,
        reportsErrored,
        performanceLoading,
        configurationData,
        setPerfLoading,
        loadConfigurationRules,
        setGeneratingReports,
    } = useContext(RulesContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const globalClasses = globalStyles()
    const classes = useStyles()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
    const stepsNb = steps.length - 1
    const [anyOptionAllowedProperty] = useState(getAnyOptionAllowedProperty([step1, step2]))

    // Queries variable domains to determine if we have error state in selection
    const isSelectionErrored = () => {
        return (
            errorStatus(
                getVariableDomains(0, configurationData, properties, relaxed),
                steps[0].errorTagName,
                steps[0].validErrorTagName
            ) ||
            errorStatus(
                getVariableDomains(1, configurationData, properties, relaxed),
                steps[1].errorTagName,
                steps[1].validErrorTagName
            )
        )
    }

    // Queries variable domains to determine if we have error state in unit configuration
    const isConfigurationErrored = () => {
        return (
            errorStatus(
                getVariableDomains(3, configurationData, properties, relaxed),
                steps[3].errorTagName,
                steps[3].validErrorTagName
            ) ||
            errorStatus(
                getVariableDomains(4, configurationData, properties, relaxed),
                steps[4].errorTagName,
                steps[4].validErrorTagName
            )
        )
    }

    // Determines whether or not we restrict the user from being able to click Next button
    const getNextDisabled = () => {
        // Cannot move onto Candidate calculation if error in selection
        if (activeStep === 1) return isSelectionErrored()
        // Cannot move onto configuration without a specific option selected
        // from either step 3 or a combo of steps 1/2
        if (activeStep === 2) {
            const anyOptionSelected =
                !!anyOptionAllowedProperty.length &&
                anyOptionAllowedProperty.some((element) =>
                    SelectionInputData.find((item) => item.Name === element && item.Value.toLowerCase() === 'any')
                )
            const isCandidateNotSelected = isEmptyObject(selectedCandidate.selectedCandidate)

            if (
                (isCandidateNotSelected &&
                    selectedCandidate.selectedModel &&
                    selectedCandidate.selectedModel === 'ANY') ||
                (isCandidateNotSelected && anyOptionSelected)
            ) {
                return true
            }
        }
        // Cannot calc faulty reports if we have error state somewhere
        if (activeStep === 3) {
            return getReportsDisabled()
        }
        return false
    }

    // If we have error state in selection or configuration, the user
    // should not be able to generate a report - disables Calculate Report button
    const getReportsDisabled = () => {
        return isSelectionErrored() || isConfigurationErrored()
    }

    const handleClick = (event) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }

    const handleSaveClick = (event) => {
        event.stopPropagation()
        if (getTagIdFromUrl()) {
            displaySaveTagModalAction()
        } else {
            setAnchorEl(event.currentTarget)
        }
    }

    const displaySaveTagModalAction = () => {
        closeMenu()
        displaySaveTagModal(true)
    }

    const displaySaveTemplateModalAction = () => {
        closeMenu()
        displaySaveTemplateModal(true)
    }

    const closeMenu = () => {
        setAnchorEl(null)
    }

    const goToPreviousStep = () => {
        if (activeStep > 0) {
            changeStep(activeStep - 1)
        }
    }

    const goToNextStep = () => {
        if (activeStep < stepsNb) {
            changeStep(activeStep + 1)
        }
    }

    const clickGenerateReports = () => {
        loadConfigurationRules()
        setGeneratingReports(true)
        setPerfLoading(true)
    }

    return (
        <footer className={classes.actionsWrapper}>
            <Box className={classes.rightBtnsWrapper} display='flex'>
                <LayoutButton
                    className={`${classes.backBtn} ${classes.mobileBottomActionBtn}`}
                    variant='outlined'
                    startIcon={
                        <Hidden smUp>
                            <ArrowLeft />
                        </Hidden>
                    }
                    id='Back'
                    onClick={goToPreviousStep}>
                    {intl.formatMessage({
                        id: 'Back',
                    })}
                </LayoutButton>
                <Box className={classes.saveBtnWrapper} mr={isMobile ? 0 : 3}>
                    <LayoutButton
                        className={`${classes.saveBtn} ${classes.mobileBottomActionBtn}`}
                        variant='outlined'
                        startIcon={<Save />}
                        endIcon={<ArrowDropDown className={classes.endIconWrapper} onClick={handleClick} />}
                        id='Save'
                        disabled={rulesLoading}
                        onClick={handleSaveClick}>
                        {intl.formatMessage({
                            id: 'Save',
                        })}
                    </LayoutButton>
                    <Menu
                        id='save-menu'
                        className={`${globalClasses.menu}`}
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={closeMenu}>
                        {!getTagIdFromUrl() && (
                            <MenuItem onClick={displaySaveTagModalAction}>
                                {injectIntlTranslation(intl, 'SAVE_NEW_TAG')}
                            </MenuItem>
                        )}
                        <MenuItem onClick={displaySaveTemplateModalAction}>
                            {injectIntlTranslation(intl, 'SAVE_NEW_TEMPLATE')}
                        </MenuItem>
                    </Menu>
                </Box>
                {activeStep !== stepsNb ? (
                    <LayoutButton
                        className={`${classes.nextBtn} ${classes.mobileBottomActionBtn}`}
                        startIcon={
                            <Hidden smUp>
                                <ArrowRight />
                            </Hidden>
                        }
                        disabled={getNextDisabled() || rulesLoading || !allowStepChange}
                        id='Next'
                        onClick={goToNextStep}>
                        {intl.formatMessage({
                            id: 'Next',
                        })}
                    </LayoutButton>
                ) : (
                    <LayoutButton
                        className={`${classes.nextBtn} ${classes.mobileBottomActionBtn}`}
                        startIcon={
                            <Hidden smUp>
                                <ArrowRight />
                            </Hidden>
                        }
                        disabled={getReportsDisabled() || rulesLoading || performanceLoading || reportsErrored}
                        id='CALCULATE_REPORT'
                        onClick={() => clickGenerateReports()}>
                        {intl.formatMessage({
                            id: 'CALCULATE_REPORT',
                        })}
                    </LayoutButton>
                )}
            </Box>
        </footer>
    )
}

BottomActions.propTypes = {
    displaySaveModal: PropTypes.func,
    steps: PropTypes.array,
    activeStep: PropTypes.number,
    changeStep: PropTypes.func,
}

export default injectIntl(BottomActions)
