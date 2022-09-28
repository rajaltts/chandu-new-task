import React from 'react'
import ReportTable from './ReportTable'

export default {
    title: 'Report/Report Table',
    component: ReportTable,
}

const performanceData = [
    [
        {
            primaryText: {
                value: 'Mode',
            },
            headerType: 'h6',
        },
        {
            primaryText: {
                value: 'Cooling',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
            headerType: 'h6',
        },
    ],
    [
        {
            primaryText: {
                value: 'Cooling Capacity',
                supValue: '(1)',
                headerType: 'h5',
            },
            secondaryText: {
                value: 'KW',
            },
            positionType: 'left',
        },
        {
            primaryText: {
                value: '806',
                headerType: 'h5',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Cooling Efficiency (EER)',
                supValue: '(1)',
            },
            secondaryText: {
                value: 'kW/kW',
            },
        },
        {
            primaryText: {
                value: '',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
            hideLoader: true,
        },
    ],
    [
        {
            primaryText: {
                value: 'Unit Power Input ',
                supValue: '(1)',
            },
            secondaryText: {
                value: 'kW',
            },
        },
        {
            primaryText: {
                value: '',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Sound power level (LwA)',
                supValue: '(1)',
            },
            secondaryText: {
                value: 'dB(A)',
            },
        },
        {
            primaryText: {
                value: '98.0',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Sound Pressure Level at 10.0m (LpA) ',
                supValue: '(1)',
            },
            secondaryText: {
                value: 'dB(A)',
            },
        },
        {
            primaryText: {
                value: '65.5',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Minimum Capacity',
                supValue: '(2)',
            },
            secondaryText: {
                value: 'kW',
            },
        },
        {
            primaryText: {
                value: '81.2',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
        },
    ],
]

const listInformationData = [
    [
        {
            primaryText: {
                value: 'Compressor',
            },
            bgType: 'bgSeaBlue',
            colSpan: 2,
            headerType: 'h5',
        },
    ],
    [
        {
            primaryText: {
                value: 'Size',
            },
            bgType: 'bgWhite',
        },
        {
            primaryText: {
                value: '452',
            },
            bgType: 'bgWhite',
            positionType: 'right',
        },
    ],
    [
        {
            primaryText: {
                value: 'Weights',
            },
            bgType: 'bgSeaBlue',
            colSpan: 2,
            headerType: 'h6',
        },
    ],
    [
        {
            primaryText: {
                value: 'Total Rigging Weight',
            },
            bgType: 'bgWhite',
        },
        {
            primaryText: {
                value: '31390 lb',
            },
            bgType: 'bgWhite',
            positionType: 'right',
        },
    ],
    [
        {
            primaryText: {
                value: 'Total Operating Weight',
            },
            bgType: 'bgWhite',
        },
        {
            primaryText: {
                value: '36224 lb',
            },
            bgType: 'bgWhite',
            positionType: 'right',
        },
    ],
    [
        {
            primaryText: {
                value: 'Refrigerant Weight',
            },
            bgType: 'bgWhite',
        },
        {
            primaryText: {
                value: '1447 lb',
            },
            bgType: 'bgWhite',
            positionType: 'right',
        },
    ],
    [
        {
            primaryText: {
                value: 'Motor & Motor Controller',
            },
            bgType: 'bgSeaBlue',
            colSpan: 2,
            headerType: 'h6',
        },
    ],
    [
        {
            primaryText: {
                value: 'Size',
            },
            bgType: 'bgWhite',
        },
        {
            primaryText: {
                value: 'NBH',
            },
            bgType: 'bgWhite',
            positionType: 'right',
        },
    ],
    [
        {
            primaryText: {
                value: 'Line Voltage-Phase-Hertz',
            },
            bgType: 'bgWhite',
        },
        {
            primaryText: {
                value: '460(V)-3-60(Hz)',
            },
            bgType: 'bgWhite',
            positionType: 'right',
        },
    ],
    [
        {
            primaryText: {
                value: 'VFD Code',
            },
            bgType: 'bgWhite',
        },
        {
            primaryText: {
                value: '5',
            },
            bgType: 'bgWhite',
            positionType: 'right',
        },
    ],
    [
        {
            primaryText: {
                value: 'VFD Size',
            },
            bgType: 'bgWhite',
        },
        {
            primaryText: {
                value: '5',
            },
            bgType: 'bgWhite',
            positionType: 'right',
        },
    ],
    [
        {
            primaryText: {
                value: 'VFD Lug Size',
            },
            bgType: 'bgWhite',
        },
        {
            primaryText: {
                value: '4x4 / 0 - 500 kcmil ABB KT7X1200 - 3',
            },
            bgType: 'bgWhite',
            positionType: 'right',
        },
    ],
]

const loadLineData = [
    [
        {
            primaryText: {
                value: 'Unit Performance',
            },
            colSpan: 5,
            headerType: 'h6',
        },
    ],
    [
        {
            primaryText: {
                value: 'Percent of max capacity',
            },
            secondaryText: {
                value: '%',
            },
            positionType: 'left',
            style: { width: '35%' },
        },
        {
            primaryText: {
                value: 'Max',
            },
            bgType: 'bgWhite',
            positionType: 'center',
            style: { fontStyle: 'italic' },
        },
        {
            primaryText: {
                value: '90.0',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '80.0',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '70.0',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Cooling Capacity',
            },
            secondaryText: {
                value: 'kW',
            },
            positionType: 'left',
        },
        {
            primaryText: {
                value: '806',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '726',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '645',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '564',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Percent of full load power',
            },
            secondaryText: {
                value: '%',
            },
            positionType: 'left',
        },
        {
            primaryText: {
                value: '100.0',
            },
            bgType: 'bgWhite',
            positionType: 'center',
            style: { fontStyle: 'italic' },
        },
        {
            primaryText: {
                value: '86.0',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '73.2',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '61.7',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Evaporator Data',
            },
            colSpan: 5,
            bgType: 'bgLightBlue',
            headerType: 'h6',
        },
    ],
    [
        {
            primaryText: {
                value: 'Fluid Entering Temperature',
            },
            secondaryText: {
                value: '°C',
            },
            positionType: 'left',
        },
        {
            primaryText: {
                value: '12.0',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '11.5',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '10.0',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '10.5',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Fluid Leaving Temperature',
            },
            secondaryText: {
                value: '°C',
            },
            positionType: 'left',
        },
        {
            primaryText: {
                value: '7.0',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
            style: { fontStyle: 'italic' },
        },
        {
            primaryText: {
                value: '7.0',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '7.0',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '7.0',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Total Pressure Drop',
            },
            secondaryText: {
                value: 'kPa',
            },
            positionType: 'left',
        },
        {
            primaryText: {
                value: '34.9',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
            style: { fontStyle: 'italic' },
        },
        {
            primaryText: {
                value: '35.0',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '35.0',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Condenser Data',
            },
            defaultPrimaryText: 'true',
            colSpan: 5,
            bgType: 'bgLightRed',
            headerType: 'h6',
        },
    ],
    [
        {
            primaryText: {
                value: 'Entering Air Temperature',
            },
            secondaryText: {
                value: '°C',
            },
            positionType: 'left',
        },
        {
            primaryText: {
                value: '35.0',
            },
            bgType: 'bgLightRed',
            positionType: 'center',
            style: { fontStyle: 'italic' },
        },
        {
            primaryText: {
                value: '',
            },
            bgType: 'bgLightRed',
            positionType: 'center',
            hideLoader: true,
        },
        {
            primaryText: {
                value: '35.0',
            },
            bgType: 'bgLightRed',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '35.0',
            },
            bgType: 'bgLightRed',
            positionType: 'center',
        },
    ],
]

const TwoLine = () => {
    const firstLine = `<Component/> display on`
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>{firstLine}</span>
            <span>two lines</span>
        </div>
    )
}
const operatingConditionsData = [
    [
        {
            primaryText: {
                value: 'System element',
            },
            style: { fontWeight: '700' },
            colSpan: 2,
            headerType: 'h6',
        },
        {
            primaryText: {
                value: 'Cooling',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
            headerType: 'h6',
            style: { width: '45%' },
        },
    ],
    [
        {
            component: TwoLine,
            colSpan: 2,
            headerType: 'h6',
        },
        {
            bgType: 'bgLightBlue',
        },
    ],
    [
        {
            primaryText: {
                value: 'Fluid',
                style: { transform: 'rotate(268deg)' },
            },
            rowSpan: 7,
            positionType: 'center',
            style: { width: '10%' },
        },
    ],
    [
        {
            primaryText: {
                value: 'Fluid Type',
            },
        },
        {
            primaryText: {
                value: 'Fresh Water',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
            headerType: 'h6',
        },
    ],
    [
        {
            primaryText: {
                value: 'Fouling Factor',
            },
            secondaryText: {
                value: '(sqm-K)/kW',
            },
        },
        {
            primaryText: {
                value: '0',
            },
            positionType: 'center',
            bgType: 'bgLightBlue',
        },
    ],
    [
        {
            primaryText: {
                value: 'Leaving Temperature',
            },
            secondaryText: {
                value: '°C',
            },
        },
        {
            primaryText: {
                value: '7.0',
            },
            positionType: 'center',
            bgType: 'bgLightBlue',
        },
    ],
    [
        {
            primaryText: {
                value: 'Entering Temperature',
            },
            secondaryText: {
                value: '°C',
            },
        },
        {
            primaryText: {
                value: '12.0',
            },
            positionType: 'center',
            bgType: 'bgLightBlue',
        },
    ],
    [
        {
            primaryText: {
                value: 'Fluid Flow',
            },
            secondaryText: {
                value: 'l/s',
            },
        },
        {
            primaryText: {
                value: '38.5',
            },
            positionType: 'center',
            bgType: 'bgLightBlue',
        },
    ],
    [
        {
            primaryText: {
                value: 'Total Pressure Drop',
            },
            secondaryText: {
                value: 'kPa',
            },
        },
        {
            primaryText: {
                value: '34.9',
            },
            positionType: 'center',
            bgType: 'bgLightBlue',
        },
    ],
    [
        {
            primaryText: {
                value: 'Air heat exchanger',
            },
            colSpan: 2,
            headerType: 'h6',
        },
        {
            bgType: 'bgLightBlue',
        },
    ],
    [
        {
            primaryText: {
                value: 'Air',
                style: { transform: 'rotate(268deg)' },
            },
            rowSpan: 2,
            positionType: 'center',
            style: { width: '10%' },
        },
    ],
    [
        {
            primaryText: {
                value: 'Entering Air Temperature',
            },
            secondaryText: {
                value: '°C',
            },
        },
        {
            primaryText: {
                value: '35.0',
            },
            bgType: 'bgLightBlue',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Altitude',
            },
            secondaryText: {
                value: 'm',
            },
            colSpan: 2,
        },
        {
            primaryText: {
                value: '0',
            },
            positionType: 'center',
            bgType: 'bgLightBlue',
        },
    ],
]

const unitInformationData = [
    [
        {
            primaryText: {
                value: 'Manufacturing Source',
            },
        },
        {
            primaryText: {
                value: 'Montluel',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Refrigerant type',
            },
            positionType: 'left',
        },
        {
            primaryText: {
                value: 'R134a',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Refrigerant Weight',
            },
            secondaryText: {
                value: 'kg',
            },
        },
        {
            primaryText: {
                value: '152',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Tonnes CO2 Equivalent ',
            },
            secondaryText: {
                value: 'Tonnes',
            },
        },
        {
            primaryText: {
                value: '0.000912',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Number of Passes (Evaporator)',
            },
        },
        {
            primaryText: {
                value: '2',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Number of Refrigerant Circuit ',
            },
        },
        {
            primaryText: {
                value: '2',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Fan Power Input',
            },
            secondaryText: {
                value: 'kW',
            },
        },
        {
            primaryText: {
                value: '17.2',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Operating / Shipping Weight',
            },
            secondaryText: {
                value: 'kg',
            },
        },
        {
            primaryText: {
                value: '6085/6021',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Unit Dimensions (LxWxH)',
            },
            secondaryText: {
                value: 'mm',
            },
        },
        {
            primaryText: {
                value: '6772x2262x2324',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
    ],
]

const acousticInformationData = [
    [
        {
            primaryText: {
                value: 'OctaveBandCenterFrequency',
            },
            secondaryText: {
                value: 'Hz',
            },
            headerType: 'h6',
        },
        {
            primaryText: {
                value: '125',
            },
            headerType: 'h6',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '250',
            },
            headerType: 'h6',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '500',
            },
            headerType: 'h6',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '1k',
            },
            headerType: 'h6',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '2k',
            },
            headerType: 'h6',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '4k',
            },
            headerType: 'h6',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '8k',
            },
            headerType: 'h6',
            positionType: 'center',
        },
        {
            primaryText: {
                value: 'Total',
            },
            headerType: 'h6',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Full Load',
            },
            positionType: 'center',
            colSpan: 9,
        },
    ],
    [
        {
            primaryText: {
                value: 'Sound Power at Chiller Acoustic Center',
            },
            secondaryText: {
                value: 'dB',
            },
            style: { width: '37%' },
        },
        {
            primaryText: {
                value: '89.0',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '93.0',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '97.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '90.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '91.0',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '84.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '79.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '100.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Sound Power at Chiller Acoustic Center',
            },
            secondaryText: {
                value: 'dB',
            },
        },
        {
            primaryText: {
                value: '89.0',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '93.0',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '97.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '90.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '91.0',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '84.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '79.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '100.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Sound Power at Chiller Acoustic Center',
            },
            secondaryText: {
                value: 'dB',
            },
        },
        {
            primaryText: {
                value: '89.0',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '93.0',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '97.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '90.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '91.0',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '84.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '79.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '100.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Part Load = 90% compressors load',
            },
            colSpan: 9,
            positionType: 'center',
        },
    ],
    [
        {
            primaryText: {
                value: 'Sound Power at Chiller Acoustic Center',
            },
            secondaryText: {
                value: 'dB',
            },
        },
        {
            primaryText: {
                value: '89.0',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '93.0',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '97.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '90.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '91.0',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '84.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '79.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
        {
            primaryText: {
                value: '100.5',
            },
            bgType: 'bgWhite',
            positionType: 'center',
        },
    ],
]

const ReportTableTemplate = ({ ...args }) => {
    return <ReportTable {...args} />
}

export const PerformanceData = ReportTableTemplate.bind({})
PerformanceData.args = {
    TableData: performanceData,
    titleInformation: { title: 'Title Information' },
}

export const OperatingConditions = ReportTableTemplate.bind({})
OperatingConditions.args = {
    TableData: operatingConditionsData,
    titleInformation: { title: 'Operating Conditions' },
}

export const SeasonalEfficiency = ReportTableTemplate.bind({})
SeasonalEfficiency.args = {
    titleInformation: {
        title: 'Seasonal Efficiency(3)',
        bgType: 'tableTitle',
    },
}

export const UnitInformation = ReportTableTemplate.bind({})
UnitInformation.args = {
    TableData: unitInformationData,
    titleInformation: {
        title: 'Unit Information',
        bgType: 'tableTitle',
    },
}

export const LoadLineData = ReportTableTemplate.bind({})
LoadLineData.args = {
    TableData: loadLineData,
    titleInformation: {
        title: 'Load Line',
    },
}

export const LoadLineDataCiat = ReportTableTemplate.bind({})
LoadLineDataCiat.args = {
    TableData: loadLineData,
    titleInformation: {
        title: 'Load Line (Ciat)',
        style: { background: 'linear-gradient(353deg, #5e5e5e 0%, #8b8b8b 45%, #7a7a7a 100%)' },
    },
}

export const AcousticInformationData = ReportTableTemplate.bind({})
AcousticInformationData.args = {
    TableData: acousticInformationData,
    titleInformation: {
        title: 'Acoustic Information',
    },
}

export const ListInformationData = ReportTableTemplate.bind({})
ListInformationData.args = {
    TableData: listInformationData,
}
