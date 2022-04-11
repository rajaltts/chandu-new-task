# ReportContainer usage:
ReportContainer component is used to display the content inside this. This acts as a Div element.
This would be the parent component for content in the Report.
This div provides the full width into the report.
You would need to just add your component inside this component

## Props which can be passed to HyperLink component:
import { ReportContainer } from '@carrier/ngecat-reactcomponents';

<ReportContainer>
    <div>This is Report Container</div>
</ReportContainer>

We have only a style props which you can pass to change any style for this component like below.

<ReportContainer style={{height: '300px', backgroundColor: 'Yellow'}}>
    <div>This is Report Container</div>
</ReportContainer>
