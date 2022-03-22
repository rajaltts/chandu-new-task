import React from 'react';
import ReactEcharts from 'echarts-for-react';

const ReactCharts = (props) => {
    const { option, onChartReady=null, opts={ renderer: "svg" }, ...rest } = props;

    return (
        <ReactEcharts
            option={option}
            onChartReady={onChartReady}
            opts={opts}
            {...rest}
        />
    )
}

export default ReactCharts;

