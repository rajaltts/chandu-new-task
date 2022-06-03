import React from 'react'
import Charts from './Chart'

export default {
    title: 'Chart/Charts',
    component: Charts,
}

const ChartsTemplate = ({ ...args }) => {
    return <Charts {...args} />
}

export const LineChart = ChartsTemplate.bind({})
LineChart.args = {
    type: 'line',
    option: {
        xAxis: {data:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
        series: [{data: [350, 230, 224, 218, 135, 147, 260]}],
        title: {text: 'Line Chart'}
    }
}

export const BarChart = ChartsTemplate.bind({})
BarChart.args = {
    type: 'bar',
    option: {
        xAxis: {data:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
        series: [{data: [350, 230, 224, 218, 135, 147, 260]}],
        title: {text: 'Bar Chart'}
    }
}

export const BasicAreaChart = ChartsTemplate.bind({})
BasicAreaChart.args = {
    type: 'basicArea',
    style: {height: '250px'},
    option: {
        xAxis: {data:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
        series: [{data: [350, 230, 224, 218, 135, 147, 260]}],
        title: {text: 'Basic Area Chart'}
    }
}

export const ScatterChart = ChartsTemplate.bind({})
ScatterChart.args = {
    type: 'scatter',
    style: {height: '275px'},
    option: {
        series: [{data: [
            [10.0, 8.04],
            [8.07, 6.95],
            [13.0, 7.58],
            [9.05, 8.81],
            [11.0, 8.33],
            [14.0, 7.66],
            [13.4, 6.81],
            [10.0, 6.33],
            [14.0, 8.96],
            [12.5, 6.82],
            [9.15, 7.2],
            [11.5, 7.2],
            [3.03, 4.23],
            [12.2, 7.83],
            [2.02, 4.47],
            [1.05, 3.33],
            [4.05, 4.96],
            [6.03, 7.24],
            [12.0, 6.26],
            [12.0, 8.84],
            [7.08, 5.82],
            [5.02, 5.68]
        ]}],
        title: {text: 'Scatter Chart'}
    }
}

export const PieChart = ChartsTemplate.bind({})
PieChart.args = {
    type: 'pie',
    style: {height: '400px'},
    option: {
        series: [{data: [
            { value: 11048, name: 'Mon' },
            { value: 5735, name: 'Tue' },
            { value: 3580, name: 'Wed' },
            { value: 7484, name: 'Thu' },
            { value: 1484, name: 'Fri' },
            { value: 8484, name: 'Sat' },
            { value: 1000, name: 'Sun' }
        ]}],
        title: {text: 'Pie Chart'}
    }
}

export const StackedAreaChart = ChartsTemplate.bind({})
StackedAreaChart.args = {
    type: 'stackedAreaChart',
    style: {height: '425px'},
    option: {
        series: [
            { name: 'Email', data: [120, 132, 101, 134, 90, 230, 210]},
            { name: 'Union Ads', data: [220, 182, 191, 234, 290, 330, 310]},
            { name: 'Video Ads', data: [150, 232, 201, 154, 190, 330, 410]},
            { name: 'Direct', data: [320, 332, 301, 334, 390, 330, 320]},
            { name: 'Search Engine', label: { show: true, position: 'top'}, data: [820, 932, 901, 934, 1290, 1330, 1320]}
        ],
        title: {text: 'Stacked Area Chart'},
        legend: { 
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        xAxis: {data:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
    }
}

export const StackedBarChart = ChartsTemplate.bind({})
StackedBarChart.args = {
    type: 'stackedBarChart',
    style: {height: '400px'},
    option: {
        series: [
            { name: 'Direct', data: [320, 302, 301, 334, 390, 330, 320] },
            { name: 'Mail Ad', data: [120, 132, 101, 134, 90, 230, 210] },
            { name: 'Affiliate Ad', data: [220, 182, 191, 234, 290, 330, 310] },
            { name: 'Video Ad', data: [150, 212, 201, 154, 190, 330, 410] },
            { name: 'Search Engine', data: [820, 832, 901, 934, 1290, 1330, 1320] }
        ],
        title: {text: 'Stacked Bar Chart'},
        yAxis: {data:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
    }
}

export const StackedColumnChart = ChartsTemplate.bind({})
StackedColumnChart.args = {
    type: 'stackedColumnChart',
    style: {height: '425px'},
    option: {
        series: [
            { name: 'Direct', data: [320, 332, 301, 334, 390, 330, 320] },
            { name: 'Email', stack: 'Ad', data: [120, 132, 101, 134, 90, 230, 210] },
            { name: 'Union Ads', stack: 'Ad', data: [220, 182, 191, 234, 290, 330, 310] },
            { name: 'Video Ads', stack: 'Ad', data: [150, 232, 201, 154, 190, 330, 410] },
            { name: 'Search Engine', data: [862, 1018, 964, 1026, 1679, 1600, 1570], markLine: {
                lineStyle: {
                    type: 'dashed'
                },
                data: [[{ type: 'min' }, { type: 'max' }]]
            }},
            { name: 'Baidu', barWidth: 5, stack: 'Search Engine', data: [620, 732, 701, 734, 1090, 1130, 1120] },
            { name: 'Google', stack: 'Search Engine', data: [120, 132, 101, 134, 290, 230, 220] },
            { name: 'Bing', stack: 'Search Engine', data: [60, 72, 71, 74, 190, 130, 110] },
            { name: 'Others', stack: 'Search Engine', data: [62, 82, 91, 84, 109, 110, 120] }
        ],
        title: {text: 'Stacked Column Chart'},
        xAxis: {data:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
    }
}