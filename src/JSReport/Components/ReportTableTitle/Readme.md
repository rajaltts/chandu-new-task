# Report Table Title usage:
## Description:
Report Table Title component is used to display title in reports.

## Props which can be passed to report table title component:
titleInformation = {
    title: 'title for the respective table',
    style: {"inline styles as an object(name value pairs) to be applied to title"}
},
## Usage:
```
<ReportTableTitle
    titleInformation={titleInformation}
/>

### Note:
title prop is mandatory without which report table title will not load.
remaining props are optional, and the component will still work with default values.