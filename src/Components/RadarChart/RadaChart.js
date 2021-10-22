import React, { useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react'
import { injectIntlTranslation } from '@carrier/workflowui-globalfunctions'
import { injectIntl } from "react-intl"

const RadaChart = (props) => {

    const { titleConfig = {}, legendConfig = {}, radarConfig={}, data, color, 
        tagAttrName='name', showDataTip=false, height=350, width=700, intl } = props

    const { isVertical, legendPadding=0, legendLeft='auto', legendTop='auto', 
        legendRight='auto', legendBottom='auto' } = legendConfig

    const { indicator={}, center=['25%', '50%'], radius=120, startAngle=90, 
        splitNumber=4, isPolygon } = radarConfig
    
    const [option, setOption] = useState(getOption())

    useEffect(() => {
        let configTemp = JSON.parse(JSON.stringify(option))
        configTemp.tooltip.formatter = showToolTipData
        configTemp.radar.indicator = updateIndicator()
        setOption(configTemp)
    },[intl])

    function getOption(){
        let optionConfig = {
            title: {
                text: titleConfig.text,
                textStyle:{
                    color: color,
                    fontStyle: titleConfig.fontStyle,
                    fontWeight: titleConfig.fontWeight,
                    fontSize: titleConfig.fontSize
                }
            },
            legend: {
                data: getLegendData(),
                orient: isVertical ? 'vertical' : 'horizontal',
                padding: legendPadding,
                left: legendLeft,
                top: legendTop,
                right: legendRight,
                bottom: legendBottom
            },
            tooltip: {
                show: showDataTip,
                formatter: showToolTipData
            },
            radar: {
                indicator: updateIndicator(),
                center: center,
                radius: radius,
                startAngle: startAngle,
                splitNumber: splitNumber,
                shape: isPolygon ? 'polygon' : 'circle',
                name: {
                    formatter: '{value}',
                    textStyle: {
                        color: radarConfig.textColor ? radarConfig.textColor : '#428BD4'
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: radarConfig.areaColor ? radarConfig.areaColor : ['#e5ecf6'],
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: radarConfig.axisLineColor ? radarConfig.axisLineColor : '#fff'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: radarConfig.splitLineColor ? radarConfig.splitLineColor : '#fff'
                    }
                },
            },
            series: [
                {
                    name: 'radar',
                    type: 'radar',
                    emphasis: {
                        lineStyle: {
                            width: 3
                        }
                    },
                    data: getRadarDatas()
                },
            ]
        }
        if(color){
            optionConfig.color = color
        }
        return optionConfig
    }

    function showToolTipData(value){
        let index = value?.dataIndex
        let dataLine = data[index]
        let dataTip = dataLine[tagAttrName] + '<br />'
        indicator && indicator.map(item => {
            dataTip = dataTip + '<li>' + injectIntlTranslation(intl, item.text) + ': ' + dataLine[item.text] + '</li>'
        })
        return dataTip
    }

    function updateIndicator(){
        let indicatorTemp = []
        indicator && indicator.map(item => {
            let text = injectIntlTranslation(intl, item.text)
            let itemTemp = {
                text: text,
                min: item.isDesc ? -item.max : item.min,
                max: item.isDesc ? -item.min : item.max,
                axisLabel:{
                    show: item.axisLabelShow,
                    formatter: function(value){
                        return item.isDesc ? -value : value
                    },
                    color: item.axisLabelColor,
                    showMinLabel: item.showCenterLabel,
                    showMaxLabel: item.showEdgeLabel,
                }
            }
            indicatorTemp.push(itemTemp)
        })
        return indicatorTemp
    }

    function getLegendData(){
        let legendData = []
        data && data.map(item => {
            legendData.push(item[tagAttrName])
        })
        return legendData
    }

    function getRadarDatas(){
        let radarDatas = []
        data && data.map(item => {
            let radarData = {}
            radarData.name = item[tagAttrName]
            let radarLine = []
            indicator && indicator.map(key => {
                let value = key.isDesc ? -item[key.text] : item[key.text]
                radarLine.push(value)
            })
            radarData.value = radarLine
            radarDatas.push(radarData)
        })
        return radarDatas
    }

    return (
        <ReactEcharts
            option={option}
            style={{height: height, width: width}}
            className='react_for_echarts' 
        />
    )
}

export default injectIntl(RadaChart)