import React from 'react'
import SkeletonAnimation from '../SkeletonAnimation'

const AWeightedSoundPowerLevelsComponent = ({ StyledTableCell, StyledTableRow, calcData, allMappedData, calc }) => {
    return (
        <StyledTableRow>
            <StyledTableCell component='th' scope='row'>
                {
                    "A-Weighted sound power levels are determined from the unit's sound power levels by adding to them the A-Weighting factors as specified by ANSI S1.4(LwA)"
                }
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PowerAt63HzDBA'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PowerAt125HzDBA'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PowerAt250HzDBA'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PowerAt500HzDBA'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PowerAt1000HzDBA'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PowerAt2000HzDBA'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PowerAt4000HzDBA'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PowerAt8000HzDBA'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'SoundPowerDBA'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
        </StyledTableRow>
    )
}

export default AWeightedSoundPowerLevelsComponent
