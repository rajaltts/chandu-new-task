import React from 'react'
import ReportImage from './ReportImage'

export default {
    title: 'Report Image',
    component: ReportImage
}

const ReportImageTemplate = ({ ...args }) => {
    return <ReportImage {...args} />
}

export const Basic = ReportImageTemplate.bind({})
export const RandomImage = ReportImageTemplate.bind({})
RandomImage.args = {
    customImageProps: {src: 'https://stecatbuildersdev.blob.core.windows.net/ecatui/ecatimages/30KAV.webp'},
    label: 'random image'
}
