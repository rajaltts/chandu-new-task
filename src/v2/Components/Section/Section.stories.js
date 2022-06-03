import React from 'react'

import Section from './Section'

import Typography from '../Typography/Typography'

export default {
    title: 'Layout/Section',
    component: Section,
    argTypes: {
        visible: {
            defaultValue: true,
        },
        divider: {
            defaultValue: true,
        },
    },
}

const SectionTemplate = ({ ...args }) => {
    return (
        <Section {...args}>
            <Typography>{'Section children'}</Typography>
        </Section>
    )
}

export const Default = SectionTemplate.bind({})

Default.args = {
    title: 'Default Section',
}

export const WithoutDivider = SectionTemplate.bind({})

WithoutDivider.args = {
    divider: false,
    title: 'Section without divider',
}

export const WithTypographyProps = SectionTemplate.bind({})

WithTypographyProps.args = {
    divider: true,
    title: 'Section with typography props',
    typographyProps: {
        align: 'center',
        color: 'secondary',
        variant: 'h3',
    },
}
