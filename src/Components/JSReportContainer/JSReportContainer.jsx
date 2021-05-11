import React, { useEffect, useRef, useState, cloneElement } from "react";
import { useStore } from "react-redux";
import downloadPDF from "./pdfDownload.jsx";
import "./JSReportContainer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faFilePdf,
  faFileWord,
} from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";
import Zoom from "@material-ui/core/Zoom";

/**
 * Preview a report
 * Navigation between pages / download
 * @param {Array<JSX.Element>} props.children List of pages of the report
 * @param {boolean} props.isOpen Opening boolean
 * @param {boolean} props.onClose Closing callback
 * @param {string} props.title Title of the preview header
 * @param {boolean} props.isDownloadable Allows to download report if true, else disable the feature
 * @param {object} props.store Redux store
 * @param {object} props.intl
 * @param {object} props.config Configuration file, containing :
 * - fileName : string, name of file to download
 * - styles.url : string, url of css folder (hosted on azure)
 * - stiles.files : array<string>, name of css files to use, at the url
 * @param {string} props.jsReportApi js report api (e.g store.api.jsReport)
 */
const JSReportContainer = (props) => {
  const { intl, config, title, isOpen, onClose, isDownloadable, jsReportApi } =
    props;
  const [reportCurrentPreviewIndex, setReportCurrentPreviewIndex] = useState(0);
  const [pageList, setPageList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [scrollBarWidth, setScrollBarWidth] = useState(0);

  const popupRef = useRef();
  const topBarRef = useRef();
  const store = useStore();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    setScrollBarWidth(getScrollbarWidth());
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  const getScrollbarWidth = () => {
    const outer = document.createElement("div");
    Object.assign(outer.style, {
      visibility: "hidden",
      overflow: "scroll",
      msOverflowStyle: "scrollbar",
    });
    document.body.appendChild(outer);
    const inner = document.createElement("div");
    outer.appendChild(inner);
    const scrollBarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode.removeChild(outer);

    return scrollBarWidth;
  };

  const handleClick = (e) => {
    const onScrollbar =
      document.documentElement.clientWidth - scrollBarWidth <= e.clientX;
    if (
      popupRef.current &&
      !popupRef.current.contains(e.target) &&
      topBarRef.current &&
      !topBarRef.current.contains(e.target) &&
      !onScrollbar
    ) {
      setPageList([]);
      setReportCurrentPreviewIndex(0);
      onClose();
    }
  };

  const startDownload = async () => {
    setLoading(true);
    await downloadPDF({ pageList, store, intl, config, jsReportApi });
    setLoading(false);
  };

  const downloadWord = () => {
    // To develop
  };

  if (isOpen) {
    return (
      <div className="js-report">
        <div className="report-back">
          <div className="report-toolbar-container" ref={topBarRef}>
            <div className="top-action-container">
              <div className="items-container">
                <div className="title-container">{title}</div>
                <div className="navigation-container">
                  {reportCurrentPreviewIndex > 0 ? (
                    <FontAwesomeIcon
                      className="action-icons"
                      icon={faChevronLeft}
                      color="#FFFFFF"
                      onClick={() => {
                        setReportCurrentPreviewIndex(
                          reportCurrentPreviewIndex - 1
                        );
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="action-icons disable"
                      icon={faChevronLeft}
                      color="#FFFFFF"
                    />
                  )}

                  <span className="page-index-container">
                    <span className="page-title">Page</span>
                    <span className="page-index-value">
                      <b>{reportCurrentPreviewIndex + 1} </b>/ {pageList.length}
                    </span>
                  </span>
                  {reportCurrentPreviewIndex >= 0 &&
                  reportCurrentPreviewIndex < pageList.length - 1 ? (
                    <FontAwesomeIcon
                      className="action-icons"
                      icon={faChevronRight}
                      color="#FFFFFF"
                      onClick={() => {
                        setReportCurrentPreviewIndex(
                          reportCurrentPreviewIndex + 1
                        );
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="action-icons disable"
                      icon={faChevronRight}
                      color="#FFFFFF"
                    />
                  )}
                </div>
                <div className="download-container">
                  {!isDownloadable || isLoading ? (
                    <>
                      <div className="download-icons-container">
                        <FontAwesomeIcon
                          className="action-icons disable"
                          icon={faFilePdf}
                          color="#FFFFFF"
                        />
                        <FontAwesomeIcon
                          className="action-icons disable"
                          icon={faFileWord}
                          color="#FFFFFF"
                        />
                      </div>
                      <div className={`download-status-container fade-in`}>
                        <div className="loading-status-message">
                          {!isDownloadable
                            ? "Loading data..."
                            : isLoading
                            ? "Downloading report..."
                            : ""}
                        </div>
                        <ClipLoader
                          sizeUnit={"px"}
                          size={10}
                          color="#FFFFFF"
                          loading
                        />
                      </div>
                    </>
                  ) : (
                    <div className="download-icons-container">
                      <FontAwesomeIcon
                        className="action-icons"
                        icon={faFilePdf}
                        color="#FFFFFF"
                        onClick={startDownload}
                      />
                      <FontAwesomeIcon
                        className="action-icons"
                        icon={faFileWord}
                        color="#FFFFFF"
                        onClick={downloadWord}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Zoom in={true}>
            <div className="report-popup" ref={popupRef}>
              {cloneElement(props.children, {
                reportCurrentPreviewIndex: reportCurrentPreviewIndex,
                updateList: (data) => setPageList(data),
              })}
            </div>
          </Zoom>
        </div>
      </div>
    );
  } else return null;
};

export default JSReportContainer;
