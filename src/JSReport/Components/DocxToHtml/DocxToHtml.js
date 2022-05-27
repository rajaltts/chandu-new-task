import React, { useRef, useEffect } from 'react'
import mammoth from "mammoth";
import { getExternalFileContentAsBlob } from '@carrier/workflowui-globalfunctions'

const DocxToHtml = ({ apiUrl = "", containerName = "", filePath = "" }) => {
    const ref = useRef();

    const convertDocx = async () => {
        if (filePath && (typeof filePath === 'string') && filePath.slice((filePath.lastIndexOf(".") - 1 >>> 0) + 2) === "docx" && containerName && apiUrl) {
            try {
                const response = await getExternalFileContentAsBlob({ apiUrl, containerName, filePath, blobType: 'application/msword' })
                if (response) {
                    const fileReader = new FileReader();
                    fileReader.onload = (event) => {
                        mammoth.convertToHtml({ arrayBuffer: event.target.result })
                            .then((result) => {
                                ref.current.innerHTML = result.value;
                            })
                            .catch(error => {
                                ref.current.innerHTML = "";
                            })
                            .done();
                    };
                    fileReader.readAsArrayBuffer(response);
                }
            }
            catch (error) {
                ref.current.innerHTML = "";
            }
        }
    }

    useEffect(() => {
        convertDocx()
    }, []);

    return (<div ref={ref} />)
}

export default DocxToHtml