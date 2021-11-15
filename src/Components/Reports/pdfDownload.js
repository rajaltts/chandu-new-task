import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import FileSaver from "file-saver";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { ApiService } from "@carrier/workflowui-globalfunctions";

// Default file name cleanup
const defaultCleanup = (input) =>
  typeof input === "string" ? input.replace(/[^a-zA-Z0-9]+/g, " ").trim() : "";

/**
 * @description Download a list of hooks as a pdf file
 * @param {Array<JSX.Element>} {pageList} List of pages
 * @param {object} {store} Redux store (optional)
 * @param {object} {intl}
 * @param {object} {reportConfig} configuration file, containing :
 * - key : string, name of file to download
 * - styles.url : string, url of css folder (hosted on azure)
 * - stiles.files : array<string>, name of css files to use, at the url
 * @param {string} {jsReportApi} js report api (e.g store.api.jsReport)
 * @param {string} {fileName} Name of the file (can contain special characters - will be cleaned up)
 * @param {function} {cleanup} Optional, formatting function of downloaded file name */
const pdfDownload = ({
  pageList,
  store,
  intl,
  reportConfig,
  jsReportApi,
  fileName,
  cleanup = defaultCleanup,
}) =>
  new Promise((resolve, reject) => {
    const RootEl = ({ children }) => {
      return store ? (
        <Provider store={store}>
          <IntlProvider locale={intl.locale} messages={intl.messages}>
            {children}
          </IntlProvider>
        </Provider>
      ) : (
        <IntlProvider locale={intl.locale} messages={intl.messages}>
          {children}
        </IntlProvider>
      );
    };

    try {
      const reportEl = (
        <>
          <head>
            <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
            {reportConfig?.styles.files.map((file, i) => (
              <link
                key={i}
                rel="stylesheet"
                type="text/css"
                href={`${reportConfig.styles.url}${file}`}
              />
            ))}
          </head>
          <body>
            <RootEl>
              <>
                {pageList.map((elem, i) => (
                  <Fragment key={`js-report-download-page-${i}`}>
                    {elem}
                  </Fragment>
                ))}
              </>
            </RootEl>
          </body>
        </>
      );

      const renderingDoc = document.createElement("html");
      renderingDoc.classList.add("pdf-download-root");
      ReactDOM.render(reportEl, renderingDoc);

      const pagesNumbers = Array.from(
        renderingDoc.getElementsByClassName("jsreport-page-wrapper")
      );
      pagesNumbers.map((element, pageNumber) => {
        if (element.getElementsByClassName("page-number").length > 0) {
          element.getElementsByClassName("page-number")[0].textContent =
            pageNumber + 1;
          element.getElementsByClassName("number-of-pages")[0].textContent =
            pageList.length;
        }
      });

      ApiService(
        `${jsReportApi}api/report`,
        "POST",
        JSON.stringify({
          template: {
            shortid: "l1DbOPsN5",
            content: renderingDoc.outerHTML,
            recipe: "chrome-pdf",
            engine: "handlebars",
            chrome: {
              width: "793px",
              height: "1122px",
            },
          },
        }),
        "blob"
      ).then((jsReportReponse) => {
        FileSaver.saveAs(jsReportReponse.data, `${cleanup(fileName)}.pdf`);
        resolve();
      });
    } catch (err) {
      console.error(err);
      reject();
    }
  });

export default pdfDownload;
