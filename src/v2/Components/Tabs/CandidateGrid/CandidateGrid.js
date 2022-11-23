import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { injectIntl } from 'react-intl'
import { Box, Typography } from '@material-ui/core'
import {
    sortingOrder,
    showWarningNotification,
    isEmptyObject,
    CANDIDATE_GRID_ROWS_PER_PAGE,
    injectIntlTranslation,
} from '@carrier/workflowui-globalfunctions'
import CustomGrid from '../../../../Components/CustomGrid/CustomGrid'
import candidateGridStyles from './CandidateGridStyles'

const CandidateGrid = (props) => {
    const {
        intl,
        lang,
        rulesApi,
        calcApi,
        showWarningNotification,
        unit,
        selCalcResult,
        selectedCandidate,
        setSelectedCandidate,
        setRulesLoading,
        setAllowStepChange,
        setSelCalcResult,
        SelectionInputData,
        currentUnit,
        rulesLoading,
        getSelectedModelFromCandidate,
        configurationData,
        sectionNames,
        getCalcCandidatesGridData,
        findAutoSelectedCandidateInGrid,
        candidateGridConfig,
        candidateListColumn,
        candidateUniqueKey,
        candidateGroupConfig,
        candidateGroupColumn,
        getHeaderData,
    } = props
    const { gridRoot, rowClassName, tdClassName, heater, cooler, pagination } = candidateGridStyles()
    const { Size } = candidateListColumn
    const { Heating, Cooling, Default } = candidateGroupColumn

    const [headCells, setHeadCells] = useState(
        getHeaderData({ intl, tdClassName, heater, cooler, unit, Heating, Cooling })
    )
    const [errorMsg, setErrorMsg] = useState('')
    const [candidateUnit, setCandidateUnit] = useState(currentUnit)
    const [showGrid, setShowGrid] = useState(true)
    const [selectedRow, setSelectedRow] = useState([selectedCandidate.selectedCandidate])

    useEffect(() => {
        setHeadCells(getHeaderData({ intl, tdClassName, heater, cooler, unit, Heating, Cooling }))
    }, [lang])

    useEffect(() => {
        if (currentUnit !== candidateUnit && !rulesLoading) {
            setHeadCells(getHeaderData({ intl, tdClassName, heater, cooler, unit, Heating, Cooling }))
            callSelectionCalculations()
            setCandidateUnit(currentUnit)
        }
    }, [currentUnit, rulesLoading])

    useEffect(() => {
        //Fires when the component loads OR when Selection Input has changed (i.e. after a Save Tag)
        if (!selCalcResult) {
            callSelectionCalculations()
        }
    }, [SelectionInputData])

    useEffect(() => {
        if (!showGrid) {
            setShowGrid(true)
        }
    })

    useEffect(() => {
        setShowGrid(false)
    }, [selectedRow])

    // if the user has previously selected a candidate in the given
    // tag save, check for that candidate in the grid response
    // and set selected candidate/row
    const autoSelectCandidate = (response) => {
        const row = findAutoSelectedCandidateInGrid(response.gridRows, configurationData)
        if (!row) return
        setSelectedCandidate((prevState) => ({
            ...prevState,
            selectedModel: getSelectedModelFromCandidate(row),
            selectedCandidate: row,
        }))
        setSelectedRow([row])
    }

    const callSelectionCalculations = async () => {
        setSelCalcResult(null)
        setErrorMsg('')
        setRulesLoading(true)
        setAllowStepChange(false)
        const { error = '', response = null } = await getCalcCandidatesGridData({
            intl,
            rulesApi,
            calcApi,
            SelectionInputData,
            unit,
        })
        if (error) {
            showWarningNotification(error, false)
            setErrorMsg(error)
            setSelCalcResult(null)
        } else {
            const { gridRows, calculationInfoReturned } = response
            if (calculationInfoReturned) {
                showWarningNotification(calculationInfoReturned, false)
            }
            setSelCalcResult(gridRows)
            // if we have configuration (a.k.a previously selected candidate),
            // auto select our selectedCandidate in the CandidateGrid
            if (configurationData && !isEmptyObject(configurationData)) autoSelectCandidate(response)
        }
        setRulesLoading(false)
        setAllowStepChange(true)
    }

    const selectedCandidateHandler = (candidateInfo) => {
        if (candidateInfo[0]) {
            setSelectedCandidate((prevState) => ({
                ...prevState,
                selectedModel: getSelectedModelFromCandidate(candidateInfo[0]),
                selectedCandidate: candidateInfo[0],
            }))
        }
    }

    candidateGroupConfig[Heating].className = tdClassName
    candidateGroupConfig[Cooling].className = tdClassName
    candidateGroupConfig[Default].className = tdClassName

    return (
        <>
            {showGrid && (
                <Box id={sectionNames.UNIT_SIZE} mb={2}>
                    <Typography variant='h2' color='primary'>
                        {injectIntlTranslation(intl, 'UNIT_SIZE_TITLE')}
                    </Typography>
                    <CustomGrid
                        id='CandidateGrid'
                        uniqueKey={candidateUniqueKey}
                        gridClassName={gridRoot}
                        rowClassName={rowClassName}
                        showCheckbox={true}
                        headCells={headCells}
                        rows={selCalcResult ? selCalcResult : []}
                        selectedRows={selectedRow}
                        isLoading={selCalcResult ? false : errorMsg ? false : true}
                        hideSearch
                        sortable
                        doNotTranslate={false}
                        config={candidateGridConfig}
                        sorting={sortingOrder.descending}
                        orderByfield={Size}
                        showLinearProgress={false}
                        rowCheckboxHandler={selectedCandidateHandler}
                        singleSelectGrid
                        rowsToShowPerPage={CANDIDATE_GRID_ROWS_PER_PAGE}
                        rowsPerPageOptions={[5, 10, 20, 100]}
                        paginationClass={pagination}
                        columnGrouping
                        columnGroupConfig={candidateGroupConfig}
                    />
                </Box>
            )}
        </>
    )
}

const mapStateToProps = (state) => ({
    lang: state.locale.leafLocale,
    rulesApi: state.api.rulesEngineApi,
    calcApi: state.api.calcEngine,
    unit: state.locale.unit,
})

export default injectIntl(withRouter(connect(mapStateToProps, { showWarningNotification })(CandidateGrid)))
