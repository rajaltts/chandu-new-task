import React, { useState, useEffect } from 'react'
import Page from './Page'
import ReportPreviewContainer from '../ReportPreview/ReportPreviewContainer'

export default {
    title: 'Report/Page',
    component: Page,
}

const PageContent = ({ updateList, ...args }) => {
    useEffect(() => {
        updateList([1, 2])
    }, [])
    return (
        <>
            <Page {...args} />
            <Page {...args} />
        </>
    )
}

const PageTemplate = ({ ...args }) => {
    const [isOpen, setIsopen] = useState(true)
    const closeReportPreview = () => {
        setIsopen(!isOpen)
    }
    return (
        <ReportPreviewContainer
            isOpen={isOpen}
            intl={{}}
            reportConfig={{
                key: 'CustomerReport',
                options: {
                    fileName: 'CustomerReport',
                },
            }}
            loading={false}
            reportDownloadable
            jsReportApi='https://apim-carrier-qa.azure-api.net/'
            closeReportPreview={closeReportPreview}>
            <PageContent {...args} />
        </ReportPreviewContainer>
    )
}

export const CarrierPageComponent = PageTemplate.bind({})
CarrierPageComponent.args = {
    title: 'Customer Report',
    fullName: 'Customer Report',
    footNotes: { descriptions: ['Engineering Selection'] },
    builderInfo: `Test Builder V1.0.0 (date: ${new Date().toLocaleDateString()})`,
}

export const CiatPageComponent = PageTemplate.bind({})
CiatPageComponent.args = {
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
