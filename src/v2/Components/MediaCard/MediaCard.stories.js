import React from 'react'
import MediaCard from './MediaCard'

export default {
    title: 'Media card',
    component: MediaCard,
}

const MediaCardTemplate = ({ ...args }) => {
    return <MediaCard {...args} />
}

export const Default = MediaCardTemplate.bind({})

Default.args = {
    direction: 'row',
    selected: false,
    error: false,
    disabled: false,
    children: 'Default content'
}

export const WithImage = MediaCardTemplate.bind({});
WithImage.args = {
    ...Default.args,
    children: '',
    imgProps: {
        src: 'https://stecatbuildersdev.blob.core.windows.net/rooftopbuilder/assemblies/2D/C0.png',
        width: 300
    }
}

export const WithImageDisabled = MediaCardTemplate.bind({});
WithImageDisabled.args = {
    ...WithImage.args,
    disabled: true,
}


