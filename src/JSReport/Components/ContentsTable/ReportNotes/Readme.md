# Report Notes
It is a notes component which can be used to display notes at bottom of a table

## Props passable to Component
notes = array of objects used to display notes at bottom of table and is used by report notes component(
    format is as follows: ['text 1', 'text 2']
),
notesType = type of note, i.e, numeric, roman, star, etc.,
classes = object of styles which can be applied to report notes component. Style props passable in this object are as follows: 
{
    olList: style object applied to list container in notes,
    liList: style object applied to list in notes
}

## Usage:
import in js file like below:
```
import { ReportNotes } from '@carrier/ngecat-reactcomponents';
```
Use below reference to use it like below in your component
```
<ReportNotes
    notes={['text 1', 'text 2']}
    notesType='numeric'
/>
```
or below if you don't want to pass any props
```
<ReportNotes />
```

### Note: 
1. Some or all props can be ommited while using this component and table will be shown with no notes if no props passed