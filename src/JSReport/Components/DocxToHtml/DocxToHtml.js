import React, { useRef, useEffect } from 'react'
import mammoth from "mammoth";
import { ApiService } from '@carrier/workflowui-globalfunctions'

const DocxToHtml = ({ url = "" }) => {
    const ref = useRef();

    const convertDocx = async () => {
        if (url && (typeof url === 'string') && url.slice((url.lastIndexOf(".") - 1 >>> 0) + 2) === "docx") {
            try {
                const { data } = await ApiService(url, null, null, 'arraybuffer')
                mammoth.convertToHtml({ arrayBuffer: data })
                    .then((result) => {
                        ref.current.innerHTML = result.value;
                    })
                    .catch(error => {
                        ref.current.innerHTML = "";
                    })
                    .done();
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

export default DocxToHtml;