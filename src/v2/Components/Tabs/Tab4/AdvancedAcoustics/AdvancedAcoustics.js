//React
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'

//Redux
import { connect, useSelector } from 'react-redux'

//Translation
import { injectIntl } from 'react-intl'

//Carrier globalfunctions
import { isEmptyArray, CALC_TYPE_PROPS } from '@carrier/workflowui-globalfunctions'

//Material UI
import { TableCell, TableRow, Box, Paper, Grid, withStyles, Typography } from '@material-ui/core'

//Styles
import { AdvancedAcousticsStyles } from './AdvancedAcousticsStyles'

//Controls & Layout
import CardLayout from '../../../CardLayout'
import Boolean from '../../../ControlTypes/Boolean'
import RangeWithUnit from '../../../ControlTypes/RangeWithUnit'
import Checkbox from '../../../Checkbox/Checkbox'
import InputRange from '../../../InputRange/InputRange'
import { LayoutButton } from '../../../LayoutButton/LayoutButton'

//Constants
import {
    SPECIFY_BARRIER_CANVASWIDTH,
    SPECIFY_REFLECTION_CANVASWIDTH,
    INPUT_RANGE_TOOLTIP_TEXT,
} from './AdvanceAcousticsConstants'

//Misc
import ReferenceImage from './ReferenceImage'
import AcousticsHelpMenu from './AcousticsHelpMenu'
import CalculatedOutput from './CalculatedOutput'

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#E8E8E8',
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
        // border: '1px solid rgba(224, 224, 224, 1)',
    },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow)

