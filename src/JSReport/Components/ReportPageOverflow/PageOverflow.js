import React, { useState } from "react"
import Page from "../ReportPage/Page"

const PageOverflow = (props) => {
    const [checkForOverflow, setCheckForOverFlow] = useState(false)
    const [overFlowPagesCount, setOverFlowPagesCount] = useState(1)
    const setOverflowHandler = (overflowData) => {
        const { setOverflow } = props
        const { overFlowPagesCount } = overflowData
        setOverflow && setOverflow(overFlowPagesCount)
        setOverFlowPagesCount(overFlowPagesCount)
        setCheckForOverFlow(overFlowPagesCount > 1)
    }
    return (
        Array.from({ length: overFlowPagesCount }, (v, index) => {
            const newProps = {
                ...props,
                overFlowIndex: index,
                checkForOverflow: checkForOverflow,
                setOverflow: setOverflowHandler
            }
            return <Page {...newProps} />
        })
    )
}

export default PageOverflow