import React, { useEffect } from 'react'
import { ReportPreviewContainer } from './ReportPreviewContainer'
import Page from '../ReportPage/Page'

export default {
    title: 'Report/Report Preview Container',
    component: ReportPreviewContainer,
    argTypes: {
        cleanup: {
            control: {
                type: 'function',
            },
        },
    },
}

const page1 = {
    title: 'Customer Report',
    fullName: 'Customer Report',
    footNotes: {
        descriptions: [
            `Carrier participates in the ECP program for Rooftop.`,
            'The selected unit with selected options is outside of the scope of certification programme for Rooftop (RT) but is rated in accordance with Technical Certification Rules for RT.',
            `Check ongoing validity of certificate: www.eurovent-certification.com`,
        ],
        descriptionsStyle: { marginLeft: 10 },
        image: 'https://stecatbuildersdev.blob.core.windows.net/ecatui/ecatimages/EuroventLogo1.webp',
    },
    builderInfo: `Test Builder V1.0.0 (date: ${new Date().toLocaleDateString()})`,
}

const page2 = {
    title: 'Customer Report',
    model: 'AQUACIAT^POWER^ LD 0602R',
    modelBrandLogo: 'https://stecatbuildersdev.blob.core.windows.net/ecatui/ecatimages/ciat.webp', //getImgPath('ciat.webp', api),
    fullName: 'Customer Report',
    footNotes: { descriptions: ['Engineering Selection'] },
    builderInfo: `Test Builder V1.0.0 (date: ${new Date().toLocaleDateString()})`,
    modelBrand: 'ciat',
    projectNameLabel: 'Project Name',
    projectName: 'Test 123',
    tagNameLabel: 'Tag Name',
    tagName: 'Test',
}

const PageContent = ({ updateList }) => {
    useEffect(() => {
        updateList([1, 2])
    }, [])
    return (
        <>
            <Page {...page1} />
            <Page {...page2} />
        </>
    )
}

const ReportPreviewContainerTemplate = ({ ...args }) => {
    return (
        <ReportPreviewContainer {...args}>
            <PageContent {...args} />
        </ReportPreviewContainer>
    )
}
export const Basic = ReportPreviewContainerTemplate.bind({})
Basic.args = {
    isOpen: true,
    intl: {},
    reportConfig: {
        key: 'CustomerReport',
        options: {
            fileName: 'CustomerReport',
        },
    },
    children: <>This is Js Report</>, //React.createElement('div',{}),
    loading: false,
    reportDownloadable: true,
    cleanup: function test() {},
    hideFooterPageInfo: false,
    jsReportApi: 'https://apim-carrier-qa.azure-api.net/',
}

export const ZoomIn = ReportPreviewContainerTemplate.bind({})
ZoomIn.args = {
    isOpen: true,
    intl: {},
    reportConfig: {
        key: 'CustomerReport',
        options: {
            fileName: 'CustomerReport',
        },
    },
    zoomIn: true,
    children: <>This is Js Report</>, //React.createElement('div',{}),
    loading: false,
    reportDownloadable: true,
    cleanup: function test() {},
    hideFooterPageInfo: false,
    jsReportApi: 'https://apim-carrier-qa.azure-api.net/',
}
