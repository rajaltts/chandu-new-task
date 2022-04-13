import React, { useEffect, useState } from 'react'
import useSelectionRadarStyle from './SelectionRadarStyle'
import RadaChart from '../RadarChart/RadaChart'
import InputWithAutoComplete from '../InputWithAutoComplete/InputWithAutoComplete'
import Checkbox from '@material-ui/core/Checkbox'
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
    const {
        tagAttrName,
        data,
        kpiConfig,
        changeAutoCompleteHandler,
        autoCompleteDefVal,
        showSetBaseline,
        defaultSelectedKPIs,
        customShowToolTip,
        scaleConfig,
    } = props
    const { useSameScale, marginRange = 0.1, minMaxSelfAdaption = true } = scaleConfig
    const {
        rootStyle,
        leftStyle,
        rightStyle,
        checkBoxStyle,
        icon,
        checkedIcon,
        chillerInputStyle,
        baselineTextStyle,
        baselineInputStyle,
        chillerKPIStyle,
        chkGroupWrapperStyle,
    } = useSelectionRadarStyle()
    const [KPIs, setKPIs] = useState([])
    const [indicator, setIndicator] = useState([])
    const [minAndMaxValues, setMinAndMaxValues] = useState({})
    const [allKPIs, setAllKPIs] = useState([])
    const [autoCompleteVal, setAutoCompleteVal] = useState()
    const [sortedData, setSortedData] = useState([])
    const [baselineIsSelected, setBaselineIsSelected] = useState(false)

    useEffect(() => {
        let allKPIsTemp = getAllKpiConfig()
        if (defaultSelectedKPIs) {
            setKPIs(filterKPIsByDefault(allKPIsTemp))
        } else {
            setKPIs(allKPIsTemp)
        }
        setAllKPIs(allKPIsTemp)
    }, [kpiConfig])

    useEffect(() => {
        if (allKPIs?.length > 0) {
            getProperMinAndMaxValue(allKPIs)
            sortDataByBaseline(autoCompleteVal)
        }
    }, [data, allKPIs])

    useEffect(() => {
        setAutoCompleteVal(autoCompleteDefVal)
        sortDataByBaseline(autoCompleteDefVal)
    }, [autoCompleteDefVal])

    function filterKPIsByDefault(allKPIsTemp) {
        return allKPIsTemp.filter((item) => defaultSelectedKPIs.some((defaultKPI) => defaultKPI === item.dataIndex))
    }

    function sortDataByBaseline(baseline) {
        let sortedDataTemp = [...data]
        let index = sortedDataTemp.findIndex((item) => baseline.Id === item.Id)
        if (index >= 0) {
            let itemTemp = sortedDataTemp[index]
            sortedDataTemp.splice(index, 1)
            sortedDataTemp.splice(0, 0, itemTemp)
            setBaselineIsSelected(true)
        } else {
            setBaselineIsSelected(false)
        }
        setSortedData(sortedDataTemp)
    }

    function getProperMinAndMaxValue() {
        let minAndMaxTemp = useSameScale ? configSameAxisScale() : configDifferentAsixScale()
        setMinAndMaxValues(minAndMaxTemp)
        assembleIndicator(KPIs, minAndMaxTemp)
    }

    function configDifferentAsixScale() {
        let minAndMaxTemp = {}
        data?.length !== 0 &&
            allKPIs.forEach((kpiItem) => {
                let { dataIndex } = kpiItem
                let min = 0
                let max = 0
                data.forEach((dataItem, index) => {
                    const value = Number(dataItem[dataIndex])
                    if (index === 0) {
                        min = max = value
                    } else {
                        max = value > max ? value : max
                        min = value < min ? value : min
                    }
                })
                const { adjustMin, adjustMax } = adjustMinAndMaxForValue(min, max)
                minAndMaxTemp[dataIndex] = { min: adjustMin, max: adjustMax }
            })
        return minAndMaxTemp
    }

    function configSameAxisScale() {
        let minAndMaxTemp = {}
        let min = 0
        let max = 0
        data.forEach((dataItem, index) => {
            allKPIs.forEach((kpiItem) => {
                const { dataIndex } = kpiItem
                const value = Number(dataItem[dataIndex])
                if (index === 0) {
                    min = value
                    max = value
                } else {
                    max = value > max ? value : max
                    min = value < min ? value : min
                }
            })
        })
        const { adjustMin, adjustMax } = adjustMinAndMaxForValue(min, max)
        allKPIs.forEach((kpiItem) => {
            minAndMaxTemp[kpiItem.dataIndex] = { min: adjustMin, max: adjustMax }
        })
        return minAndMaxTemp
    }

    function adjustMinAndMaxForValue(min, max) {
        let adjustMin = 0,
            adjustMax = 0
        if (max === min) {
            const { validIndex, pointIndex, isDecimal } = getValidIndexOfNumber(max)
            const maxNum = Number(max)
            if (!isDecimal) {
                adjustMin = maxNum - 1
                adjustMax = maxNum + 1
            } else if (validIndex < pointIndex) {
                adjustMin = Math.floor(max)
                adjustMax = Math.ceil(max)
            } else if (validIndex > pointIndex) {
                adjustMin = -1
                adjustMax = 1
            }
        } else {
            const range = max - min
            const { validIndex, pointIndex } = getValidIndexOfNumber(range)
            if (pointIndex > validIndex) {
                if (minMaxSelfAdaption) {
                    let factor = Math.pow(10, pointIndex - validIndex - 1)
                    adjustMin = Math.floor((min - range * marginRange) / factor) * factor
                    adjustMax = Math.ceil((Number(max) + Number(range * marginRange)) / factor) * factor
                } else {
                    adjustMin = min - range * marginRange
                    adjustMax = Number(max) + Number(range * marginRange)
                }
            } else {
                if (minMaxSelfAdaption) {
                    let factor = Math.pow(10, validIndex - pointIndex)
                    adjustMin = Math.floor((min - range * marginRange) * factor) / factor
                    adjustMax = Math.ceil((Number(max) + Number(range * marginRange)) * factor) / factor
                } else {
                    adjustMin = min - range * marginRange
                    adjustMax = Number(max) + Number(range * marginRange)
                }
            }
        }
        return { adjustMin: adjustMin, adjustMax: adjustMax }
    }

    function getValidIndexOfNumber(value) {
        let valueStr = value.toString()
        let validIndex
        let pointIndex
        let isDecimal = false
        for (let i = 0; i < valueStr.length; i++) {
            let indexValue = valueStr.charAt(i)
            if (indexValue === '0' || indexValue === '-') {
            } else if (indexValue === '.') {
                pointIndex = i
                isDecimal = true
            } else {
                if (validIndex === undefined) {
                    validIndex = i
                }
            }
            if (i === valueStr.length - 1 && !isDecimal) {
                pointIndex = i + 1
                break
            }
        }
        return { validIndex, pointIndex, isDecimal }
    }

    function getAllKpiConfig() {
        if (kpiConfig) {
            return kpiConfig
        }
        let KPIsTemp = []
        if (data?.length > 0) {
            for (let kpiName in data[0]) {
                if (kpiName != tagAttrName) {
                    KPIsTemp.push({ dataIndex: kpiName })
                }
            }
        }
        return KPIsTemp
    }

    function styledCheckbox(item) {
        return (
            <div>
                <Checkbox
                    className={checkBoxStyle}
                    checked={KPIs.some((KPI) => KPI.dataIndex === item.dataIndex)}
                    disableRipple
                    checkedIcon={<span className={classNames(icon, checkedIcon)} />}
                    icon={<span className={icon} />}
                    inputProps={{ 'aria-label': 'decorative checkbox' }}
                    onChange={(event, checked) => handleOnChange(event, checked, item)}
                />
                <span>{translation(item.text || item.dataIndex)}</span>
            </div>
        )
    }

    function handleOnChange(e, checked, item) {
        let selectedTemp
        if (checked) {
            //need to keep original order
            selectedTemp = allKPIs.filter((kpi) => {
                return KPIs.includes(kpi) || item === kpi
            })
        } else {
            selectedTemp = [...KPIs]
            if (selectedTemp.length > 1) {
                let index = selectedTemp.indexOf(item)
                selectedTemp.splice(index, 1)
            }
        }
        setKPIs(selectedTemp)
        assembleIndicator(selectedTemp, minAndMaxValues)
    }

    function assembleIndicator(selectedKPIs, minAndMaxValues) {
        const indicatorTemp = []
        selectedKPIs.forEach((item) => {
            const { dataIndex } = item
            const minAndMax = minAndMaxValues && minAndMaxValues[dataIndex]
            const axis = {
                ...item,
                axisLabelShow: true,
                axisLabelColor: '#505050',
                showCenterLabel: false,
                min: minAndMax && minAndMax.min,
                max: minAndMax && minAndMax.max,
                axisFontSize: 16,
                axisFontWeight: 600,
            }
            indicatorTemp.push(axis)
        })
        setIndicator(indicatorTemp)
    }

    function handleBaselineChange(event, value, reason) {
        setAutoCompleteVal(value)
        changeAutoCompleteHandler(value)
    }

    return (
        <div className={rootStyle}>
            <div className={leftStyle}>
                <span className={chillerKPIStyle}>{translation('ChillerKPIsCompare')}</span>
                <div className={chkGroupWrapperStyle}>
                    {allKPIs?.map((item) => {
                        return styledCheckbox(item)
                    })}
                </div>
                {showSetBaseline && (
                    <>
                        <span className={baselineTextStyle}>{translation('BaselineChiller')}</span>
                        <div key={autoCompleteVal} className={baselineInputStyle}>
                            <InputWithAutoComplete
                                attrName={tagAttrName}
                                options={data}
                                onChange={handleBaselineChange}
                                outlined={true}
                                defaultOptions={autoCompleteVal}
                                classes={{ root: chillerInputStyle }}
                            />
                        </div>
                    </>
                )}
            </div>
            <div className={rightStyle}>
                {indicator?.length !== 0 && (
                    <RadaChart
                        tagAttrName={tagAttrName}
                        legendConfig={{
                            isVertical: true,
                            legendRight: 0,
                        }}
                        radarConfig={{
                            indicator: indicator,
                            center: ['38%', '50%'],
                            splitNumber: 5,
                            lineStyle: baselineIsSelected
                                ? [
                                      { type: [5, 3], width: 3 },
                                      { type: [1, 0], width: 3 },
                                  ]
                                : [{ type: [1, 0], width: 3 }],
                            radius: 210,
                            highlightPointData: true,
                            customShowToolTip: customShowToolTip,
                        }}
                        data={sortedData}
                        height={490}
                        width={900}
                        showDataTip={true}
                    />
                )}
            </div>
        </div>
    )
}

export default SelectionRadar
