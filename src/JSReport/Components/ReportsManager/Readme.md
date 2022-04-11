If you need to use this component and custom it following your package needs, I would recommand to take a look at the package-chillers-emea file, made with styled components (more readable & maintanable than makeStyles). You can find this file at https://scegithub.apps.carrier.com/SCE/NGECAT-PackagedChillersEMEA/tree/package-workflow-mvp1/src/components/shared/reports/manager .
If you just need to use this component without any customizations, feel free to use this one.

**Introduction**

Reports manager component is available on the right side panel of the EMEA workflow. This feature now allows to open again any reports you generated during your session, preview it and/or download it. You also have now a quick access to the main information.
This component is currently hosted directly in the EMEA chillers workflow, but will be moved to the NGEACT-ReactComponents soon. It is composed of a fully generic display component that can be used by any regions, and a logic component (specific to regions)

`import {ReportManager, pdfDownload} from '@carrier/ngecat-reactcomponents'`

![image](https://scegithub.apps.carrier.com/storage/user/601/files/2ca5d980-3d99-11ec-93ed-cb8dea7c7a50)

Just choose a model, and preview a report :
![image](https://scegithub.apps.carrier.com/storage/user/601/files/421b0380-3d99-11ec-8fb8-d6ccd4faa3ce)

![image](https://scegithub.apps.carrier.com/storage/user/601/files/77275600-3d99-11ec-9e34-7fc57e7e0450)

The classic report preview is opened.
Then, if you close the preview and click on the report manager component, you will see your report and its loading progress.

![image](https://scegithub.apps.carrier.com/storage/user/601/files/6e165b80-b232-11eb-85e0-894a035ceaf3)

At every moment, you can preview again your report.

![image](https://scegithub.apps.carrier.com/storage/user/601/files/60fa6c00-b234-11eb-9d0e-7d4b301bf9fa)

Once generated (and after your post calculation checks if needed), you can download the PDF report.

![image](https://scegithub.apps.carrier.com/storage/user/601/files/a158ea80-b232-11eb-9e75-7d9041a3329e)

Then, the loading spinner starts again when downloading the file.

![image](https://scegithub.apps.carrier.com/storage/user/601/files/afa70680-b232-11eb-985c-75320c830aa8)

![image](https://scegithub.apps.carrier.com/storage/user/601/files/b766ab00-b232-11eb-9008-46ac78bbee23)

All the future reports you preview will be added.

![image](https://scegithub.apps.carrier.com/storage/user/601/files/e250ff00-b232-11eb-93e5-269bf3c7e8d1)

Also, you can accees easily some key information of the reports, like selected options, model brand, number and names of the pages...

![image](https://scegithub.apps.carrier.com/storage/user/601/files/6f955300-b235-11eb-9923-ae7ea2c80958)

If the api requests failed or calculations are declared as invalid, the user will be informed and won't be able to download ther report.

![image](https://scegithub.apps.carrier.com/storage/user/601/files/630ffb00-b233-11eb-91ac-cc441058bc36)

It is also compatible with other report types, like TDS and Factory Reports :

![image](https://scegithub.apps.carrier.com/storage/user/601/files/293ef480-b233-11eb-9ad3-e6082f56fb9c)
