import FileSaver from 'file-saver'
import { ApiService, endPoints } from '@carrier/workflowui-globalfunctions'
const PDFMerger = require('pdf-merger-js')

// Default file name cleanup
const defaultCleanup = (input) => (typeof input === 'string' ? input.replace(/[^a-zA-Z0-9]+/g, ' ').trim() : '')

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

const pdfDownload = ({ reportConfig, jsReportApi, fileName, cleanup = defaultCleanup, isWordReport, api }) =>
    // because of the calls that we make to jsreport backend, we can't get rid of this bad practice
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve, reject) => {
        try {
            const merger = new PDFMerger()
            const head = document.createElement('head')
            const meta = document.createElement('meta')
            meta.httpEquiv = 'Content-Type'
            meta.content = 'text/html; charset=utf-8'

            head.appendChild(meta)

            reportConfig?.styles?.files?.forEach((file, i) => {
                const link = document.createElement('link')
                link.key = `${i}`
                link.rel = 'stylesheet'
                link.type = 'text/css'
                link.href = `${reportConfig.styles.url}${file}`
                head.appendChild(link)
            })

            // FIXME: we need to send the final pdf directly to Adobe API and avoir using jsreport again
            if (isWordReport === true) {
                ApiService(
                    `${api}${endPoints.POST_PDF_TO_WORD}`,
                    'POST',
                    JSON.stringify({
                        template: {
                            shortid: 'l1DbOPsN5',
                            content: document.createElement('html'),
                            recipe: 'chrome-pdf',
                            engine: 'handlebars',
                            chrome: {
                                width: '793px',
                                height: '1122px',
                            },
                        },
                    })
                ).then((wordReponse) => {
                    FileSaver.saveAs(wordReponse.data, `${fileName}.docx`)
                    resolve()
                })
            }

            // Grab all pages from the dom
            const allPages = document.querySelectorAll('div.jsreport-page-main-wrapper')
            const pages = []

            // For each page and in parallel, trigger a jsreport call to get a pdf for the current page
            await Promise.all(
                [...allPages].map(async (page, i) => {
                    const renderingDoc = document.createElement('html')
                    const body = document.createElement('body')
                    const clonedPage = page.cloneNode(true)
                    body.appendChild(clonedPage)
                    renderingDoc.appendChild(head)
                    renderingDoc.appendChild(body)

                    const jsReportReponse = await ApiService(
                        `${jsReportApi}api/report`,
                        'POST',
                        JSON.stringify({
                            template: {
                                shortid: 'l1DbOPsN5',
                                content: renderingDoc.outerHTML,
                                recipe: 'chrome-pdf',
                                engine: 'handlebars',
                                chrome: {
                                    format: 'A4',
                                    landscape: page.id === 'landscape' ? true : false,
                                },
                            },
                        }),
                        'blob'
                    )
                    pages.push({ pageIndex: i, blob: jsReportReponse })
                })
            )

            // Sort pages by pageIndex to get them in the right order
            pages.sort((a, b) => a.pageIndex - b.pageIndex)
            // Merge all pages together
            for (const page of pages) {
                // We can't get rid easily of this bad practice because we want pages to be in the exact order
                // before saving final pdf
                // eslint-disable-next-line no-await-in-loop
                await merger.add(page.blob?.data)
            }
            // Save the final file
            FileSaver.saveAs(await merger.saveAsBlob(), `${cleanup(fileName)}.pdf`)
            resolve()
        } catch (err) {
            console.error(err)
            reject()
        }
    })

export default pdfDownload
