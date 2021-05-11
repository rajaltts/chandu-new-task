import ReactDOM from "react-dom";
import FileSaver from "file-saver";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { ApiService } from "@carrier/workflowui-globalfunctions";

/**
 * Download a list of hooks as a pdf file
 * @param {Array<JSX.Element>} parameters.pageList List of pages
 * @param {object} parameters.store Redux store (optional)
 * @param {object} parameters.intl
 * @param {object} parameters.config Configuration file, containing :
 * - fileName : string, name of file to download
 * - styles.url : string, url of css folder (hosted on azure)
 * - stiles.files : array<string>, name of css files to use, at the url
 * @param {string} parameters.jsReportApi js report api (e.g store.api.jsReport)
 */
const pdfDownload = ({ pageList, store, intl, config, jsReportApi }) =>
  new Promise(async (resolve, reject) => {
    const RootEl = (props) => {
      return store ? (
        <Provider store={store}>
          <IntlProvider locale={intl.locale} messages={intl.messages}>
            {props.children}
          </IntlProvider>
        </Provider>
      ) : (
        <IntlProvider locale={intl.locale} messages={intl.messages}>
          {props.children}
        </IntlProvider>
      );
    };

    try {
      const reportEl = (
        <>
          <head>
            <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
            {config.styles.files.map((file, i) => (
              <link
                key={i}
                rel="stylesheet"
                type="text/css"
                href={`${config.styles.url}${file}`}
              />
            ))}
          </head>
          <body>
            <RootEl>
              <div id="pdf-download-root">
                {pageList.map((elem, i) => (
                  <div key={i} className="page">
                    {elem}
                  </div>
                ))}
              </div>
            </RootEl>
          </body>
        </>
      );

      const renderingDoc = document.createElement("html");
      ReactDOM.render(reportEl, renderingDoc);

      const jsReportReponse = await ApiService(
        `${jsReportApi}api/report`,
        "POST",
        JSON.stringify({
          template: {
            shortid: "l1DbOPsN5",
            content: renderingDoc.outerHTML,
            recipe: "chrome-pdf",
            engine: "handlebars",
            chrome: {
              width: "210mm",
              height: "297mm",
            },
          },
        }),
        "blob"
      );
      FileSaver.saveAs(jsReportReponse.data, `${config.fileName}.pdf`);
      resolve();
    } catch (err) {
      console.error(err);
      reject();
    }
  });

export default pdfDownload;
