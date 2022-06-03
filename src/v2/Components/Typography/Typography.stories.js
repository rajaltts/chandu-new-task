import React from 'react'
import Typography from './Typography'

export default {
    title: 'Miscellaneous/Typography',
    component: Typography,
}
const TypographyTemplate = ({ label, ...args }) => {
    return <Typography {...args}>{label}</Typography>
}

export const Default = TypographyTemplate.bind({})
Default.args = {
    bold: false,
    uppercase: false,
    label: 'Content',
    variant: 'body1',
}
