import React from 'react'

import SoundPowerLevelsComponent from './AdvancedAcousticsTablesComponents/SoundPowerLevelsComponent'
import AWeightedSoundPowerLevelsComponent from './AdvancedAcousticsTablesComponents/AWeightedSoundPowerLevelsComponent'
import SoundPressureLevelsComponent from './AdvancedAcousticsTablesComponents/SoundPressureLevelsComponent'
import AWeightedSoundPressureLevelsComponent from './AdvancedAcousticsTablesComponents/AWeightedSoundPressureLevelsComponent'

const ShowAcousticsCalculationData = ({ StyledTableCell, StyledTableRow, calcData, allMappedData, calc }) => {
    return (
        <>
            <SoundPowerLevelsComponent
                StyledTableCell={StyledTableCell}
                StyledTableRow={StyledTableRow}
                calcData={calcData}
                allMappedData={allMappedData}
                calc={calc}
            />
            <AWeightedSoundPowerLevelsComponent
                StyledTableCell={StyledTableCell}
                StyledTableRow={StyledTableRow}
                calcData={calcData}
                allMappedData={allMappedData}
                calc={calc}
            />
            <SoundPressureLevelsComponent
                StyledTableCell={StyledTableCell}
                StyledTableRow={StyledTableRow}
                calcData={calcData}
                allMappedData={allMappedData}
                calc={calc}
            />
            <AWeightedSoundPressureLevelsComponent
                StyledTableCell={StyledTableCell}
                StyledTableRow={StyledTableRow}
                calcData={calcData}
                allMappedData={allMappedData}
                calc={calc}
            />
        </>
    )
}

export default ShowAcousticsCalculationData
