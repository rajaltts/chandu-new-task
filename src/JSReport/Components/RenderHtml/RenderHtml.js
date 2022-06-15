import React, { useRef, useEffect } from 'react'
import { ApiService } from '@carrier/workflowui-globalfunctions'

const RenderHtml = ({ url = '' }) => {
    const ref = useRef()

    const renderHTML = async () => {
        if (url && typeof url === 'string' && url.slice(((url.lastIndexOf('.') - 1) >>> 0) + 2) === 'html') {
            try {
                const { data } = await ApiService(url, null, null, 'text')
                ref.current.innerHTML = data
            } catch (error) {
                ref.current.innerHTML = ''
            }
        }
    }

    useEffect(() => {
        renderHTML()
    }, [])

    return <div ref={ref} />
}

export default RenderHtml
