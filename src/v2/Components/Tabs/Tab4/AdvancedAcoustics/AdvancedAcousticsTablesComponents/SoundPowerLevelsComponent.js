import React from 'react'
import SkeletonAnimation from '../SkeletonAnimation'

const SoundPowerLevelsComponent = ({ StyledTableCell, StyledTableRow, calcData, allMappedData, calc }) => {
    return (
        <StyledTableRow>
            <StyledTableCell component='th' scope='row'>
                {"Sound Power Levels at Unit's Acoustic Center (Lw), dB"}
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PowerAt63HzDB'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PowerAt125HzDB'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PowerAt250HzDB'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PowerAt500HzDB'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PowerAt1000HzDB'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PowerAt2000HzDB'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PowerAt4000HzDB'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'PowerAt8000HzDB'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
            <StyledTableCell align='right'>
                <SkeletonAnimation
                    calcData={calcData}
                    calcValue={'SoundPowerDB'}
                    allMappedData={allMappedData}
                    calc={calc}
                />
            </StyledTableCell>
        </StyledTableRow>
    )
}

export default SoundPowerLevelsComponent
