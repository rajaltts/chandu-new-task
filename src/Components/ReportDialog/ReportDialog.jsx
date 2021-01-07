import React, {useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'
import './ReportDialog.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight, faFilePdf, faFileWord} from '@fortawesome/free-solid-svg-icons'
import FileSaver from 'file-saver'
import ClipLoader from 'react-spinners/ClipLoader'
import Slide from '@material-ui/core/Slide'
import Grow from '@material-ui/core/Grow'
import {IntlProvider} from 'react-intl'

const ReportDialog = (props) => {
    const [isLoading, setLoading] = useState(false)
    const [reportCurrentPageIndex, setReportCurrentPageIndex] = useState(0)
    const [scrollBarWidth, setScrollBarWidth] = useState(0)
    const {intl, content, config, title} = props
    const ref = useRef()

    useEffect(() => {
        setReportCurrentPageIndex(0)
        if (props.open) document.body.style.overflow = 'hidden'
        return () => (document.body.style.overflow = 'unset')
    }, [props.open])

    useEffect(() => {
        document.addEventListener('mousedown', handleClick)
        setScrollBarWidth(getScrollbarWidth())
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    })

    const getScrollbarWidth = () => {
        const outer = document.createElement('div')
        Object.assign(outer.style, {visibility: 'hidden', overflow: 'scroll', msOverflowStyle: 'scrollbar'})
        document.body.appendChild(outer)
        const inner = document.createElement('div')
        outer.appendChild(inner)
        const scrollBarWidth = outer.offsetWidth - inner.offsetWidth
        outer.parentNode.removeChild(outer)

        return scrollBarWidth
    }

    const handleClick = (e) => {
        const onScrollbar = document.documentElement.clientWidth - scrollBarWidth <= e.clientX
        if (ref.current && !ref.current.contains(e.target) && !onScrollbar) props.onClose()
    }

    const downloadPDF = async () => {
        setLoading(true)
        try {
            const reportEl = (
                <IntlProvider locale={intl.locale} messages={intl.messages}>
                    <html id='pdf-download-root'>
                        <head>
                            <meta httpEquiv='Content-Type' content='text/html; charset=UTF-8' />
                            {config.styles.files.map((file, i) => (
                                <link key={i} rel='stylesheet' type='text/css' href={`${config.styles.url}${file}`} />
                            ))}
                        </head>
                        <body>
                            {content.map((elem, i) => (
                                <div key={i} className='page'>
                                    {elem}
                                </div>
                            ))}
                        </body>
                    </html>
                </IntlProvider>
            )

            const reportDoc = new Document()
            ReactDOM.render(reportEl, reportDoc)

            const jsReportReponse = await fetch(`${props.api.jsReport}api/report`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Methods': 'GET, POST',
                    Authorization: `Bearer ${localStorage.getItem('msal.idtoken')}`,
                    Cookie: 'render-complete=true',
                },
                body: JSON.stringify({
                    template: {
                        shortid: 'l1DbOPsN5',
                        content: reportDoc.documentElement.outerHTML,
                        recipe: 'chrome-pdf',
                        engine: 'handlebars',
                        chrome: {
                            width: '210mm',
                            height: '297mm',
                        },
                    },
                }),
            })
            FileSaver.saveAs(await jsReportReponse.blob(), `${config.fileName}.pdf`)
        } catch (err) {console.error(err)}
        setLoading(false)
    }

    const downloadWord = () => {
        // To develop
    }

    const ReportPagePreview = () => {
        if (content.length > 0) return content[reportCurrentPageIndex ?? 0]
        else return null
    }

    if (props.open) {
        return (
            <div className='js-report'>
                <div className='report-back'>
                    <div className='report-toolbar-container' ref={ref}>
                        <Slide in={true}>
                            <div className='report-top-action-container'>
                                <span className='report-top-action-container-title'>{title}</span>
                                <div className='report-top-action'>
                                    {reportCurrentPageIndex > 0 ? (
                                        <FontAwesomeIcon
                                            className='report-top-action-icons'
                                            icon={faChevronLeft}
                                            color='#FFFFFF'
                                            onClick={() => {
                                                setReportCurrentPageIndex(reportCurrentPageIndex - 1)
                                            }}
                                        />
                                    ) : (
                                        <FontAwesomeIcon className='report-top-action-icons-disabled' icon={faChevronLeft} color='#FFFFFF' />
                                    )}

                                    <span className='report-top-action-page-index-container'>
                                        <span className='report-top-actions-container-title'>Page</span>
                                        <span className='report-top-action-page-index-value'>
                                            <b>{reportCurrentPageIndex + 1} </b>/ {content.length}
                                        </span>
                                    </span>
                                    {reportCurrentPageIndex >= 0 && reportCurrentPageIndex < content.length - 1 ? (
                                        <FontAwesomeIcon
                                            className='report-top-action-icons'
                                            icon={faChevronRight}
                                            color='#FFFFFF'
                                            onClick={() => {
                                                setReportCurrentPageIndex(reportCurrentPageIndex + 1)
                                            }}
                                        />
                                    ) : (
                                        <FontAwesomeIcon className='report-top-action-icons-disabled' icon={faChevronRight} color='#FFFFFF' />
                                    )}

                                    <div className='report-top-actions-download-container'>
                                        {isLoading ? (
                                            <ClipLoader sizeUnit={'px'} size={10} color='#FFFFFF' loading={isLoading} />
                                        ) : (
                                            <div className='report-top-action-download-icons-container'>
                                                <FontAwesomeIcon
                                                    className='report-top-action-icons'
                                                    icon={faFilePdf}
                                                    color='#FFFFFF'
                                                    onClick={downloadPDF}
                                                />
                                                <FontAwesomeIcon
                                                    className='report-top-action-icons'
                                                    icon={faFileWord}
                                                    color='#FFFFFF'
                                                    onClick={downloadWord}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Slide>
                        <Grow in={true}>
                            <div className='report-popup'>
                                <ReportPagePreview />
                            </div>
                        </Grow>
                    </div>
                </div>
            </div>
        )
    } else return null
}

export default ReportDialog
