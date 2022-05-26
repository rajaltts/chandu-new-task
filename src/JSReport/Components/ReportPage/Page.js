import React, { useEffect, useRef, memo, useLayoutEffect } from 'react'
import { injectIntl } from 'react-intl'
import { Format } from './Format'
import translation from '../../../Components/Translation'
import reportStyles from '../../../JSReport/Components/reportStyles'

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
    overFlowIndex = 0
}) => {
    const date = creationDate ? new Date(creationDate) : new Date()

    const pageRef = useRef(null)
    const mainRef = useRef(null)
    const headerRef = useRef(null)
    const footerRef = useRef(null)
    const PAGE_BODY = 927
    const translateYAxis = (PAGE_BODY * (checkForOverflow ? overFlowIndex : 0))
    const translateYAxisStyle = {
        transform: `translateY(-${translateYAxis}px)`
    }
    const overflowDivId = `overflowCheck${title}${overFlowIndex}`

    // Tracks overflows after each new rendering, using React refs of page, header, content and footer
    useEffect(() => {
        setTimeout(() => {
            if (mainRef.current && pageRef.current && headerRef.current && footerRef.current) {
                const pageBottom = pageRef.current.getBoundingClientRect().bottom
                const footerBottom = footerRef.current.getBoundingClientRect().bottom
                const maxChildrenHeight =
                    pageRef.current.clientHeight - (headerRef.current.clientHeight + footerRef.current.clientHeight) + 1
                const overflowDiv = document.getElementById(overflowDivId)
                const overflowClientHeight = overflowDiv ? overflowDiv.clientHeight : 0
                const overflowScrollHeight = overflowDiv ? overflowDiv.scrollHeight : 0
                if (footerBottom > pageBottom || mainRef.current.clientHeight > maxChildrenHeight || overflowScrollHeight > overflowClientHeight) {
                    setOverflow &&
                        setOverflow({
                            overFlowPagesCount: Math.ceil(overflowScrollHeight / mainRef.current.clientHeight),
                            overflowingHeight: mainRef.current.clientHeight - maxChildrenHeight,
                            minimalY: footerRef?.current.clientHeight + 50, // The 50 additional pixels represent all the vertical margin between header, content and footer components
                        })
                }
            }
        }, 1000)
    })

    return (
        <div className='jsreport-page-main-wrapper' style={reportStyles.jsreportPageWrapper}>
            <div style={reportStyles.page} ref={pageRef}>
                {!hideHeader && (
                    <div style={{ ...reportStyles.pageHeader, ...reportStyles.roundBorder }} ref={headerRef}>
                        <div style={{
                            ...reportStyles.pageHeaderLeftArea,
                            ...((fullName.length !== 0 || !hideDate) ? reportStyles.spaceBetween : reportStyles.justifycenter)
                        }}>
                            <img style={reportStyles.pageHeaderBrandLogo} src={modelBrandLogo} alt='Brand logo' />
                            <div style={reportStyles.pageHeaderSubInfos}>
                                {
                                    (fullName.length !== 0) &&
                                    <span style={reportStyles.pageHeaderSubInfosPreparatorName}>{fullName}</span>
                                }
                                {
                                    !hideDate && <span>{`(${date.toLocaleDateString()} ${date.toLocaleTimeString()})`}</span>
                                }
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
                                    <span style={reportStyles.pageHeaderInfoWrapperInfoTitle}>{projectNameLabel}</span>
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
                <div style={{ ...reportStyles.hideOverFlow, ...reportStyles.pageMain, ...reportStyles.roundBorder }} ref={mainRef}>
                    <div id={overflowDivId} style={checkForOverflow ? translateYAxisStyle : reportStyles.hideOverFlow}>{children}</div>
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
    )
}

export default memo(injectIntl(Page))
