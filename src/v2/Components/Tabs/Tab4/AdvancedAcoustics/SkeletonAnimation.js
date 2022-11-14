import React from 'react'
import { GetAHRIDigits, isEmptyObject, getCalcValue } from '@carrier/workflowui-globalfunctions'
import './skeleton.css'

const SkeletonAnimation = ({ calcData, calcValue, allMappedData, calc }) => {
    return (
        <>
            {isEmptyObject(calcData) ? (
                <div className='skeletonContainer'>
                    <div className='skeletonBox'></div>
                </div>
            ) : (
                GetAHRIDigits(getCalcValue(calcValue, 'system', 'English', calcData, allMappedData, calc), 4)
            )}
        </>
    )
}

export default SkeletonAnimation
