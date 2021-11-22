import React, { useEffect, useState } from 'react'
import useSelectionRadarStyle from './SelectionRadarStyle'
import RadaChart from '../RadarChart/RadaChart'
import InputWithAutoComplete from '../InputWithAutoComplete/InputWithAutoComplete'
import Checkbox from "@material-ui/core/Checkbox"
import classNames from 'classnames'
import translation from '../Translation'

/**
 * 
 * @param {
 * data format(acquire): [{tagName:'data1', k1:'1', k2:'3', k3:'2'}, { tagName:'data2', k1:'2', k2:'1', k3:'4' }]
 * tagAttrName(acquire): the attribute name of data name, such as tagName for the above data
 * kpiConfig(option): [{dataIndex:'k1'}, {dataIndex:'k2'}], if not set, default value is all attribute names beside tagAttrName - 
 *                    [{dataIndex:'k1'}, {dataIndex:'k2'}, {dataIndex:'k3'}] for above data
 * } props 
 * @returns 
 */
const SelectionRadar = (props) => {

    const {tagAttrName, data, kpiConfig, changeAutoCompleteHandler, autoCompleteDefVal} = props
    const {rootStyle, leftStyle, rightStyle, checkBoxStyle, icon, checkedIcon, chillerInputStyle,
        baselineTextStyle, baselineInputStyle, chillerKPIStyle} = useSelectionRadarStyle()
    const [KPIs, setKPIs] = useState([])
    const [indicator, setIndicator] = useState([])
    const [minAndMaxValues, setMinAndMaxValues] = useState({})
    const [allKPIs ,setAllKPIs] = useState([])
    const [autoCompleteVal, setAutoCompleteVal] = useState()
    const [sortedData, setSortedData] = useState([])
    
    useEffect(() => {
        const allKPIsTemp = getAllKpiConfig()
        setKPIs(allKPIsTemp)
        setAllKPIs(allKPIsTemp)
    },[kpiConfig])

    useEffect(() => {
        if(allKPIs?.length > 0){
            setKPIs(allKPIs)
            getProperMinAndMaxValue(allKPIs)
            sortDataByBaseline(autoCompleteVal)
        }   
    }, [data, allKPIs])

    useEffect(() => {
        setAutoCompleteVal(autoCompleteDefVal)
        sortDataByBaseline(autoCompleteDefVal)
    }, [autoCompleteDefVal])

    function sortDataByBaseline(baseline){
        if(baseline){
            let sortedDataTemp = [...data]
            let index = sortedDataTemp.findIndex(item => baseline.Id === item.Id)
            let itemTemp = sortedDataTemp[index]
            sortedDataTemp.splice(index, 1)
            sortedDataTemp.splice(0, 0, itemTemp)
            setSortedData(sortedDataTemp)
        }else{
            setSortedData([])
        }
    }

    function getProperMinAndMaxValue(allKPIs){
        let minAndMaxTemp = {}
        let spliteRange = 4
        data?.length !== 0 && allKPIs.forEach(kpiItem => {
            let min = 0
            let max = 0
            data.forEach((dataItem, index) => {
                let value = dataItem[kpiItem.dataIndex]
                if(index === 0){
                    min = value
                    max = value
                }else{
                    if(value > max){
                        max = value
                    }
                    if(value < min){
                        min = value
                    }
                }
            })
            if(max === min){
                let {validIndex, pointIndex, isDecimal} = getValidIndexOfNumber(max)
                let maxNum = Number(max)
                if(!isDecimal){
                    minAndMaxTemp[kpiItem.dataIndex] = {min: maxNum - 1, max: maxNum + 1}
                }else if(validIndex < pointIndex){
                    minAndMaxTemp[kpiItem.dataIndex] = {min: Math.floor(max), max: Math.ceil(max)}
                }else if(validIndex > pointIndex){
                    minAndMaxTemp[kpiItem.dataIndex] = {min: -1, max: 1}
                }
            }else{
                let range = max - min
                let {validIndex, pointIndex} = getValidIndexOfNumber(range)
                if(pointIndex > validIndex){
                    let factor = Math.pow(10, pointIndex - validIndex -1) 
                    minAndMaxTemp[kpiItem.dataIndex] = {min: Math.floor((min - range/spliteRange) / factor) * factor, 
                        max: Math.ceil((Number(max) + Number(range/spliteRange)) / factor) * factor}
                }else{
                    let factor = Math.pow(10, validIndex - pointIndex) 
                    minAndMaxTemp[kpiItem.dataIndex] = {min: Math.floor((min - range/spliteRange) * factor) / factor, 
                        max: Math.ceil((Number(max) + Number(range/spliteRange)) * factor) / factor}
                }
            }
        })
        setMinAndMaxValues(minAndMaxTemp)
        assembleIndicator(allKPIs, minAndMaxTemp)
    }

    function getValidIndexOfNumber(value){
        let valueStr = value.toString()
        let validIndex
        let pointIndex
        let isDecimal = false
        for(let i = 0; i < valueStr.length; i++){
            let indexValue = valueStr.charAt(i)
            if(indexValue === '0' || indexValue === '-'){
            }else if(indexValue === '.'){
                pointIndex = i
                isDecimal = true
            }else{
                if(validIndex === undefined){
                    validIndex = i
                }
            }
            if(i === valueStr.length -1 && !isDecimal){
                pointIndex = i + 1
                break
            }
        }
        return {validIndex, pointIndex, isDecimal}
    }

    function getAllKpiConfig(){
        if(kpiConfig){
            return kpiConfig
        }
        let KPIsTemp = []
        if(data?.length > 0){
            for(let kpiName in data[0]){
                if(kpiName != tagAttrName){
                    KPIsTemp.push({dataIndex: kpiName})
                }
            }
        }
        return KPIsTemp
    }

    function styledCheckbox(item){
        return (
          <div>
            <Checkbox
                className={checkBoxStyle}
                checked={KPIs.some(KPI => (KPI.dataIndex === item.dataIndex))}
                disableRipple
                checkedIcon={<span className={classNames(icon, checkedIcon)} />}
                icon={<span className={icon} />}
                inputProps={{ "aria-label": "decorative checkbox" }}
                onChange={(event, checked) => handleOnChange(event, checked, item)}
            />
            <span>{translation(item.text||item.dataIndex)}</span>
          </div>
        )
    }

    function handleOnChange(e, checked, item){
        let selectedTemp
        if(checked){
            //need to keep original order
            selectedTemp = allKPIs.filter(kpi => {
                return KPIs.includes(kpi) || item === kpi
            })
        }else{
            selectedTemp = [...KPIs]
            if(selectedTemp.length > 1){
                let index = selectedTemp.indexOf(item)
                selectedTemp.splice(index, 1)
            }
        }
        setKPIs(selectedTemp)
        assembleIndicator(selectedTemp, minAndMaxValues)
    }

    function assembleIndicator(selectedKPIs, minAndMaxValues){
        let indicatorTemp = []
        selectedKPIs.forEach(item => {
            let minAndMax = minAndMaxValues && minAndMaxValues[item.dataIndex]
            let axis = {
                text: item.text||item.dataIndex,
                dataIndex: item.dataIndex,
                axisLabelShow: true,
                axisLabelColor: '#9d9d9d',
                showCenterLabel: false,
                min: minAndMax && minAndMax.min,
                max: minAndMax && minAndMax.max,
                isPercentShow: item.isPercentShow,
                fixedNumber: item.fixedNumber,
                isDesc: item.isDesc,
                formatValue: item.formatValue,
                formatAxis: item.formatAxis,
            }
            indicatorTemp.push(axis)
        })
        setIndicator(indicatorTemp)
    }

    function handleBaselineChange(event, value, reason){
        setAutoCompleteVal(value)
        changeAutoCompleteHandler(value)
    }

    return (
        <div className={rootStyle}>
            <div className={leftStyle}>
                <span className={chillerKPIStyle}>{translation('ChillerKPIsCompare')}</span>
                {allKPIs?.map(item => {
                    return styledCheckbox(item)
                })}
                <span className={baselineTextStyle}>{translation('BaselineChiller')}</span>
                <div key={autoCompleteVal} className={baselineInputStyle}>
                    <InputWithAutoComplete
                        attrName={tagAttrName}
                        options={data}
                        onChange={handleBaselineChange}
                        outlined={true}
                        defaultOptions={autoCompleteVal}
                        classes={{root: chillerInputStyle}}
                    />
                </div>
            </div>
            <div className={rightStyle} key={[JSON.stringify(indicator), JSON.stringify(sortedData)]}>
                {indicator?.length !== 0 &&
                    <RadaChart
                        tagAttrName={tagAttrName}
                        legendConfig={{
                            isVertical: true,
                            legendRight: 0
                        }}
                        radarConfig={{
                            indicator: indicator,
                            center: ['40%', '50%'],
                            splitNumber: 5,
                            lineStyle : [{type: [5, 3], width: 3}, {type: [1, 0], width: 3}],
                            radius: 165,
                        }}
                        data={sortedData}
                        height={400} 
                        width={780}
                        showDataTip={true}
                    />}
            </div>
        </div>
    )
}

export default SelectionRadar
