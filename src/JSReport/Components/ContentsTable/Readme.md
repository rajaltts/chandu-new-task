# Content Table
It is combination of content list and report notes component

## Props passable to Component
content = array of objects which is used to display content of table in content list component(format is as follows:
    [{ label: "Unit", value: "1" }, { label: "Unit2", value: "2" } ]
),
header = name of the table header used in content list component,
notes = array of objects used to display notes at bottom of table and is used by report notes component(
    format is as follows: ['text 1', 'text 2']
),
notesType = type of note, i.e, numeric, roman, star, etc.,
classes = object of styles which can be applied to content list and report notes component. Style props passable in this object are as follows: 
{
    labelStyle: style object applied to left side value in table,
    valueStyle: style object applied to right side value in table,
    container: style object applied to container in table,
    olList: style object applied to list container in notes,
    liList: style object applied to list in notes
}

## Usage:
import in js file like below:
```
import { ContentTable } from '@carrier/ngecat-reactcomponents';
```
Use below reference to use it like below in your component
```
<ContentTable
    content={[{ label: "Unit", value: "1" }, { label: "Unit2", value: "2" } ]}
    header={"Shipping Dimensions"}
    classes={{ container: { "width": "300px" } }}
    notes={['text 1', 'text 2']}
/>
```
or below if you don't want to pass any props
```
<ContentTable />
```

### Note: 
1. Some or all props can be ommited while using this component and table will be shown with default content and no notes at bottom