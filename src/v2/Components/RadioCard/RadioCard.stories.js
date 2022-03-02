import React from 'react'
import RadioCard from './RadioCard'

export default {
    title: 'Radio card',
    component: RadioCard,
}

const RadioCardTemplate = ({ ...args }) => {
    return <RadioCard {...args} />
}

export const Default = RadioCardTemplate.bind({})
Default.args = {
    label: 'RadioCard Example',
    selected: false,
    feasible: true,
    relaxed: false,
    children: 'Default content',
    mediaCardProps: {
        direction: 'column',
        selected: false,
        error: false,
        disabled: false,
        imgProps: {
            src: 'https://stecatbuildersdev.blob.core.windows.net/rooftopbuilder/assemblies/2D/C0.png',
            width: 300
        }
    }
}

export const SelectedRelaxed = RadioCardTemplate.bind({})
SelectedRelaxed.args = {
    ...Default.args,
    selected: true,
    feasible: false,
    tooltipTitleUnfeasible: 'Invalid selection'
}

