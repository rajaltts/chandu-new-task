import React from 'react'
import HyperLinks from './HyperLinks'

export default {
    title: 'HyperLinks',
    component: HyperLinks,
    argTypes: {
        type: {
            options: ['link', 'word', 'pdf'],
            control: { type: 'select' }
        }
    }
}

const HyperLinksTemplate = ({ ...args }) => {
    return <HyperLinks {...args} />
}

export const HyperLinksComponent = HyperLinksTemplate.bind({})
HyperLinksComponent.args = {
    preText: 'I am preText',
    postText: 'I am postText',
    type: 'link',
    value: 'Click on me',
    href: 'https://google.com/',
    style: {
    }
}