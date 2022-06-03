import React, { useState } from 'react'
import InputRadioCardList from './InputRadioCardList'

export default {
    title: 'InputComponent/Input radio card list',
    component: InputRadioCardList,
    argTypes: {
        name: {
            table: {
                disable: true,
            },
        },
        handleChange: {
            table: {
                disable: true,
            },
        },
    },
}

const valuesWithImgAndDescr = [
    {
        value: 'C0',
        label: 'C0',
        secondaryLabel: 'Standard',
        description: '',
        media: 'C0.png',
        feasible: true,
        enable: true,
    },
    {
        value: 'CS',
        label: 'CS',
        secondaryLabel: 'Cross flow with 2 dampers',
        description: '',
        media: 'CS.png',
        feasible: true,
        enable: true,
    },
    {
        value: 'CF',
        label: 'CF',
        secondaryLabel: 'Cross flow with 100% fresh air',
        description: '',
        media: 'CF.png',
        feasible: true,
        enable: true,
    },
    {
        value: 'CK',
        label: 'CK',
        secondaryLabel: 'Cross flow with 3 dampers',
        description: '',
        media: 'CK.png',
        feasible: true,
        enable: true,
    },
    {
        value: 'CA',
        label: 'CA',
        secondaryLabel: 'Cross flow with axial return fan',
        description: '',
        media: 'CA.png',
        feasible: true,
        enable: true,
    },
    {
        value: 'CP',
        label: 'CP',
        secondaryLabel: 'Cross flow with lower return plug-fan',
        description: '',
        media: 'CP.png',
        feasible: true,
        enable: true,
    },
]

const InputRadioCardListTemplate = ({ value, ...args }) => {
    const [selectedValue, setSelectedValue] = useState(value)

    return <InputRadioCardList value={selectedValue} handleChange={(e) => setSelectedValue(e)} {...args} />
}

export const CardsWithImagesAndDescr = InputRadioCardListTemplate.bind({})
CardsWithImagesAndDescr.args = {
    hasMedia: true,
    mediaPrefix: 'https://stecatbuildersdev.blob.core.windows.net/rooftopbuilder/assemblies/2D/',
    name: 'Sel_sAssembly',
    values: valuesWithImgAndDescr,
    value: 'C0',
}

export const CardsWithLabelOnly = InputRadioCardListTemplate.bind({})
CardsWithLabelOnly.args = {
    name: 'Sel_sHeatingBackup',
    values: [
        {
            value: 'Electrical heater',
            label: 'Electrical heater',
            secondaryLabel: '',
            feasible: true,
            enable: true,
        },
        {
            value: 'Hot water coil',
            label: 'Hot water coil',
            secondaryLabel: '',
            feasible: true,
            enable: true,
        },
        {
            value: 'Gas burner',
            label: 'Gas burner',
            secondaryLabel: '',
            feasible: true,
            enable: true,
        },
    ],
    value: 'Electrical heater',
}

export const Loading = InputRadioCardListTemplate.bind({})
Loading.args = {
    loading: true,
    hasMedia: true,
    mediaPrefix: 'https://stecatbuildersdev.blob.core.windows.net/rooftopbuilder/assemblies/2D/',
    name: 'Sel_sAssembly',
    values: valuesWithImgAndDescr,
    value: 'C0',
}

export const Relaxed = InputRadioCardListTemplate.bind({})
Relaxed.args = {
    relaxed: true,
    hasMedia: true,
    mediaPrefix: 'https://stecatbuildersdev.blob.core.windows.net/rooftopbuilder/assemblies/2D/',
    name: 'Sel_sAssembly',
    values: valuesWithImgAndDescr,
    value: 'C0',
}
