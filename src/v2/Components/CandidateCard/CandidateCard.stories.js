import React from 'react'
import CandidateCard from './CandidateCard'

export default {
    title: 'Layout/CandidateCard',
    component: CandidateCard,
}

const CandidateCardTemplate = ({ ...args }) => {
    return <CandidateCard {...args} />
}

export const Basic = CandidateCardTemplate.bind({})
Basic.args = {
    index: 0,
    details: [
        { label: '42NH', typographyLabelProps: { bold: true } },
        { label: 'Speed', value: 8, unit: 'V' },
        {
            label: 'Cooling capacity',
            isCooling: true,
            value: 4.3,
            unit: 'kW',
        },
        {
            label: 'Heating capacity',
            isCooling: true,
            value: 6.3,
            unit: 'kW',
        },
    ],
    openPopupCallback: () => alert('You can use this callback'),
}
