import React, { useEffect, useRef, memo } from 'react'
import { injectIntl } from 'react-intl'
import { Format } from './Format'
import { translation } from '@carrier/ngecat-reactcomponents'
import './PageStyles.css';

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
    title = 'Report',
    children,
    modelBrandLogo = 'https://stecatbuildersdev.blob.core.windows.net/ecatui/ecatimages/carrier.webp',
    fullName = "",
    creationDate,
    model,
    projectNameLabel,
    projectName,
    tagNameLabel,
    tagName,
    modelBrand,
    footNotes,
    builderInfo,
    pageList = 1,
    reportCurrentPreviewIndex = 1,
    hideHeader = false,
    hideFooter = false,
}) => {
    const date = creationDate ? new Date(creationDate) : new Date();

    const pageRef = useRef(null)
    const mainRef = useRef(null)
    const headerRef = useRef(null)
    const footerRef = useRef(null)

    // Tracks overflows after each new rendering, using React refs of page, header, content and footer
    useEffect(() => {
        setTimeout(() => {
            if (mainRef.current && pageRef.current && headerRef.current && footerRef.current) {
                const pageBottom = pageRef.current.getBoundingClientRect().bottom
                const footerBottom = footerRef.current.getBoundingClientRect().bottom

                const maxChildrenHeight =
                    pageRef.current.clientHeight - (headerRef.current.clientHeight + footerRef.current.clientHeight) + 1

                if (footerBottom > pageBottom || mainRef.current.clientHeight > maxChildrenHeight) {
                    setOverflow({
                        overflowingHeight: mainRef.current.clientHeight - maxChildrenHeight,
                        minimalY: footerRef?.current.clientHeight + 50, // The 50 additional pixels represent all the vertical margin between header, content and footer components
                    })
                }
            }
        }, 1000)
    })

    return (
        <div className='jsreport-page-wrapper'>
            <div className='page' ref={pageRef}>
                {!hideHeader &&
                    <div className='header' ref={headerRef}>
                        <div className='left-area'>
                            <img className='brand-logo' src={modelBrandLogo} alt='Brand logo' />
                            <div className='sub-infos'>
                                <span className='preparator-name'>{fullName}</span>
                                <span className='date'>{`(${date.toLocaleDateString()} ${date.toLocaleTimeString()})`}</span>
                            </div>
                        </div>

                        {modelBrand === 'carrier' && <div className='report-title carrier'>{title}</div>}
                        {modelBrand === 'ciat' && (
                            <div className='report-title ciat'>
                                {title}
                                {model && 
                                    <div className='main-title ciat'>
                                        <span className='model'>
                                            <Format loading sup>{model}</Format>
                                        </span>
                                    </div>
                                }
                            </div>
                        )}

                        <div className='info-wrapper'>
                            {projectName && (
                                <>
                                    <span className='info-title'>{projectNameLabel}</span>
                                    <span className='project-name'>{projectName}</span>
                                </>
                            )}
                            {tagName && (
                                <>
                                    <span className='info-title'>{tagNameLabel}</span>
                                    <span className='tag-name'>{tagName}</span>
                                </>
                            )}
                        </div>
                    </div>
                }
                <div className='main' ref={mainRef}>
                    {children}
                </div>
                {!hideFooter &&
                    <div className='footer' ref={footerRef}>
                        <div className='left-area'>
                            {footNotes.descriptions && footNotes.descriptions.length > 0 && (
                                <div className='footnote'>
                                    {footNotes.image && (
                                        <img className='footnote-image' src={footNotes.image} alt='Certification image' />
                                    )}
                                    {footNotes.descriptions.map((description, i) => (
                                        <div className='footnote-description' key={`footnote-description-${i}`}>
                                            {description}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <span className='package-version'>{builderInfo}</span>
                        </div>
                        <div className='info-wrapper'>
                            <span>
                                {translation('Page')} <span className='page-number'>{reportCurrentPreviewIndex}</span>/
                                <span className='number-of-pages'>{pageList}</span>
                            </span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default memo(injectIntl(Page))
