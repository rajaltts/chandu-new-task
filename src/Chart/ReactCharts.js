import React from 'react';
import ReactEcharts from 'echarts-for-react';

const ReactCharts = (props) => {
    const { option, onChartReady=null, opts={}, ...rest } = props;
    const updatedOpts = {renderer: "svg", ...opts}

    return (
        <ReactEcharts
            option={option}
            onChartReady={onChartReady}
            opts={updatedOpts}
            {...rest}
        />
    )
}

export default ReactCharts;

