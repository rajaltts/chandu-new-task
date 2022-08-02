import React, { useState } from 'react'
import Page from '../ReportPage/Page'
import ReportPreviewContainer from '../ReportPreview/ReportPreviewContainer'

export default {
    title: 'Report/PageOverflow',
    component: Page,
}

const PageContent = ({ pageElementCount, marginBottom, height, ...args }) => {
    const pageContent = []

    for (let i = 0; i < pageElementCount; i++) {
        pageContent.push(
            <div
                key={i}
                style={{
                    marginBottom,
                    height,
                    width: '100%',
                    backgroundColor: i % 2 === 0 ? 'LightSteelBlue' : 'PowderBlue',
                }}>
                {i + 1}.
            </div>
        )
    }

    return <Page {...args}>{pageContent}</Page>
}

const PageOverflowTemplate = ({ ...args }) => {
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

export const PageOverflowSample = PageOverflowTemplate.bind({})
PageOverflowSample.args = {
    pageElementCount: 7,
    height: 128,
    marginBottom: 16,
    checkForOverflow: true,
    hideHeader: false,
    hideFooter: false,
}
