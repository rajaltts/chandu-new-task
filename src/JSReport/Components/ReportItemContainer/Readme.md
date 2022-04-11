# ReportItemContainer usage:
ReportItemContainer component is used to display the content inside ReportContainer. This acts as a Div element.
This would be the child component for content in the Report inside ReportContainer component.
You can use this component to divide the width of parent component which is ReportContainer component.

## Props which can be passed to HyperLink component:
import { ReportItemContainer } from '@carrier/ngecat-reactcomponents';

### To Show the component to take entire width of parent component
<ReportContainer>
    <ReportItemContainer style={{ width: "100%" }}>
        This is Taking enitre 100% width of parent Container
    </ReportItemContainer>
</ReportContainer>

### To Show the component to take 50% width of parent component
<ReportContainer>
    <ReportItemContainer style={{ width: "50%" }}>
        This is taking 50% width of parent Container
    </ReportItemContainer>
    <ReportItemContainer style={{ width: "50%" }}>
        This is taking 50% width of parent Container
    </ReportItemContainer>
</ReportContainer>

### To Show the component to take 50% width of parent component
<ReportContainer>
    <ReportItemContainer style={{ width: "30%" }}>
        This is taking 30% width of parent Container
    </ReportItemContainer>
    <ReportItemContainer style={{ width: "30%" }}>
        This is taking 30% width of parent Container
    </ReportItemContainer>
    <ReportItemContainer style={{ width: "40%" }}>
        This is taking 40% width of parent Container
    </ReportItemContainer>
</ReportContainer>


## We have only a style props which you can pass to change any style for this component like below.

<ReportContainer>
    <ReportItemContainer style={{width: "75%", backgroundColor: 'yellow'}}>
        This is Taking enitre 100% width of parent Container
    </ReportItemContainer>
</ReportContainer>
