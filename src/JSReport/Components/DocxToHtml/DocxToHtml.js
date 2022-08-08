import React, { useRef, useEffect } from 'react'
import mammoth from 'mammoth'
import { getExternalFileContentAsBlob } from '@carrier/workflowui-globalfunctions'

const DocxToHtml = ({ apiUrl = '', containerName = '', filePath = '' }) => {
    const ref = useRef()

    const checkforFileType = (allowedFileType = []) => {
        return (
            filePath &&
            typeof filePath === 'string' &&
            allowedFileType.includes(filePath.slice(((filePath.lastIndexOf('.') - 1) >>> 0) + 2)) &&
            containerName &&
            apiUrl
        )
    }

    const convertDocx = async () => {
        try {
            if (checkforFileType(['docx'])) {
                const response = await getExternalFileContentAsBlob({
                    apiUrl,
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
                const response = await fetch(`${apiUrl}${containerName}/${filePath}`)
                const text = await response.text()
                ref.current.innerHTML = text
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

export default DocxToHtml
