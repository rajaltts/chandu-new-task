import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Stepper, Step, StepLabel, Link, makeStyles, Typography } from '@material-ui/core'
import { RulesContext } from '@carrier/ngecat-reactcomponents'

import {
    scrollTo,
    errorStatus,
    getVariableDomains,
    UI_SIZES,
    STEP_LINK_LABEL,
} from '@carrier/workflowui-globalfunctions'

const useStyles = makeStyles((theme) => ({
    stepper: {
        alignItems: 'flex-start',
        backgroundColor: 'transparent!important',
        padding: 0,
        margin: '-12px 0 0',

        '& .MuiStepConnector-vertical': {
            padding: theme.spacing(1, 0),
            marginLeft: theme.spacing(1),
        },
    },
    button: {
        '& svg.MuiStepIcon-active circle': {
            backgroundColor: theme.palette.primary.main,
        },
    },
    step: {
        '& .MuiStepLabel-iconContainer': {
            display: 'none',
        },
    },
    stepLink: {
        '& svg': {
            width: 16,
            height: '100%',
            transition: 'all .2s',
        },

        '&.is-active': {
            '& svg': {
                transform: 'scale(1.2)',
            },

            '& svg path, svg circle': {
                fill: theme.palette.secondary.main,
            },

            '& .MuiTypography-root': {
                color: theme.palette.secondary.main,
                fontWeight: '600',
            },

            '&.has-errors': {
                '& svg path, svg circle': {
                    fill: theme.palette.warning.main,
                },

                '& .MuiTypography-root': {
                    color: '#FF2A2A !important',
                },
            },
        },

        '&.has-errors': {
            '& svg path, svg circle': {
                fill: theme.palette.warning.main,
            },

            '& .MuiTypography-root': {
                color: theme.palette.warning.main,
            },

            '&.is-active': {
                '& .MuiStepLabel-label': {
                    color: '#FF2A2A !important',
                },
            },
        },
    },
    stepLabel: {
        '& .MuiStepLabel-iconContainer': {
            paddingRight: theme.spacing(2),
        },
        '& .MuiTypography-root': {
            display: 'flex',
            fontSize: 15,
            color: theme.palette.text.primary,
            textAlign: 'left',
        },
        '& svg': {
            marginRight: theme.spacing(2),
        },
    },
}))

const ScrollStepper = ({ steps, active, handlerClick }) => {
    const classes = useStyles()
    const { configurationData, properties, relaxed, step: currentStep } = useContext(RulesContext)

    useEffect(() => {
        const handleScroll = () => {
            for (const item of steps) {
                const elem = document.getElementById(item.anchor)
                if (elem) {
                    const position = elem.getBoundingClientRect()
                    if (position.bottom >= UI_SIZES.SCROLL_BOTTOM_POSITION) {
                        setActiveElement(item.anchor)
                        break
                    }
                }
            }
        }

        handleScroll()
        document.addEventListener('scroll', handleScroll, { passive: true })
        return () => document.removeEventListener('scroll', handleScroll)
    }, [])

    const setActiveElement = (elementId) => {
        const stepLink = document.querySelector(`.js-step-link[href='#${elementId}']`)
        if (stepLink) {
            document.querySelectorAll('.js-step-link').forEach((link) => {
                link.classList.remove('is-active')
            })
            stepLink.classList.add('is-active')
        }
    }

    const handleLinkClick = (e) => {
        e.preventDefault()
        const clickedAnchor = e.target.closest('.js-step-link').getAttribute('data-anchor')
        scrollTo(`#${clickedAnchor}`, UI_SIZES.SCROLLOFFSET)
        if (clickedAnchor) {
            setActiveElement(clickedAnchor)
        }
    }

    return (
        <Stepper className={classes.stepper} nonLinear activeStep={active} orientation='vertical'>
            {steps
                .filter(({ anchor }) => !!document.getElementById(anchor))
                .map(({ label, icon: Icon, anchor, errorTagName, validErrorTagName }, index) => {
                    const isStepErrored = errorStatus(
                        getVariableDomains(currentStep, configurationData, properties, relaxed),
                        errorTagName,
                        validErrorTagName
                    )
                    return (
                        <Step
                            id={`${anchor}${STEP_LINK_LABEL}`}
                            key={label}
                            className={classes.step}
                            onClick={() => handlerClick(index)}>
                            <StepLabel className={classes.stepLabel}>
                                <Link
                                    className={`js-step-link ${classes.stepLink} ${isStepErrored ? 'has-errors' : ''}`}
                                    href={`#${anchor}`}
                                    data-anchor={anchor}
                                    onClick={(e) => handleLinkClick(e)}>
                                    <Icon />
                                    <Typography data-label={`${anchor}__${label}`}>{label}</Typography>
                                </Link>
                            </StepLabel>
                        </Step>
                    )
                })}
        </Stepper>
    )
}

ScrollStepper.propTypes = {
    steps: PropTypes.array.isRequired,
    active: PropTypes.number,
    handlerClick: PropTypes.func,
}

export default ScrollStepper
