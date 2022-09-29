import React, { useEffect, useState, useRef } from 'react'
import { Format } from '../ReportPage/Format'
import translation from '../../../Components/Translation'
import reportStyles from '../reportStyles'

// FIXME: delete me when a nice solution to handle page overflow for embedded html document will be find

// Keep the original Page component just for css translation overflow purpose

/**
 * @category Customer Reports 📁
 * @component
 * @description Page element (header and footer)
 * Can identify overflows and alert the parent, using the setOverflow callback
 * @param {JSX.Element} {children} Page content
 * @param {object} {global} Report meta-data
 * @param {Function} {setOverflow} Callback, to update the overflow value of the parent state
 * @param {Function} {projectName} Name of current project, if exists
 * @param {Function} {tagName} Name of current tag, if exists
 */
const Page = ({
    setOverflow,
    checkForOverflow = false,
    title = 'Report',
    children,
    modelBrandLogo = 'https://stecatbuildersdev.blob.core.windows.net/ecatui/ecatimages/carrier.webp',
    fullName = '',
    creationDate,
    model,
    projectNameLabel,
    projectName,
    tagNameLabel,
    tagName,
    modelBrand = 'carrier',
    footNotes,
    builderInfo,
    hideHeader = false,
    hideFooter = false,
    hideDate = false,
    overFlowIndex = 0,
    waterMarkSVGProps,
}) => {
    const date = creationDate ? new Date(creationDate) : new Date()

    const pageContainerRef = useRef(null)
    const pageRef = useRef(null)
    const mainRef = useRef(null)
    const headerRef = useRef(null)
    const footerRef = useRef(null)

    const PAGE_BODY = 890
    const translateYAxis = PAGE_BODY * (checkForOverflow ? overFlowIndex : 0)
    const translateYAxisStyle = {
        transform: `translateY(-${translateYAxis}px)`,
    }
    const overflowDivId = `overflowCheck${title}${overFlowIndex}`
    const waterMarkSVGPropsDefault = {
        height: '100px',
        width: '100px',
        transform: 'translate(20, 100) rotate(-45)',
        fill: 'rgb(211,211,211)',
        fontSize: '20',
    }
    const waterMarkSVG = {
        ...waterMarkSVGPropsDefault,
        ...waterMarkSVGProps,
    }
    const waterMarkStyle = {
        zIndex: 0,
        backgroundImage: `url("data:image/svg+xml;utf8, <svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='${waterMarkSVG.height}' width='${waterMarkSVG.width}'><text transform='${waterMarkSVG.transform}' fill='${waterMarkSVG.fill}' font-size='${waterMarkSVG.fontSize}'>${waterMarkSVG.label}</text></svg>")`,
    }

    // Tracks overflows after each new rendering, using React refs of page, header, content and footer
    useEffect(() => {
        // Select the node that will be observed for mutations
        const targetNode = document.getElementById(overflowDivId)

        // Options for the observer (which mutations to observe)
        const config = {
            attributes: true,
            characterData: true,
            childList: true,
            subtree: true,
            attributeOldValue: true,
            characterDataOldValue: true,
        }

        // Callback function to execute when mutations are observed
        const callback = function (mutationList) {
            // Use traditional 'for loops' for IE 11
            for (const mutation of mutationList) {
                if (mutation.type === 'childList') {
                    if (mainRef.current && pageRef.current && headerRef.current && footerRef.current) {
                        const pageBottom = pageRef.current.getBoundingClientRect().bottom
                        const footerBottom = footerRef.current.getBoundingClientRect().bottom
                        const maxChildrenHeight =
                            pageRef.current.clientHeight -
                            (headerRef.current.clientHeight + footerRef.current.clientHeight) +
                            1
                        const overflowDiv = document.getElementById(overflowDivId)
                        const overflowScrollHeight = overflowDiv ? overflowDiv.scrollHeight : 0
                        if (
                            footerBottom > pageBottom ||
                            mainRef.current.clientHeight > maxChildrenHeight ||
                            overflowScrollHeight > PAGE_BODY
                        ) {
                            if (setOverflow)
                                setOverflow({
                                    pageContainerRef,
                                    overFlowTotalPagesCount: Math.ceil(overflowScrollHeight / PAGE_BODY),
                                    overflowingHeight: mainRef.current.clientHeight - maxChildrenHeight,
                                    minimalY: footerRef?.current.clientHeight + 50, // The 50 additional pixels represent all the vertical margin between header, content and footer components
                                })
                        }
                    }
                }
            }
        }

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback)

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config)
    }, [])

    useEffect(() => {
        const totalPagesElement = document.getElementById('ReportPreviewTotalPages')
        const totalPages = document.getElementsByClassName('jsreport-page-main-wrapper')
        const totalTextContent = totalPagesElement ? totalPagesElement.textContent.split(' ') : [0, 1]
        const totalNumber = totalTextContent[1] ? Number(totalTextContent[1]) : Number(1)
        if (totalNumber && !!totalPages.length) {
            if (totalNumber === Number(totalPages.length)) return
            totalPagesElement.textContent = `/ ${totalPages.length}`
        }
    })

    return (
        <>
            <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
            <div className='jsreport-page-main-wrapper' style={reportStyles.jsreportPageWrapper} ref={pageContainerRef}>
                <div style={reportStyles.page} ref={pageRef}>
                    {!hideHeader && (
                        <div style={{ ...reportStyles.pageHeader, ...reportStyles.roundBorder }} ref={headerRef}>
                            <div
                                style={{
                                    ...reportStyles.pageHeaderLeftArea,
                                    ...(fullName.length !== 0 || !hideDate
                                        ? reportStyles.spaceBetween
                                        : reportStyles.justifycenter),
                                }}>
                                <img style={reportStyles.pageHeaderBrandLogo} src={modelBrandLogo} alt='Brand logo' />
                                <div style={reportStyles.pageHeaderSubInfos}>
                                    {fullName.length !== 0 && (
                                        <span style={reportStyles.pageHeaderSubInfosPreparatorName}>{fullName}</span>
                                    )}
                                    {!hideDate && (
                                        <span>{`(${date.toLocaleDateString()} ${date.toLocaleTimeString()})`}</span>
                                    )}
                                </div>
                            </div>

                            <div
                                style={{
                                    ...reportStyles.pageHeaderReportTitle,
                                    ...(modelBrand === 'carrier'
                                        ? reportStyles.pageHeaderReportTitleCarrier
                                        : modelBrand === 'ciat'
                                        ? reportStyles.pageHeaderReportTitleCiat
                                        : reportStyles.pageHeaderReportTitleDefault),
                                }}>
                                <span>{title}</span>
                                <div style={reportStyles.pageHeaderMainTitle}>
                                    <span style={reportStyles.pageHeaderMainTitleModel}>
                                        <Format loading sup>
                                            {model}
                                        </Format>
                                    </span>
                                </div>
                            </div>

                            <div style={reportStyles.pageHeaderInfoWrapper}>
                                {projectName && (
                                    <>
                                        <span style={reportStyles.pageHeaderInfoWrapperInfoTitle}>
                                            {projectNameLabel}
                                        </span>
                                        <span style={reportStyles.pageHeaderInfoWrapperProjectName}>{projectName}</span>
                                    </>
                                )}
                                {tagName && (
                                    <>
                                        <span style={reportStyles.pageHeaderInfoWrapperInfoTitle}>{tagNameLabel}</span>
                                        <span style={reportStyles.pageHeaderInfoWrapperTagName}>{tagName}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                    <div
                        style={{
                            ...reportStyles.hideOverFlow,
                            ...reportStyles.pageMain,
                            ...reportStyles.roundBorder,
                            ...(waterMarkSVG?.label ? waterMarkStyle : ''),
                        }}
                        ref={mainRef}>
                        <div style={reportStyles.hideOverFlow}>
                            <div
                                id={overflowDivId}
                                className='pageOverflowContainer'
                                style={checkForOverflow ? translateYAxisStyle : reportStyles.hideOverFlow}>
                                {children}
                            </div>
                        </div>
                    </div>
                    {!hideFooter && (
                        <div style={{ ...reportStyles.pageFooter, ...reportStyles.roundBorder }} ref={footerRef}>
                            <div style={reportStyles.pageFooterLeftArea}>
                                {footNotes.descriptions && footNotes.descriptions.length > 0 && (
                                    <div style={reportStyles.pageFooterLeftAreaFootNote}>
                                        {footNotes.image && (
                                            <img
                                                style={reportStyles.pageFooterLeftAreaFootNoteImage}
                                                src={footNotes.image}
                                                alt='Certification image'
                                            />
                                        )}
                                        {footNotes.descriptions.map((description, i) => (
                                            <div
                                                style={reportStyles.pageFooterLeftAreaFootNoteDescription}
                                                key={`footnote-description-${i}`}>
                                                {description}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div style={reportStyles.pageFooterInfoWrapper}>
                                <span style={reportStyles.pageFooterLeftAreaFootNoteDescription}>{builderInfo}</span>
                                <span className='report-page-number-footer'>
                                    {translation('Page')} <span className='page-number'></span>/
                                    <span className='number-of-pages'></span>
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

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
