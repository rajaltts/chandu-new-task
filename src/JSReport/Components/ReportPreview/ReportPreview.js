import React, { cloneElement, memo, Suspense } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faFilePdf, faFileWord, faTimes } from '@fortawesome/free-solid-svg-icons'
import Zoom from '@material-ui/core/Zoom'
import DescriptionIcon from '@material-ui/icons/Description'
import Tooltip from '@material-ui/core/Tooltip'
import { IconButton } from '@material-ui/core'

import ConfirmModal from '../../../Components/ConfirmModal/ConfirmModal'
import translation from '../../../Components/Translation'

import useReportPreviewStyles, { BorderLinearProgress } from './ReportPreview.styles'

/** Preview a report
 * Navigation between pages / download
 * @param {Array<JSX.Element>} {children} Report.
 * Should be a React fragment containing elements representing pages.
 * Each page element should have a 'jsreport-page-main-wrapper' class.
 * @param {string} {title} Title of the preview header (e.g Report Preview)
 * @param {boolean} {isOpen} Opening boolean
 * @param {function} {onClose} Closing callback
 * @param {boolean} {isLoading} True if report data is loading (e.g when fetch a results api)
 * @param {boolean} {isReportDownloadable} Allows to download report if true, else disable the feature (e.g false if results are loaded but invalid)
 * @param {number} {reportCurrentPreviewIndex} Current page index of report (e.g 0 if first page)
 * @param {Array<object>} {pageList} List of pages of the report
 * @param {function} {setPageList} Update page list of the report
 * @param {function} {autoScrollToPage} Scroll to a specific page
 * @param {object} {reportConfig} configuration file, containing :
 * - key : string, name of file to download
 * - component : compopnent pages (same as children)
 * - styles.url : string, url of css folder (hosted on azure)
 * - styles.files : array<string>, name of css files to use, at the url
 * @param {object} {errorMessage} Error message, containing :
 * - title : Title of error
 * - details : array of {key} element, containg error messages to dislay
 * - severity : WARNING or FAILED
 * @param {function} {downloadPdf} Download pdf report
 * @param {function} {downloadWord} Optional, Download word report
 * @param {React.MutableRefObject} {popupRef} Ref of global preview popup, used for report close detection
 * @param {React.MutableRefObject} {topActionsContainerRef} Ref of top bar parent component, used for report close detection
 * @param {React.MutableRefObject} {topBarRef} Ref of top bar component, used for report close detection
 * @author Samy Belaloui-Bertot
 * @see https://scegithub.apps.carrier.com/SCE/NGECAT-PackagedChillersEMEA/tree/develop/docs/tutorials/reports/js-reports.md
 */