const AdvancedAcoustics = (props) => {
    const {
        intl,
        blobStorage,
        allMappedData,
        calc,
        SECTION_NAMES,
        AUX_CALC_TYPE,
        step4,
        getAuxiliaryCalc,
        useErrorHandling,
        ConfigurationInputData,
        configurationData,
        setIsReportPreviewOpen,
        rulesLoading,
        setReportsErrored,
        setPerfLoading,
        setGeneratingReports,
        onNewAssignment,
    } = props

    const specifyBarrier_HeightOfBarrier_Description_Ref = useRef(null)
    const specifyBarrier_HeightOfBarrier_Description_Initial_Width = useRef(null)
    const specifyBarrier_HeightOfBarrier_Description_Initial_Top = useRef(null)

    const specifyReflection_HDUB_Description_Ref = useRef(null)
    const specifyReflection_HDUB_Description_Initial_Width = useRef(null)
    const specifyReflection_HDUB_Description_Initial_Top = useRef(null)
    const [
        specifyBarrier_HeightOfBarrier_Description_Dimensions,
        setSpecifyBarrier_HeightOfBarrier_Description_Dimensions,
    ] = useState([0, 0])

    const [specifyReflection_HDUB_Description_Dimensions, setSpecifyReflection_HDUB_Description_Dimensions] = useState([
        0, 0,
    ])

    // eslint-disable-next-line no-unused-vars
    const [specifyBarrier_CanvasWidth, setSpecifyBarrier_CanvasWidth] = useState(SPECIFY_BARRIER_CANVASWIDTH)
    // const [specifyBarrier_CanvasHeight, setspecifyBarrier_CanvasHeight] = useState(SPECIFY_BARRIER_CANVASHEIGHT)
    // eslint-disable-next-line no-unused-vars
    const [specifyReflection_CanvasWidth, setSpecifyReflection_CanvasWidth] = useState(SPECIFY_REFLECTION_CANVASWIDTH)
    // const [specifyReflection_CanvasHeight, setspecifyReflection_CanvasHeight] = useState(
    //     SPECIFY_REFLECTION_CANVASHEIGHT
    // )
    function updateSize() {
        setSpecifyBarrier_HeightOfBarrier_Description_Dimensions([
            specifyBarrier_HeightOfBarrier_Description_Ref.current.offsetWidth,
            specifyBarrier_HeightOfBarrier_Description_Ref.current.offsetHeight,
        ])
        setSpecifyReflection_HDUB_Description_Dimensions([
            specifyReflection_HDUB_Description_Ref.current.offsetWidth,
            specifyReflection_HDUB_Description_Ref.current.offsetHeight,
        ])
    }
    function resizeCanvasReq() {
        window.requestAnimationFrame(updateSize)
    }

    useLayoutEffect(() => {
        window.addEventListener('resize', resizeCanvasReq)

        //window.addEventListener('resize', updateSize)

        updateSize()
        return () => window.removeEventListener('resize', resizeCanvasReq)
    }, [])

    useEffect(() => {
        if (specifyBarrier_HeightOfBarrier_Description_Initial_Width.current === null) {
            specifyBarrier_HeightOfBarrier_Description_Initial_Width.current =
                specifyBarrier_HeightOfBarrier_Description_Ref.current.offsetWidth
        }
        if (specifyBarrier_HeightOfBarrier_Description_Initial_Top.current === null) {
            specifyBarrier_HeightOfBarrier_Description_Initial_Top.current =
                specifyBarrier_HeightOfBarrier_Description_Ref.current.getBoundingClientRect().top
        }
        if (specifyReflection_HDUB_Description_Initial_Width.current === null) {
            specifyReflection_HDUB_Description_Initial_Width.current =
                specifyReflection_HDUB_Description_Ref.current.offsetWidth
        }
        if (specifyReflection_HDUB_Description_Initial_Top.current === null) {
            specifyReflection_HDUB_Description_Initial_Top.current =
                specifyReflection_HDUB_Description_Ref.current.getBoundingClientRect().top
        }
    }, [])

    useEffect(() => {
        setSpecifyBarrier_CanvasWidth(
            (SPECIFY_BARRIER_CANVASWIDTH / specifyBarrier_HeightOfBarrier_Description_Initial_Width.current) *
                specifyBarrier_HeightOfBarrier_Description_Dimensions[0]
        )
    }, [specifyBarrier_HeightOfBarrier_Description_Dimensions])

    useEffect(() => {
        setSpecifyReflection_CanvasWidth(
            (SPECIFY_REFLECTION_CANVASWIDTH / specifyReflection_HDUB_Description_Initial_Width.current) *
                specifyReflection_HDUB_Description_Dimensions[0]
        )
    }, [specifyReflection_HDUB_Description_Dimensions])

    const [errorMsg, setErrorMsg] = useState(null)
    const [calcData, setCalcData] = useState({})
    const api = useSelector((state) => state.api)
    const calcApi = api.calcEngine
    const apiConfig = api.rulesEngineApi

    const {
        ACO_bSpecifyBarrier,
        ACO_bSpecifyReflection,
        ACO_fHeightBarrier,
        ACO_fHeightReceiver,
        ACO_fHeightSource,
        ACO_fHorzDistanceReceiver,
        ACO_fHorzDistanceReceiverBarr,
        ACO_fHorzDistanceUnitBarr,
    } = step4[SECTION_NAMES.ACOUSTICS_CONTROLS]

    const auxiliaryCalcOptions = {
        [CALC_TYPE_PROPS.SELECTION]: { Value: 'FALSE' },
        [CALC_TYPE_PROPS.PERFORMANCE]: { Value: 'FALSE' },
        [CALC_TYPE_PROPS.AUXILIARY]: { Value: 'TRUE' },
        [AUX_CALC_TYPE.ADVANCEDACOUSTICS]: { Value: 'TRUE' },
    }

    const { triggerError } = useErrorHandling()

    const classes = AdvancedAcousticsStyles()

    const [isCalculatedAdvancedAcousticsAreaVisible, setIsCalculatedAdvancedAcousticsAreaVisible] = useState(false)
    const [calculateButtonDisabled, setCalculateButtonDisabled] = useState(false)

    const invokeAdvancedAcousticsCalculation = () => {
        try {
            setIsCalculatedAdvancedAcousticsAreaVisible(true)
            setCalculateButtonDisabled(true)
            if (!isEmptyArray(ConfigurationInputData)) {
                loadRulesJson(ConfigurationInputData)
            }
        } catch (error) {
            triggerError(error)
        }
    }

    async function loadAuxiliaryData(input) {
        const { error = '', response = null } = await getAuxiliaryCalc(
            intl,
            input,
            apiConfig,
            calcApi,
            auxiliaryCalcOptions
        )
        // Successful API response
        if (response) {
            const output = response?.Tag?.runResult?.outputList?.outputData
            const error = output.options?.outputElement.find((obj) => obj['@ddname'] === 'sErrorMsg') ?? null
            if (error) {
                setErrorMsg(error)
                //setReportsErrored(true)
            }
            setCalcData(output)
            setCalculateButtonDisabled(false)
        }
        // Failed API response
        else if (error) {
            setErrorMsg(error)
            //setReportsErrored(true)
        }
    }

    async function loadRulesJson(assignments) {
        try {
            // Load performance data once we know we have a valid configuration
            await loadAuxiliaryData(assignments)
        } catch (rulesApiError) {
            setErrorMsg('Tag does not have a valid configuration')
            setReportsErrored(true)
            setPerfLoading(false)
        } finally {
            setPerfLoading(false)
            setGeneratingReports(false)
            if (!errorMsg) {
                setIsReportPreviewOpen(true)
            }
        }
    }

    const AcousticControls = () => {
        return (
            <>
                <Box id={SECTION_NAMES.CAPACITY_REQUIREMENTS}>
                    <CardLayout component={Paper}>
                        <Grid container>
                            <Grid container>
                                <Grid item xs={8} className={classes.typography}>
                                    <Typography variant='subtitle2' color='primary'>
                                        1. Height of Source
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <RangeWithUnit
                                            name={ACO_fHeightSource.propName}
                                            isConfiguration
                                            rulesJson={configurationData}
                                            rulesLoading={rulesLoading}
                                            onNewAssignment={onNewAssignment}>
                                            <InputRange
                                                isLabelRequired={false}
                                                toolTipText={INPUT_RANGE_TOOLTIP_TEXT}
                                            />
                                        </RangeWithUnit>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={8} className={classes.typography}>
                                    <Typography variant='subtitle2' color='primary'>
                                        2. Horizontal distance to Receiver
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <RangeWithUnit
                                            name={ACO_fHorzDistanceReceiver.propName}
                                            isConfiguration
                                            rulesJson={configurationData}
                                            rulesLoading={rulesLoading}
                                            onNewAssignment={onNewAssignment}>
                                            <InputRange
                                                isInteger
                                                isLabelRequired={false}
                                                toolTipText={INPUT_RANGE_TOOLTIP_TEXT}
                                            />
                                        </RangeWithUnit>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs={8} className={classes.typography}>
                                    <Typography variant='subtitle2' color='primary'>
                                        3. Height of Receiver
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <RangeWithUnit
                                            name={ACO_fHeightReceiver.propName}
                                            isConfiguration
                                            rulesJson={configurationData}
                                            rulesLoading={rulesLoading}
                                            onNewAssignment={onNewAssignment}>
                                            <InputRange
                                                isInteger
                                                isLabelRequired={false}
                                                toolTipText={INPUT_RANGE_TOOLTIP_TEXT}
                                            />
                                        </RangeWithUnit>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={6} className={classes.specifyBarrierCanvasContainerGrid}>
                                    {/* <CustomCanvasBorder
                                        startX={SPECIFY_BARRIER_STARTX}
                                        startY={SPECIFY_BARRIER_STARTY}
                                        canvasWidth={specifyBarrier_CanvasWidth}
                                        canvasHeight={specifyBarrier_CanvasHeight}
                                        initialTopValue={specifyBarrier_HeightOfBarrier_Description_Initial_Top.current}
                                        dynamicTopValue={
                                            specifyBarrier_HeightOfBarrier_Description_Ref.current
                                                ? specifyBarrier_HeightOfBarrier_Description_Ref.current.getBoundingClientRect()
                                                      .top
                                                : 0
                                        }
                                        canvasStyles={specifyBarrierStyles}
                                    /> */}
                                    <Boolean
                                        name={ACO_bSpecifyBarrier.propName}
                                        // tags={tags}
                                        isConfiguration
                                        rulesJson={configurationData}
                                        onNewAssignment={onNewAssignment}>
                                        <Checkbox className={classes.specifyBarrierCheckboxInternalStyles} />
                                    </Boolean>
                                </Grid>
                                <Grid container className={classes.specifyBarrierCheckbox}>
                                    <Grid item xs={8} className={classes.typography}>
                                        <Typography
                                            id={'specifyBarrier_HeightOfBarrier_Description'}
                                            ref={specifyBarrier_HeightOfBarrier_Description_Ref}
                                            variant='subtitle2'
                                            color='primary'>
                                            4. Height of Barrier
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box>
                                            <RangeWithUnit
                                                name={ACO_fHeightBarrier.propName}
                                                isConfiguration={true}
                                                rulesJson={configurationData}
                                                rulesLoading={rulesLoading}
                                                onNewAssignment={onNewAssignment}>
                                                <InputRange
                                                    isInteger
                                                    isLabelRequired={false}
                                                    toolTipText={INPUT_RANGE_TOOLTIP_TEXT}
                                                />
                                            </RangeWithUnit>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs className={classes.specifyBarrierCheckbox}>
                                        <Typography variant='subtitle2' color='primary'>
                                            5. Horizontal Distance to Receiver from Barrier
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box>
                                            <RangeWithUnit
                                                name={ACO_fHorzDistanceReceiverBarr.propName}
                                                isConfiguration={true}
                                                rulesJson={configurationData}
                                                rulesLoading={rulesLoading}
                                                onNewAssignment={onNewAssignment}>
                                                <InputRange
                                                    isInteger
                                                    isLabelRequired={false}
                                                    toolTipText={INPUT_RANGE_TOOLTIP_TEXT}
                                                />
                                            </RangeWithUnit>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid
                                    id={'specifyReflectionCheckbox'}
                                    item
                                    xs
                                    className={classes.specifyReflectionCanvasContainerGrid}>
                                    {/* <CustomCanvasBorder
                                        startX={SPECIFY_REFLECTION_STARTX}
                                        startY={SPECIFY_REFLECTION_STARTY}
                                        canvasWidth={specifyReflection_CanvasWidth}
                                        canvasHeight={specifyReflection_CanvasHeight}
                                        initialTopValue={specifyReflection_HDUB_Description_Initial_Top.current}
                                        dynamicTopValue={
                                            specifyReflection_HDUB_Description_Ref.current
                                                ? specifyReflection_HDUB_Description_Ref.current.getBoundingClientRect()
                                                      .top
                                                : 0
                                        }
                                        canvasStyles={specifyReflectionStyles}
                                    /> */}
                                    <Boolean
                                        name={ACO_bSpecifyReflection.propName}
                                        // tags={tags}
                                        isConfiguration
                                        rulesJson={configurationData}
                                        onNewAssignment={onNewAssignment}>
                                        <Checkbox className={classes.specifyReflectionCheckboxInternalStyles} />
                                    </Boolean>
                                </Grid>
                                <Grid container className={classes.specifyReflectionCheckbox}>
                                    <Grid item xs={8} className={classes.typography}>
                                        <Typography
                                            variant='subtitle2'
                                            color='primary'
                                            id={'specifyReflection_HDUB_Description'}
                                            ref={specifyReflection_HDUB_Description_Ref}>
                                            6. Horizontal Distance to Unit from Barrier
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box>
                                            <RangeWithUnit
                                                name={ACO_fHorzDistanceUnitBarr.propName}
                                                isConfiguration={true}
                                                rulesJson={configurationData}
                                                rulesLoading={rulesLoading}
                                                onNewAssignment={onNewAssignment}>
                                                <InputRange
                                                    isInteger
                                                    isLabelRequired={false}
                                                    toolTipText={INPUT_RANGE_TOOLTIP_TEXT}
                                                />
                                            </RangeWithUnit>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardLayout>
                </Box>
            </>
        )
    }

    return (
        <div className={classes.root}>
            <Box>
                <CardLayout>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <ReferenceImage blobStorage={blobStorage} />
                        </Grid>
                        <Grid item xs>
                            <AcousticControls />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <CalculatedOutput
                                isCalculatedAdvancedAcousticsAreaVisible={isCalculatedAdvancedAcousticsAreaVisible}
                                classes={classes}
                                StyledTableCell={StyledTableCell}
                                StyledTableRow={StyledTableRow}
                                calcData={calcData}
                                allMappedData={allMappedData}
                                calc={calc}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <AcousticsHelpMenu classes={classes} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs className={classes.calculateButtonStylesContainer}>
                            <LayoutButton
                                className={calculateButtonDisabled ? classes.layoutButtonDisabled : ''}
                                disabled={calculateButtonDisabled}
                                variant='outlined'
                                id='Calculate'
                                onClick={invokeAdvancedAcousticsCalculation}>
                                {intl.formatMessage({
                                    id: 'Calculate',
                                })}
                            </LayoutButton>
                        </Grid>
                    </Grid>
                </CardLayout>
            </Box>
        </div>
    )
}

AdvancedAcoustics.propTypes = {}
const mapStateToProps = (state) => ({
    blobStorage: state.api.blobStorage,
})

export default injectIntl(connect(mapStateToProps, null)(AdvancedAcoustics))
