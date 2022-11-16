// React
import React from 'react'

// Components

import AdvancedAcoustics from '../AdvancedAcoustics/AdvancedAcoustics'
import OptionTabListComponent from '../OptionTabListComponent'

const Acoustics = (props) => {
    const {
        rulesLoading,
        configurationData,
        ConfigurationInputData,
        setIsReportPreviewOpen,
        setReportsErrored,
        setPerfLoading,
        setGeneratingReports,
        onNewAssignment,
        sectionNames,
        step4,
        auxCalcType,
        stepInfo,
        useErrorHandling,
        getAuxiliaryCalc,
        allMappedData,
        calc,
    } = props

    return (
        <div key={stepInfo.rulesPropertyName}>
            <OptionTabListComponent {...props} />
            <AdvancedAcoustics
                allMappedData={allMappedData}
                calc={calc}
                SECTION_NAMES={sectionNames}
                AUX_CALC_TYPE={auxCalcType}
                step4={step4}
                getAuxiliaryCalc={getAuxiliaryCalc}
                useErrorHandling={useErrorHandling}
                ConfigurationInputData={ConfigurationInputData}
                configurationData={configurationData}
                setIsReportPreviewOpen={setIsReportPreviewOpen}
                rulesLoading={rulesLoading}
                setReportsErrored={setReportsErrored}
                setPerfLoading={setPerfLoading}
                setGeneratingReports={setGeneratingReports}
                onNewAssignment={onNewAssignment}
            />
        </div>
    )
}

export default Acoustics
