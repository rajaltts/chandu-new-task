import React from 'react'
import { injectIntl } from 'react-intl'

// Material
import { Grid, Hidden, Stepper, Step, StepButton, StepLabel, makeStyles } from '@material-ui/core'

import {
    errorStatus,
    getSelectedModel,
    getVariableDomains,
    injectIntlTranslation,
    UI_SIZES,
} from '@carrier/workflowui-globalfunctions'
import { SelectedModel } from '../SelectedModel/SelectedModel'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import globalStyles from '../styles/globalStyles'

const useStyles = makeStyles((theme) => ({
    stickyStepperContainer: {
        top: `${UI_SIZES.HEADER_HEIGHT}px`,
        position: 'sticky',
        left: 0,
        right: 0,
        zIndex: 100,
        background: theme.palette.background.white,
    },
    stepperWrapper: {
        display: 'flex',
        alignItems: 'center',
        background: theme.palette.background.white,
        height: `${UI_SIZES.STEPPER_HEIGHT}px`,
        borderBottom: `1px solid ${theme.palette.grey[350]}`,
    },
    stepper: {
        justifyContent: 'space-between',
        padding: theme.spacing(0),
        '& .MuiStepConnector-root': {
            display: 'none',
        },
    },
    step: {
        '& .MuiStepIcon-root': {
            height: '30px',
            width: '30px',
            borderRadius: '50%',
            fill: 'none',

            '&.MuiStepIcon-active': {
                background: 'linear-gradient(112.39deg, #152C73 0%, #1891F6 74.45%)',
                boxShadow: '0px 11px 12px -10px rgba(4, 105, 221, 0.7)',
                [theme.breakpoints.down('xs')]: {
                    marginRight: theme.spacing(1),
                },

                '& .MuiStepIcon-text': {
                    fill: 'white',
                },

                '& circle': {
                    stroke: 'none',
                },
            },

            '& .MuiStepIcon-text': {
                fill: theme.palette.grey[450],
            },

            '& circle': {
                strokeWidth: '1px',
                stroke: theme.palette.grey[450],
            },
        },
        '& .MuiStepLabel-iconContainer': {
            paddingRight: 0,
            [theme.breakpoints.up('sm')]: {
                paddingRight: theme.spacing(1),
            },
        },
        '& .MuiStepLabel-label': {
            display: 'none',
            textAlign: 'left',
            color: theme.palette.grey[450],
            [theme.breakpoints.up('sm')]: {
                display: 'flex',
            },
            '&.MuiStepLabel-active': {
                color: theme.palette.secondary.main,
                fontWeight: '600',
                [theme.breakpoints.down('xs')]: {
                    display: 'flex',
                },
            },
        },

        '&.has-errors': {
            '& .MuiStepIcon-root': {
                '&.MuiStepIcon-active': {
                    background: `linear-gradient(112.39deg, ${theme.palette.error.main} 0%, ${theme.palette.error.light} 74.45%)`,
                    boxShadow: `0px 11px 12px -10px ${theme.palette.error.main}b3`,
                },

                '& .MuiStepIcon-text': {
                    fill: theme.palette.error.main,
                },

                '& circle': {
                    stroke: theme.palette.error.main,
                },
            },

            '& .MuiStepLabel-label': {
                color: theme.palette.error.main,

                '&.MuiStepLabel-active': {
                    color: theme.palette.error.main,
                },
            },
        },
        '&.is-complete': {
            '& .MuiStepIcon-root': {
                background: theme.palette.grey.main,

                '& .MuiStepIcon-text': {
                    fill: 'white',
                },

                '& circle': {
                    stroke: 'none',
                },
            },
            '& .MuiStepLabel-label': {
                color: theme.palette.grey.main,
            },
        },
        '&.is-disabled': {
            cursor: 'not-allowed',
        },
    },
    button: {
        margin: `-${theme.spacing(1)}px`,
        padding: `${theme.spacing(1)}px`,
        '& svg.MuiStepIcon-active circle': {
            backgroundColor: theme.palette.primary.main,
        },
    },
}))
const MyStepper = ({
    intl,
    SelectionInputData,
    ConfigurationInputData,
    configurationData,
    selectedModel,
    BU_sModel,
    active,
    steps,
    properties,
    relaxed,
    getStepDisabled,
    rulesLoading,
    allowStepChange,
    maxStepLoaded,
    handlerClick,
}) => {
    const globalClasses = globalStyles()
    const classes = useStyles()
    return (
        <>
            <div id='sticky-limit'></div>
            <div id='sticky-nav' className={classes.stickyStepperContainer}>
                <Grid container spacing={0}>
                    <Hidden smDown>
                        <Grid item lg={2}>
                            <SelectedModel
                                title={injectIntlTranslation(intl, 'SELECTED_MODEL')}
                                value={
                                    getSelectedModel(
                                        SelectionInputData,
                                        ConfigurationInputData,
                                        selectedModel,
                                        BU_sModel
                                    ) || injectIntlTranslation(intl, 'UNSELECTED')
                                }
                            />
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} lg={10}>
                        <div className={classes.stepperWrapper}>
                            <nav className={globalClasses.itemContainer}>
                                <Stepper nonLinear className={classes.stepper} activeStep={active}>
                                    {steps.map((step, index) => {
                                        const { name: label, errorTagName, validErrorTagName } = step
                                        const isStepErrored = errorStatus(
                                            getVariableDomains(index, configurationData, properties, relaxed),
                                            errorTagName,
                                            validErrorTagName
                                        )
                                        let isStepDisabled =
                                            getStepDisabled(index) ||
                                            rulesLoading ||
                                            !allowStepChange ||
                                            index > maxStepLoaded + 1
                                        return (
                                            <Step
                                                id={label}
                                                data-Disabled={`${label}__${isStepDisabled}`}
                                                data-Active={`${label}__${index === active}`}
                                                data-Error={`${label}__${relaxed.length > 0}`}
                                                key={label}
                                                className={`${classes.step} ${isStepErrored ? 'has-errors' : ''} ${
                                                    index < active ? (isStepErrored ? '' : 'is-complete') : ''
                                                } ${isStepDisabled ? 'is-disabled' : ''}`}
                                                active={index === active}
                                                disabled={isStepDisabled}>
                                                <StepButton
                                                    className={classes.button}
                                                    onClick={() => handlerClick(index)}>
                                                    {index === active && rulesLoading ? (
                                                        <StepLabel StepIconComponent={LoadingIcon}>{label}</StepLabel>
                                                    ) : (
                                                        <StepLabel>{label}</StepLabel>
                                                    )}
                                                </StepButton>
                                            </Step>
                                        )
                                    })}
                                </Stepper>
                            </nav>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default injectIntl(MyStepper)
