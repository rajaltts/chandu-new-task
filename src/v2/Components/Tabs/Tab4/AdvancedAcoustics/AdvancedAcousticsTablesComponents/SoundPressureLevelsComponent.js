import React from 'react'
import SkeletonAnimation from '../SkeletonAnimation'

const SoundPressureLevelsComponent = ({ StyledTableCell, StyledTableRow, calcData, allMappedData, calc }) => {
    return (
        <StyledTableRow>
            <StyledTableCell component='th' scope='row'>
                {
                    "Sound Pressure Levels are determined by subtracting the dB falloff from the unit's Sound Power Levels (Lp)"
                }
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PressureAt63HzDB'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PressureAt125HzDB'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PressureAt250HzDB'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PressureAt500HzDB'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PressureAt1000HzDB'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PressureAt2000HzDB'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PressureAt4000HzDB'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PressureAt8000HzDB'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'SoundPressureDB'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
        </StyledTableRow>
    )
}

export default SoundPressureLevelsComponent