const ReportPreview = ({
    children,
    title,
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
    downloadWord,
    errorMessage,
    popupRef,
    topActionsContainerRef,
    topBarRef,
}) => {
    const classes = useReportPreviewStyles()

    return isOpen ? (
        <div className={`${classes.reportBack} report-back`}>
            <div className={classes.reportToolbarContainer} ref={topActionsContainerRef}>
                <div id='ReportPreviewHeader' className={classes.topActionContainer} ref={topBarRef}>
                    <div className={classes.itemsContainer}>
                        <div className={`${classes.titleContainer} vertical-bar align-left`}>
                            {reportConfig && <div className={classes.title}>{translation(reportConfig.key)}</div>}
                            <div className={classes.subTitle}>{translation(title, 'Report preview')}</div>
                        </div>
                        <div className={classes.navigationContainer}>
                            {reportCurrentPreviewIndex > 0 && !errorMessage ? (
                                <FontAwesomeIcon
                                    className={classes.actionIcons}
                                    icon={faChevronLeft}
                                    onClick={() => {
                                        autoScrollToPage(reportCurrentPreviewIndex - 1)
                                    }}
                                />
                            ) : (
                                <FontAwesomeIcon className={`${classes.actionIcons} disable`} icon={faChevronLeft} />
                            )}

                            <span className={classes.pageIndexContainer}>
                                <span className={classes.pageTitle}>{translation('Page')}</span>
                                <span className={classes.pageIndexValue}>
                                    <b>{reportCurrentPreviewIndex + 1} </b>
                                    <span className={classes.pageIndexValueSecondary}>/ {pageList.length}</span>
                                </span>
                            </span>
                            {reportCurrentPreviewIndex >= 0 &&
                            reportCurrentPreviewIndex < pageList.length - 1 &&
                            !errorMessage ? (
                                <FontAwesomeIcon
                                    className={classes.actionIcons}
                                    icon={faChevronRight}
                                    onClick={() => {
                                        autoScrollToPage(reportCurrentPreviewIndex + 1)
                                    }}
                                />
                            ) : (
                                <FontAwesomeIcon className={`${classes.actionIcons} disable`} icon={faChevronRight} />
                            )}
                        </div>
                        <div className={classes.downloadContainer}>
                            {!isReportDownloadable || isLoading || errorMessage ? (
                                <>
                                    <div className={classes.downloadIconsContainer}>
                                        <FontAwesomeIcon
                                            className={`${classes.actionIcons} disable`}
                                            icon={faFilePdf}
                                        />
                                        <FontAwesomeIcon
                                            className={`${classes.actionIcons} disable`}
                                            icon={faFileWord}
                                        />
                                    </div>
                                    <div className={classes.downloadContainerTitle}>
                                        {errorMessage?.title ??
                                            ((!isReportDownloadable || isLoading) && (
                                                <span className={classes.statusMessage}>
                                                    {translation(isReportDownloadable ? 'Downloading' : 'Calculating')}
                                                    {'...'}
                                                </span>
                                            ))}
                                    </div>
                                </>
                            ) : (
                                <div className={classes.downloadIconsContainer}>
                                    <Tooltip
                                        title={translation('DownloadAsPDF', 'Download as PDF')}
                                        PopperProps={{ container: topBarRef.current }}
                                    >
                                        <IconButton onClick={downloadPdf}>
                                            <FontAwesomeIcon className={classes.actionIcons} icon={faFilePdf} />
                                        </IconButton>
                                    </Tooltip>
                                    {downloadWord ? (
                                        <IconButton onClick={downloadWord}>
                                            <FontAwesomeIcon className={classes.actionIcons} icon={faFileWord} />
                                        </IconButton>
                                    ) : (
                                        <FontAwesomeIcon
                                            className={`${classes.actionIcons} disable`}
                                            icon={faFileWord}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                        <div className={`${classes.closeContainer} ${classes.verticalBar} align-right`}>
                            <Tooltip
                                title={translation('ClosePreview', 'Close preview')}
                                PopperProps={{ container: topBarRef.current }}
                            >
                                <IconButton onClick={onClose}>
                                    <FontAwesomeIcon className={classes.actionIcons} icon={faTimes} />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    {(!isReportDownloadable || isLoading) && !errorMessage && (
                        <BorderLinearProgress
                            color='secondary'
                            isReportDownloadable={isReportDownloadable}
                            isLoading={isLoading}
                        />
                    )}
                </div>
            </div>
            <Zoom in={true}>
                <div
                    id='jsReportAllContent'
                    className={`pdf-download-root-main ${classes.reportPopup} main ${
                        errorMessage ? 'popup-error' : ''
                    }`}
                    ref={popupRef}
                >
                    <Suspense fallback={<></>}>
                        {cloneElement(children, {
                            reportCurrentPreviewIndex,
                            updateList: (data) => setPageList(data),
                            fileName,
                        })}
                    </Suspense>
                    {errorMessage && (
                        <ConfirmModal
                            isModalOpen={!!errorMessage}
                            title={translation(errorMessage.title)}
                            onClose={onClose}
                            hideCancel={true}
                            errorMsg={errorMessage.details.map(({ key }) => translation(key))}
                            headerIcon={DescriptionIcon}
                        />
                    )}
                </div>
            </Zoom>
        </div>
    ) : (
        <></>
    )
}

export default memo(ReportPreview)
