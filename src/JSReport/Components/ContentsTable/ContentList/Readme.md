# Content List
It is a component which can be used to display list of contents in a table format

## Props passable to Component
content = array of objects which is used to display content of table in content list component(format is as follows:
    [{ label: "Unit", value: "1" }, { label: "Unit2", value: "2" } ]
),
header = name of the table header used in content list component,
classes = object of styles which can be applied to content list component. Style props passable in this object are as follows: 
{
    labelStyle: style object applied to left side value in table,
    valueStyle: style object applied to right side value in table,
    container: style object applied to container in table,
}

## Usage:
import in js file like below:
```
import { ContentList } from '@carrier/ngecat-reactcomponents';
```
Use below reference to use it like below in your component
```
<ContentList
    content={[{ label: "Unit", value: "1" }, { label: "Unit2", value: "2" } ]}
    header={"Shipping Dimensions"}
    classes={{ container: { "width": "300px" } }}
/>
```
or below if you don't want to pass any props
```
<ContentList />
```

### Note: 
1. Some or all props can be ommited while using this component and table will be shown with default content