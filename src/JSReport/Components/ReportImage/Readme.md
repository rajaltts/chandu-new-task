# Report Image usage:
## Description:
Report Image component is used to display images in reports. It takes a default image and size if no props is passed to the component(Default image can be seen in screenshots folder which is ReportImageDefault.png)

## Props which can be passed to report image component:
customImageProps = {
    src: 'url for the image (default value if not passed is https://stecatbuildersdev.blob.core.windows.net/ecatui/ecatimages/png/DefaultReportImage.png)',
    alt: "Alternate value if image is not available",
    height: "height of image",
    width: "width of image",
    style: {"inline styles as an object(name value pairs) to be applied to image"}
},
label = "name of image show below image",
id = 'id for the image',
classes = {}  'external styles which can be applied on label and container of image'

Below can passed in classes object:
text: style object to be applied on label
container: style object to be applied on image container

## Usage:
import in js file like below:
```
import { ReportImage } from '@carrier/ngecat-reactcomponents';
```
Use below reference to use it like below in your component
```
<ReportImage
    customImageProps={{
        height: 100px,
        width: 100px
    }}
    label={'default image'}
    id={'defaultimage'}
    classes={{text: { color: "blue" }}
/>
```
or below if you don't want to pass any props
```
<ReportImage />
```

### Note:
1. Report image src urls has to be from blobstorage(Ex: https://stecatbuildersdev.blob.core.windows.net/ecatui/ecatimages/png/DefaultReportImage.png) and should not be any local image/blob for it to be viewable in downloaded pdf.
2. Props passed are optional and some or all can be omitted and the component will still work with default values.