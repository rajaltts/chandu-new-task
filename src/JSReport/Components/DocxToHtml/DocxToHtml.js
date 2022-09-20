import React, { useRef, useEffect } from 'react'
import mammoth from 'mammoth'
import { getExternalFileContentAsBlob, ApiService, endPoints } from '@carrier/workflowui-globalfunctions'
import withExtraProps from '../../../HOC/withExtraProps'

const DocxToHtml = ({ containerName = '', filePath = '', baseApi = {} }) => {
    const { eCatAppService, sapService } = baseApi
    const ref = useRef()

    const checkforFileType = (allowedFileType = []) => {
        return (
            filePath &&
            typeof filePath === 'string' &&
            allowedFileType.includes(filePath.slice(((filePath.lastIndexOf('.') - 1) >>> 0) + 2)) &&
            containerName
        )
    }

    const convertDocx = async () => {
        try {
            if (checkforFileType(['docx'])) {
                const response = await getExternalFileContentAsBlob({
                    eCatAppService,
                    containerName,
                    filePath,
                    blobType: 'application/msword',
                })
                if (response) {
                    const fileReader = new FileReader()
                    fileReader.onload = (event) => {
                        mammoth
                            .convertToHtml({ arrayBuffer: event.target.result })
                            .then((result) => {
                                ref.current.innerHTML = result.value
                            })
                            .catch(() => {
                                ref.current.innerHTML = ''
                            })
                            .done()
                    }
                    fileReader.readAsArrayBuffer(response)
                }
            } else if (checkforFileType(['htm', 'html'])) {
                const url = `${sapService}${endPoints.GET_HTMDOCUMENT_CONTENT_MS}?container=${containerName}&fileName=${filePath}`
                const { data } = await ApiService(url, null, null, null)
                ref.current.innerHTML = data
            }
        } catch (error) {
            ref.current.innerHTML = ''
        }
    }

    useEffect(() => {
        convertDocx()
    }, [])

    return <div ref={ref} />
}

export default withExtraProps(DocxToHtml)
