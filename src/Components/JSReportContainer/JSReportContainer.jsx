import React, {useEffect, useRef, useState, cloneElement, memo} from 'react'
import ReactDOM from 'react-dom'
import './JSReportContainer.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight, faFilePdf, faFileWord} from '@fortawesome/free-solid-svg-icons'
import FileSaver from 'file-saver'
import ClipLoader from 'react-spinners/ClipLoader'
import Slide from '@material-ui/core/Slide'
import Grow from '@material-ui/core/Grow'
import {IntlProvider} from 'react-intl'
import {Provider, useStore} from 'react-redux'

const JSReportContainer = (props) => {
    const {intl, config, title, isOpen, isDownloadable} = props
    const [reportCurrentPreviewIndex, setReportCurrentPreviewIndex] = useState(0)
    const [pageList, setPageList] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [scrollBarWidth, setScrollBarWidth] = useState(0)

    const clickRef = useRef()
    const store = useStore()

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
        if (clickRef.current && !clickRef.current.contains(e.target) && !onScrollbar) {
            setPageList([])
            setReportCurrentPreviewIndex(0)
            props.onClose()
        }
    }

    const downloadPDF = async () => {
        const RootEl = (props) =>
            store ? (
                <Provider store={store}>
                    <IntlProvider locale={intl.locale} messages={intl.messages}>
                        {props.children}
                    </IntlProvider>
                </Provider>
            ) : (
                <IntlProvider locale={intl.locale} messages={intl.messages}>
                    {props.children}
                </IntlProvider>
            )

        setLoading(true)
        try {
            const reportEl = (
                <RootEl>
                    <html id='pdf-download-root'>
                        <head>
                            <meta httpEquiv='Content-Type' content='text/html; charset=UTF-8' />
                            {config.styles.files.map((file, i) => (
                                <link key={i} rel='stylesheet' type='text/css' href={`${config.styles.url}${file}`} />
                            ))}
                        </head>
                        <body>
                            {pageList.map((elem, i) => (
                                <div key={i} className='page'>
                                    {elem}
                                </div>
                            ))}
                        </body>
                    </html>
                </RootEl>
            )
            const reportDoc = new Document()
            ReactDOM.render(reportEl, reportDoc)

            const jsReportReponse = await fetch(`${props.jsReportApi}api/report`, {
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
        } catch (err) {
            console.error(err)
        }
        setLoading(false)
    }

    const downloadWord = () => {
        // To develop
    }

    if (isOpen) {
        return (
            <div className='js-report'>
                <div className='report-back'>
                    <div className='report-toolbar-container' ref={clickRef}>
                        <Slide in={true}>
                            <div className='top-action-container'>
                                <div className='items-container'>
                                    <div className='title-container'>{title}</div>
                                    <div className='navigation-container'>
                                        {reportCurrentPreviewIndex > 0 ? (
                                            <FontAwesomeIcon
                                                className='action-icons'
                                                icon={faChevronLeft}
                                                color='#FFFFFF'
                                                onClick={() => {
                                                    setReportCurrentPreviewIndex(reportCurrentPreviewIndex - 1)
                                                }}
                                            />
                                        ) : (
                                            <FontAwesomeIcon className='action-icons disabled' icon={faChevronLeft} color='#FFFFFF' />
                                        )}

                                        <span className='page-index-container'>
                                            <span className='page-title'>Page</span>
                                            <span className='page-index-value'>
                                                <b>{reportCurrentPreviewIndex + 1} </b>/ {pageList.length}
                                            </span>
                                        </span>
                                        {reportCurrentPreviewIndex >= 0 && reportCurrentPreviewIndex < pageList.length - 1 ? (
                                            <FontAwesomeIcon
                                                className='action-icons'
                                                icon={faChevronRight}
                                                color='#FFFFFF'
                                                onClick={() => {
                                                    setReportCurrentPreviewIndex(reportCurrentPreviewIndex + 1)
                                                }}
                                            />
                                        ) : (
                                            <FontAwesomeIcon className='action-icons disabled' icon={faChevronRight} color='#FFFFFF' />
                                        )}
                                    </div>
                                    <div className='download-container'>
                                        {!isDownloadable || isLoading ? (
                                            <>
                                                <div className='download-icons-container'>
                                                    <FontAwesomeIcon className='action-icons disable' icon={faFilePdf} color='#FFFFFF' />
                                                    <FontAwesomeIcon className='action-icons disable' icon={faFileWord} color='#FFFFFF' />
                                                </div>
                                                <div className={`download-status-container`}>
                                                    <div className='loading-status-message'>{!isDownloadable ? 'Loading data...' : isLoading ? 'Downloading report...' : ''}</div>
                                                    <ClipLoader sizeUnit={'px'} size={10} color='#FFFFFF' loading />
                                                </div>
                                            </>
                                        ) : (
                                            <div className='download-icons-container'>
                                                <FontAwesomeIcon className='action-icons' icon={faFilePdf} color='#FFFFFF' onClick={downloadPDF} />
                                                <FontAwesomeIcon className='action-icons' icon={faFileWord} color='#FFFFFF' onClick={downloadWord} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    </div>
                    <Grow in={true}>
                        <div className='report-popup'>
                            {cloneElement(props.children, {
                                reportCurrentPreviewIndex: reportCurrentPreviewIndex,
                                updateList: (data) => setPageList(data),
                            })}
                        </div>
                    </Grow>
                </div>
            </div>
        )
    } else return null
}

export default memo(JSReportContainer)
