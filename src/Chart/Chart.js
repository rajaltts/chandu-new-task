import React from 'react';
import ReactCharts from './ReactCharts';

const Chart = (props) => {
    const { type, option, ...rest } = props;
    const { xAxis={}, yAxis={}, series=[], tooltip={}, ...others } = option;

    const getLineChartOption = (additionalxAxis={}, additionalSeries={}) => {
        return {
            xAxis: { type: 'category', ...additionalxAxis, ...xAxis },
            yAxis: { type: 'value', ...yAxis },
            series: series.map(elem => ({type, ...additionalSeries, ...elem})),
            tooltip: { trigger: 'axis', ...tooltip },
            ...others
        }
    }

    const getScatterChartOption = () => {
        return {
            xAxis: { xAxis },
            yAxis: { yAxis },
            series: series.map(elem => ({type, symbolSize: 10, ...elem})),
            tooltip: { trigger: 'axis', ...tooltip },
            ...others
        }
    }

     switch (type) {
        case 'line':
        case 'bar':
            return <ReactCharts option={getLineChartOption()} {...rest} />
        case 'basicArea':
            return <ReactCharts option={getLineChartOption({boundaryGap: false},{type: 'line', areaStyle: {}})} {...rest} />
        case 'scatter':
            return <ReactCharts option={getScatterChartOption()} {...rest} />
        default:
            return <></>
     }
}

export default Chart;