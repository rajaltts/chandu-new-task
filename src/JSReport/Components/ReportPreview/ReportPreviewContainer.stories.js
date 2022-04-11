import React from 'react'
import ReportPreviewContainer from './ReportPreviewContainer';
//import Page from '../page/Page'

export default {
    title: 'Report Preview Container',
    component: ReportPreviewContainer,
    argTypes: {
        cleanup: {
            control: { 
                type: 'function'
            }
        }
    }
}

const ReportPreviewContainerTemplate = ({ ...args }) => {
    return (
        <ReportPreviewContainer {...args}/>
    )
}
export const Basic = ReportPreviewContainerTemplate.bind({})
Basic.args = {
    isOpen: true,
    intl: {},
    reportConfig: { 
        key: 'CustomerReport',
        options: {
            fileName: 'CustomerReport'
        }
    },
    children: <>This is Js Report</>,//React.createElement('div',{}),
    loading: false,
    reportDownloadable: true,
    cleanup: function test() {},
    jsReportApi: 'https://apim-carrier-qa.azure-api.net/'
}
