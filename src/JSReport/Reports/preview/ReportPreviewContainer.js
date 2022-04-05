import React, { useEffect, useState, useRef, memo, useMemo } from 'react'
import { useStore, useSelector } from 'react-redux'
import { injectIntl } from 'react-intl'
import ReportPreview from './ReportPreview.js'
import pdfDownload from './pdfDownload.js'

/**
 * @category Reports Preview 👁️
 * @component
 * @description Logic part of report preview. Manage scroll to pages, download, preview exit.
 */
const ReportPreviewContainer = ({ isOpen, closeReportPreview, children, loading = false, reportDownloadable = true, intl, reportConfig={} }) => {
    const { preLoadedStoreIndex, preLoadedReport, title, fileName = 'Test' } = reportConfig.options ?? {}

    const store = useStore()
    const api = useSelector((state) => state.api)

    const [isReportDownloadable, setReportDownloadable] = useState(reportDownloadable)
    const [errorMessage, setErrorMessage] = useState(null)
    const [reportCurrentPreviewIndex, setReportCurrentPreviewIndex] = useState(0)
    const [pageList, setPageList] = useState([])
    const [isLoading, setLoading] = useState(loading)
    const [scrollBarWidth, setScrollBarWidth] = useState(0)

    const popupRef = useRef()
    const topBarRef = useRef()
    const topActionsContainerRef = useRef()

    useEffect(() => {
        if (loading !== isLoading) {
            setLoading(loading)
        }
        if (reportDownloadable !== isReportDownloadable) {
            setReportDownloadable(reportDownloadable)
        }
    }, [loading, reportDownloadable])

    useEffect(() => {
        document.addEventListener('mousedown', handleClick)
        setScrollBarWidth(scrollbarWidth)

        const getLastElementVisibleOnScreen = (elements) => {
            const pagesNumbers = Array.from(elements)
                .map((element, pageNumber) => {
                    if (element.getElementsByClassName('page-number').length > 0) {
                        element.getElementsByClassName('page-number')[0].textContent = pageNumber + 1
                        element.getElementsByClassName('number-of-pages')[0].textContent = pageList.length
                    }

                    const position = element.getBoundingClientRect()
                    return (pageNumber === 0 || position.top <= topActionsContainerRef.current.offsetHeight + 1) &&
                        position.bottom >= 0
                        ? pageNumber + 1
                        : false
                })
                .filter((elem) => elem)
            return pagesNumbers.slice(-1).pop()
        }

        const baseElem = document.getElementsByClassName('report-back')[0]

        const handleScroll = () => {
            const lastPageNumberVisible = getLastElementVisibleOnScreen(
                baseElem.getElementsByClassName('jsreport-page-main-wrapper')
            )
            if (typeof lastPageNumberVisible === 'number') {
                setReportCurrentPreviewIndex(lastPageNumberVisible - 1)
            }
        }
        if (baseElem) baseElem.addEventListener('scroll', handleScroll)

        return () => {
            document.removeEventListener('mousedown', handleClick)
            document.removeEventListener('scroll', handleScroll)
        }
    })

    const autoScrollToPage = (pageIndex) => {
        const target = document.getElementsByClassName('jsreport-page-main-wrapper')[pageIndex];
        if (isOpen && target && topActionsContainerRef.current) {
            const baseElem = document.getElementsByClassName('report-back')[0]
            const y = target.getBoundingClientRect().top + baseElem.scrollTop - topActionsContainerRef.current.offsetHeight;
            baseElem.scrollTo({ top: y, behavior: 'smooth' })
        }
    }

    const scrollbarWidth = useMemo(() => {
        const outer = document.createElement('div')
        Object.assign(outer.style, {
            visibility: 'hidden',
            overflow: 'scroll',
            msOverflowStyle: 'scrollbar',
        })
        document.body.appendChild(outer)
        const inner = document.createElement('div')
        outer.appendChild(inner)
        const scrollBarWidth = outer.offsetWidth - inner.offsetWidth
        outer.parentNode.removeChild(outer)

        return scrollBarWidth
    }, [])

    const handleClick = (e) => {
        const onScrollbar = document.documentElement.clientWidth - scrollBarWidth <= e.clientX
        if (
            popupRef.current &&
            !popupRef.current.contains(e.target) &&
            topBarRef.current &&
            !topBarRef.current.contains(e.target) &&
            !onScrollbar &&
            !errorMessage
        ) {
            onClose()
        }
    }

    const onClose = () => {
        setPageList([])
        setReportCurrentPreviewIndex(0)
        closeReportPreview()
    }

    const downloadPdf = async () => {
        setLoading(true)
        await pdfDownload({
            store,
            intl,
            reportConfig,
            jsReportApi: api.jsReport,
            fileName,
        })
        setLoading(false)
    }

    return (
        <ReportPreview
            {...{
                title: title ?? 'Report preview',
                fileName,
                reportConfig,
                isOpen,
                onClose,
                isLoading,
                isReportDownloadable,
                reportCurrentPreviewIndex,
                pageList,
                setPageList,
                autoScrollToPage,
                downloadPdf,
                errorMessage,
                popupRef,
                topBarRef,
                topActionsContainerRef,
            }}>
            {children}
        </ReportPreview>
    )
}

export default memo(injectIntl(ReportPreviewContainer))
