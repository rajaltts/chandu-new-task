import React, { useState, useRef } from 'react'
import ReactEcharts from 'echarts-for-react'
import { injectIntlTranslation } from '@carrier/workflowui-globalfunctions'
import { injectIntl } from "react-intl"

const RadaChart = (props) => {

    const { titleConfig = {}, legendConfig = {}, radarConfig={}, data, color, 
        tagAttrName='name', showDataTip=false, height=350, width=700, intl } = props

    const { isVertical, legendPadding=0, legendLeft='auto', legendTop='auto', legendRight='auto', 
        legendBottom='auto' } = legendConfig

    const { indicator={}, center=['25%', '50%'], radius=120, startAngle=90, splitNumber=5, 
        isPolygon, lineStyle=[{}], formatAxisName, highlightPointData } = radarConfig
    
    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)
    const node = useRef()

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
                    formatter: value => formatAxisName ? formatAxisName(value) : value,
                    color: radarConfig.textColor||'#428BD4',
                    fontSize: radarConfig.axisNameFontSize||14,
                    fontWeight: radarConfig.axisNameFontWeight||400
                },
                splitArea: {
                    areaStyle: {
                        color: color||radarConfig.areaColor||['#e5ecf6'],
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: radarConfig.axisLineColor||'#fff',
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: radarConfig.splitLineColor||'#fff'
                    }
                },
            },
            series: [
                {
                    name: 'radar',
                    type: 'radar',
                    data: getRadarDatas()
                },
            ],
        }
        return optionConfig
    }

    function showToolTipData(value){
        let index = value?.dataIndex
        let dataLine = data[index]
        let pointAxis = highlightPointData && mouseInRadarAxis(dataLine)
        let dataTip = dataLine[tagAttrName] + '<br />'
        indicator && indicator.forEach(item => {
            let value = dataLine[item.dataIndex || item.text]
            let formatValue = item.formatValue
            dataTip = pointAxis === item ? 
                dataTip + '<li style="font-weight: 700">' + injectIntlTranslation(intl, item.text) + ': ' + 
                (formatValue ? formatValue(value, item) : value) + '</li>'
                :
                dataTip + '<li>' + injectIntlTranslation(intl, item.text) + ': ' + 
                (formatValue ? formatValue(value, item) : value) + '</li>'
        })
        return dataTip
    }

    function mouseInRadarAxis(dataLine){
        if(center.length >= 2){
            let errorRangeAngle = 5
            let positionY = mouseX - width * (center[0].replace('%', '') / 100)
            let positionX = mouseY - height * (center[1].replace('%', '') / 100)
            let pointDistance = Math.sqrt(positionY * positionY + positionX * positionX)
            let angle = 270 - (startAngle % 360)
            if(positionY >= 0){
                angle = Math.acos(positionX / pointDistance) / Math.PI * 180 + angle
            }else{
                angle = angle - Math.acos(positionX / pointDistance) / Math.PI * 180
            }
            if(angle < 0){
                angle = angle + 360
            }
            let spliteAngle = 360 / indicator.length
            let extraAngle = angle % spliteAngle
            if(extraAngle <= errorRangeAngle || spliteAngle - extraAngle <= errorRangeAngle){
                let axisIndex = Math.round(angle / spliteAngle) % indicator.length
                let axis = indicator[axisIndex]
                let {min, max, isDesc} = axis
                let value = dataLine[axis.dataIndex]
                let centerValue = isDesc ? max : min
                let valDistance = radius * Math.abs((value - centerValue) / (max -min))
                let errorRangeDistance = 7
                if(pointDistance < valDistance + errorRangeDistance && pointDistance > valDistance - errorRangeDistance){
                    return axis
                }
            }
        }
        return undefined
    }

    function updateIndicator(){
        let indicatorTemp = []
        indicator && indicator.map(item => {
            let {isDesc, min, max, unit} = item
            let itemTemp = {
                text: injectIntlTranslation(intl, item.text || item.dataIndex) + (unit ? ' ' + unit  : ''),
                min: isDesc ? (max && -max) : min,
                max: isDesc ? (max && -min) : max,
                axisLabel:{
                    show: item.axisLabelShow,
                    formatter: function(value, index){
                        let temp = isDesc ? -value: value
                        let formatAxis = item.formatAxis
                        temp = (formatAxis ? formatAxis(temp, item, index) : temp)
                        return temp
                    },
                    color: item.axisLabelColor || '#9d9d9d',
                    fontSize: item.axisFontSize || 14,
                    fontWeight: item.axisFontWeight || 400,
                    showMinLabel: item.showCenterLabel,
                    showMaxLabel: item.showEdgeLabel,
                },
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
        data && data.map((item, index) => {
            let radarData = {}
            radarData.name = item[tagAttrName]
            let radarLine = []
            indicator && indicator.map(key => {
                let value = key.isDesc ? -item[key.dataIndex] : item[key.dataIndex]
                radarLine.push(value)
            })
            radarData.value = radarLine
            let style = index > lineStyle.length - 1 ? lineStyle[lineStyle.length - 1] : lineStyle[index]
            radarData.lineStyle = { 
                type: style.type||[1, 0], 
                width: style.width||2
            }
            radarDatas.push(radarData)
        })
        return radarDatas
    }

    function onMouseMoveHandler(e){
        setMouseX(e.pageX - node.current.offsetLeft)
        setMouseY(e.pageY - node.current.offsetTop)
    }

    return (
        <div 
            id='ReactEcharts'
            onMouseMove={onMouseMoveHandler}
            ref={node}
        >
            <ReactEcharts
                option={getOption()}
                style={{height: height, width: width}}
                className='react_for_echarts'
            />
        </div>
    )
}

export default injectIntl(RadaChart)