import React from 'react'
import SkeletonAnimation from '../SkeletonAnimation'

const AWeightedSoundPressureLevelsComponent = ({ StyledTableCell, StyledTableRow, calcData, allMappedData, calc }) => {
    return (
        <StyledTableRow>
            <StyledTableCell component='th' scope='row'>
                {
                    'A-Weighted sound pressure levels at a distance as determined by adding the A-Weighting factors to the Sound Pressure Levels at Specified distance (LpA)'
                }
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PressureAt63HzDBA'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PressureAt125HzDBA'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PressureAt250HzDBA'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PressureAt500HzDBA'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PressureAt1000HzDBA'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PressureAt2000HzDBA'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PressureAt4000HzDBA'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PressureAt8000HzDBA'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'SoundPressureDBA'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
        </StyledTableRow>
    )
}

export default AWeightedSoundPressureLevelsComponent
