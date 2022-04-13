import React from 'react'
import ReportPreviewContainer from './ReportPreviewContainer'
//import Page from '../page/Page'

export default {
    title: 'Report Preview Container',
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
    footNotes: { descriptions: ['Engineering Selection'] },
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

const PageContent = ({ updateList, ...args }) => {
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
    return <ReportPreviewContainer {...args} />
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
    jsReportApi: 'https://apim-carrier-qa.azure-api.net/',
}
