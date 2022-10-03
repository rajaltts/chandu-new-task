import React, { useEffect, useState, useRef, memo } from 'react'
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
const Page = (props) => {
    const {
        checkForOverflow = true,
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
        waterMarkSVGProps,
    } = props

    const date = creationDate ? new Date(creationDate) : new Date()

    const PAGE_BODY = 890
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

    const [dimensions, setDimensions] = useState(new Array(children?.length ?? 0))
    const maxPageContentHeight = PAGE_BODY

    let cumulativeHeight = 0
    const pageChildren = children?.length ? [] : [children]
    let unrenderedChildren = []

    const [loaded, setStatus] = useState(document.readyState === 'complete')

    useEffect(() => {
        if (!loaded) {
            document.onreadystatechange = () => {
                setStatus(document.readyState === 'complete')
            }
        }
    }, [loaded])

    const ComponentWithDimensions = ({ onHeightChange, children }) => {
        const targetRef = useRef()

        useEffect(() => {
            if (targetRef.current) {
                onHeightChange(targetRef.current.scrollHeight)
            }
        }, [targetRef, children])

        return <div ref={targetRef}>{children}</div>
    }

    const createComponentWithDimensions = (index) =>
        pageChildren.push(
            <ComponentWithDimensions
                key={index}
                onHeightChange={(height) => {
                    dimensions[index] = height
                    setDimensions(dimensions)
                }}>
                {children[index]}
            </ComponentWithDimensions>
        )

    if (loaded && checkForOverflow && children?.length) {
        if (dimensions.findIndex((x) => x === undefined) !== -1) {
            children.forEach((_, index) => createComponentWithDimensions(index))
        } else {
            for (let i = 0; i < children.length; i++) {
                cumulativeHeight += dimensions[i]

                if (
                    pageChildren.length > 0 &&
                    maxPageContentHeight !== null &&
                    cumulativeHeight > maxPageContentHeight
                ) {
                    unrenderedChildren = children.slice(i)
                    break
                }
                createComponentWithDimensions(i)
            }
        }
    }

    return (
        <>
            <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
            <div className='jsreport-page-main-wrapper' style={reportStyles.jsreportPageWrapper}>
                <div style={reportStyles.page}>
                    {!hideHeader && (
                        <div style={{ ...reportStyles.pageHeader, ...reportStyles.roundBorder }}>
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
                        }}>
                        <div style={reportStyles.hideOverFlow}>{checkForOverflow ? pageChildren : children}</div>
                    </div>
                    {!hideFooter && (
                        <div style={{ ...reportStyles.pageFooter, ...reportStyles.roundBorder }}>
                            <div style={reportStyles.pageFooterLeftArea}>
                                {footNotes && footNotes.descriptions && footNotes.descriptions.length > 0 && (
                                    <div style={reportStyles.pageFooterLeftAreaFootNote}>
                                        {footNotes.image && (
                                            <img
                                                style={reportStyles.pageFooterLeftAreaFootNoteImage}
                                                src={footNotes.image}
                                                alt='Certification image'
                                            />
                                        )}
                                        <div style={footNotes.descriptionsStyle}>
                                            {footNotes.descriptions.map((description, i) => (
                                                <div
                                                    style={reportStyles.pageFooterLeftAreaFootNoteDescription}
                                                    key={`footnote-description-${i}`}>
                                                    {description}
                                                </div>
                                            ))}
                                        </div>
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
            {checkForOverflow && unrenderedChildren.length > 0 ? <Page {...props}>{unrenderedChildren}</Page> : null}
        </>
    )
}

export default memo(injectIntl(Page))
