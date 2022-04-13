import React, { useState } from 'react'
import RadioList from './RadioList'

const fct = (defaultProps) => ({
    ...defaultProps,
    gridProps: {
        xs: 6,
        md: 3,
    },
    radioCardProps: {
        ...defaultProps,
        mediaCardProps: {
            ...defaultProps.mediaCardProps,
            elevation: 3,
            direction: 'column',
            imgProps: { height: 120 },
        },
    },
})

export default {
    title: 'Radio list',
    component: RadioList,
}

const RadioListTemplate = ({ value, ...args }) => {
    const [selectedValue, setSelectedValue] = useState(value)
    return <RadioList {...args} value={selectedValue} onChange={setSelectedValue} />
}

export const Default = RadioListTemplate.bind({})
Default.args = {
    value: 1,
    values: [
        { value: 1, label: 'First', feasible: true },
        { value: 2, label: 'Second', feasible: true },
        { value: 3, label: 'Third', feasible: false },
        { value: 4, label: 'Fourth', feasible: true },
    ],
    defaultItemProps: fct,
    tooltipLabelUnfeasible: 'Invalid selection',
}

export const WithImage = RadioListTemplate.bind({})
WithImage.args = {
    ...Default.args,
    values: [
        {
            value: 1,
            name: 'y_model',
            label: 'Y Model',
            feasible: true,
            media: 'https://stecatbuildersdev.blob.core.windows.net/fancoilsbuilder/ymodel.svg',
        },
        {
            value: 2,
            name: 'i_model',
            label: 'I Model',
            feasible: false,
            media: 'https://stecatbuildersdev.blob.core.windows.net/fancoilsbuilder/imodel.svg',
        },
        {
            value: 3,
            name: 'u_model',
            label: 'U Model',
            feasible: true,
            media: 'https://stecatbuildersdev.blob.core.windows.net/fancoilsbuilder/imodel.svg',
        },
        {
            value: 4,
            name: 'h_model',
            label: 'H Model',
            feasible: true,
            media: 'https://stecatbuildersdev.blob.core.windows.net/fancoilsbuilder/hmodel.svg',
        },
    ],
}

export const WithImageLoading = RadioListTemplate.bind({})
WithImageLoading.args = {
    ...WithImage.args,
    loading: true,
}

export const WithImageRelaxed = RadioListTemplate.bind({})
WithImageRelaxed.args = {
    ...WithImage.args,
    relaxed: true,
}
