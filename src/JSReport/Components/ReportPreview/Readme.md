## Description

If you need to use this component and custom it following your package needs, I would recommand to take a look at the package-chillers-emea file, made with styled components (more readable & maintanable than makeStyles). You can find this file at https://scegithub.apps.carrier.com/SCE/NGECAT-PackagedChillersEMEA/tree/package-workflow-mvp1/src/components/shared/reports/preview .
If you just need to use this component without any customizations, feel free to use this one.

The ReportPreview hook is a generic component, used for display, navigation & download of reports. Reports can be downloaded as pdf. Word generation is not implemented.
This is only the view. You will need to create your own logic part and plug it to this component. You can find an example here : https://scegithub.apps.carrier.com/SCE/NGECAT-PackagedChillersEMEA/blob/develop/src/components/configuration-load/reports/preview/ReportPreviewContainer.jsx

`import {ReportPreview, pdfDownload} from '@carrier/ngecat-reactcomponents'`

![image](https://scegithub.apps.carrier.com/storage/user/601/files/2a3f8180-3d91-11ec-8251-baceaab52d44)

It can also manage errors :
![image](https://scegithub.apps.carrier.com/storage/user/601/files/bb195b80-3d97-11ec-9c42-4af05117b6f8)

Please see JSDoc for input props details.

![image](https://scegithub.apps.carrier.com/storage/user/601/files/cb030380-db49-11eb-9e0d-0d9ee46f1056)

**Configuration file**

The configuration file (reportsConfig) is an array of configuration object (one per report category). Each configuraiton object contains :

- a key (**one of them should be identical to the reportType props**)
- a reference to the component (content of the report, will be detailed below)
- a style object, containing:
  -- url : string, url of css folder (hosted on azure)
  -- files : array<string>, name of css files to use, at the url

![image](https://scegithub.apps.carrier.com/storage/user/601/files/38af2f80-db4a-11eb-8b47-21a2e3700645)

## Report content

The content of the report will be specific to your workflow and your needs.
For example, EMEA has multiple components as Customer Reports, Factory Reports and Technical Datasheet. These reports have a really specific design and will get data from apis, that won't be the same of other reports.

**Full example of a multi-pages report :**

1. Configuration file

![image](https://scegithub.apps.carrier.com/storage/user/601/files/2c79a100-db4f-11eb-9195-ba5f48f17a2d)

Then, upload your css files on an azure container. If you use scss, please convert them when copy-pasting your style on your hosted file (you can use a conversion tool like https://jsonformatter.org/scss-to-css)

2. Content component

You can wrap your pages in a React fragment. Each pages should be a react component, that contains a parent div element **with the js-report-page-wrapper class**.

![image](https://scegithub.apps.carrier.com/storage/user/601/files/862d9b80-db4e-11eb-8ed1-495951aebe68)

3. Use the preview component

![image](https://scegithub.apps.carrier.com/storage/user/601/files/b4ac7600-db50-11eb-8819-b9ed28c73ee9)

## Children design patterns

You can base on the following file : https://scegithub.apps.carrier.com/SCE/NGECAT-PackagedChillersEMEA/blob/develop/src/components/configuration-load/reports/customer-report/CustomerReport.jsx

**1) Redux connexion**

Need to pass the following redux actions to props :

- **saveJSReportsData** : save and update reports data in the jsReportsReducer store
- **getApiData** : e.g getCalcEngineData, which fetch an api and update data in the jsReportsReducer store

**2) Props**

- **updateList** : callback function to send report content to parent when data is refreshed
- **setReportDownloadable** : callbackfunction. Set to true when APIs results are received and data is processed, to allow download.
- **setErrorMessage** : callback function. Used to display a popup error message during preview
- **preLoadedStoreIndex** : number (Optional). Index of report in the redux store, if it is already generated. Used only by reports manager, for a preview of an existing report.
- **preLoadedReport** : object (Optional) Data of first preview of report. Used only by reports manager, for a preview of an existing report.

**3) State**

- **index** : index of report in the redux store
- **isApiProcessed** : boolean flag, set to true when the results of api are received
- **reportHooks** : array of hooks (one for each page of the report)
- **reportData** : object, representing all the data of the report
- **flags** (optional) : used for conditional display, coming from rules

**4) Selectors**

To make report refresh correctly we need to use few selectors

- **reports** : all reports of the store
- **report** : the current report, in the store
- **apiResults** : results of api of the current report, in the store
- **apiError** : error of api

**5) useEffect**

- **First rendering** : report initial redux saving and api fetch (if it is an initial preview and there is no pre-loaded report)
- When selector **apiResults** changes : if results, update isApiProcessed and allows to download the report else throw error with the setErrorMessage callback
- When **isApiProcessed** and **reportData** is updated : update reportHooks, pass them to the parents with the updateList callback, save data with saveJSReportData, and renders them.

**6) Rendering**

- renders all the **pages** of the report, using reportHooks. As results of apis is passed to the pages and thanks to the selectors, report rendering is refreshed every time data is updated.
