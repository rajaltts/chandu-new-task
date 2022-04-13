import React from 'react'
import ReactCharts from './ReactCharts'
import { reportType } from '@carrier/workflowui-globalfunctions'

const Chart = (props) => {
    const { type, option, ...rest } = props
    const { xAxis = {}, yAxis = {}, series = [], tooltip = {}, legend = {}, ...others } = option
    const { Line, BasicArea, StackedAreaChart, Bar, StackedBarChart, StackedColumnChart, Scatter, Pie } = reportType

    const getLineChartOption = (additionalxAxis = {}, additionalSeries = {}, additionalLegend = {}) => {
        return {
            xAxis: { type: 'category', ...additionalxAxis, ...xAxis },
            yAxis: { type: 'value', ...yAxis },
            series: series.map((elem) => ({ type, ...additionalSeries, ...elem })),
            tooltip: { trigger: 'axis', ...tooltip },
            legend: { ...additionalLegend, ...legend },
            ...others,
        }
    }

    const getScatterChartOption = (additionalSeries = {}, additionalTooltip = {}) => {
        return {
            xAxis: { ...xAxis },
            yAxis: { ...yAxis },
            series: series.map((elem) => ({ type, ...additionalSeries, ...elem })),
            tooltip: { trigger: 'axis', ...additionalTooltip, ...tooltip },
            ...others,
        }
    }

    switch (type) {
        case Line:
        case BasicArea:
            return (
                <ReactCharts
                    option={getLineChartOption({ boundaryGap: false }, { type: 'line', areaStyle: {} })}
                    {...rest}
                />
            )
        case StackedAreaChart:
            return (
                <ReactCharts
                    option={getLineChartOption(
                        { boundaryGap: false },
                        { type: 'line', stack: 'Total', emphasis: { focus: 'series' }, areaStyle: {} },
                        { orient: 'horizontal', top: 'bottom' }
                    )}
                    {...rest}
                />
            )
        case Bar:
            return <ReactCharts option={getLineChartOption()} {...rest} />
        case StackedBarChart:
            const additionalSeries = {
                type: 'bar',
                stack: 'total',
                emphasis: {
                    focus: 'series',
                },
                label: {
                    show: true,
                },
            }
            return (
                <ReactCharts
                    option={getLineChartOption({}, additionalSeries, { orient: 'horizontal', top: 'bottom' })}
                    {...rest}
                />
            )
        case StackedColumnChart:
            return (
                <ReactCharts
                    option={getLineChartOption(
                        {},
                        { type: 'bar', emphasis: { focus: 'series' } },
                        { orient: 'horizontal', top: 'bottom' }
                    )}
                    {...rest}
                />
            )
        case Scatter:
            return <ReactCharts option={getScatterChartOption({ symbolSize: 10 })} {...rest} />
        case Pie:
            return (
                <ReactCharts
                    option={{
                        legend: { orient: 'horizontal', top: 'bottom' },
                        ...getScatterChartOption({ radius: '50%' }, { trigger: 'item' }),
                    }}
                    {...rest}
                />
            )
        default:
            return <></>
    }
}

export default Chart
