import React, { useState } from 'react'
import Page from '../ReportPage/Page'

const PageOverflow = (props) => {
    const [checkForOverflow, setCheckForOverFlow] = useState(false)
    const [overFlowPagesCount, setOverFlowPagesCount] = useState(1)

    const setOverflowHandler = (overflowData) => {
        const { setOverflow } = props
        const { overFlowTotalPagesCount, pageContainerRef } = overflowData
        if (setOverflow) setOverflow(overFlowTotalPagesCount)
        if (overFlowTotalPagesCount !== overFlowPagesCount) {
            setOverFlowPagesCount(overFlowTotalPagesCount)
            setCheckForOverFlow(overFlowTotalPagesCount > 1)
            createAnotherPages(pageContainerRef, overFlowTotalPagesCount)
        }
    }

    const createAnotherPages = (pageContainerRef, overFlowPagesCount) => {
        const pageElement = pageContainerRef.current
        const PAGE_BODY = 890
        for (let i = 0; i < overFlowPagesCount - 1; i++) {
            const copiedPageElement = pageElement.cloneNode(true)
            const overflowDivIdElement = copiedPageElement.getElementsByClassName('pageOverflowContainer')
            const translateYAxis = PAGE_BODY * i
            const translateYAxisStyle = `transform: translateY(-${translateYAxis}px)`
            const overflowDivId = `overflowCheck${props.title}${i}`
            overflowDivIdElement[0].setAttribute('id', overflowDivId)
            overflowDivIdElement[0].setAttribute('style', translateYAxisStyle)
            pageElement.offsetParent.insertBefore(copiedPageElement, pageElement)
        }
    }

    const newProps = {
        ...props,
        overFlowIndex: overFlowPagesCount - 1,
        checkForOverflow: checkForOverflow,
        setOverflow: setOverflowHandler,
    }

    return <Page {...newProps} />
}

export default PageOverflow
