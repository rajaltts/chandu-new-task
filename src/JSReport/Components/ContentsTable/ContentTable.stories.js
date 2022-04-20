import React from 'react'
import ContentTable from './ContentTable'

export default {
    title: 'Contents Table',
    component: ContentTable,
}

const labelStyle = {
    fontWeight: 'bold',
    color: 'blue',
}

const valueStyle = {
    fontSize: '15px',
    color: 'red',
}

const container = {
    width: '400px',
}

const olList = {
    width: '200px',
}

const liList = {
    color: 'green',
}

const shippingDimensions = [
    { label: 'Unit Length', value: "13' 9''" },
    { label: 'Unit Width', value: "7' 10''" },
    { label: 'Unit Height', value: "6' 1''" },
    { label: '', value: '' },
    { label: 'Unit Operating Weight', value: '4145 lb' },
    { label: 'Unit Shipping Weight', value: '4182 lb' },
]

const shippingDimNotes = [
    '***Weights and dimensions are approximate. Weight does not include curbs and accessories. Approximate dimensions are provided primarily for shipping purposes. For exact dimensions refer to certified drawings',
    '**Shipping Weight does not include extended leadtime options',
]

const ContentsTableTemplate = ({ ...args }) => {
    return <ContentTable {...args} />
}

export const DefaultWithNoProps = ContentsTableTemplate.bind({})
export const ContentTableWithNotes = ContentsTableTemplate.bind({})
ContentTableWithNotes.args = {
    content: shippingDimensions,
    header: 'Shipping Dimensions',
    notes: shippingDimNotes,
}

export const ContentTableStyleControlled = ContentsTableTemplate.bind({})
ContentTableStyleControlled.args = {
    content: shippingDimensions,
    header: 'Shipping Dimensions',
    notes: shippingDimNotes,
    notesType: 'numeric',
    classes: {
        labelStyle: labelStyle,
        valueStyle: valueStyle,
        container: container,
        olList: olList,
        liList: liList,
    },
}
