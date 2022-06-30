# Page Component
This component contains 1 sections:
1. Content

## Props passable to Dialog Component:
1. updateProjectInfo: contains projectInfo, customerId, isDisabled or not. 
2. customerNameList: list of customer names.
3. projectName: contains project id, value and error message.
4. customerName: contains customer id, value and error message and isDisabled or not.
5. contactName: contains contact id, value and error message and isDisabled or not.
6. contactEmail:  contains conatactEmail id, value and error message and isDisabled or not.
7. contactNumber: contains contactNumber id, value and error message and isDisabled or not
8. saveSelection: fuction to perform  save selection data.
9. tagName: contains isVisible, value and isDisabled values.

customerNameList = array of customer name which is used to display names in customer name  component(format is as follows:
    [
        {
            CustomerID: '50b356c8-b4fe-4156-ba63-5fd413aee21b',
            CustomerInformation: 'Test project',
            Owner: '4b4b5e84-8b70-4f56-b4a5-5aff80832ba5',
            CustomerName: 'Test project',
            IsActive: true,
            CreatedBy: '4b4b5e84-8b70-4f56-b4a5-5aff80832ba5',
            CreatedDate: '2022-03-04T07:04:05.153',
            LastModifiedBy: '4b4b5e84-8b70-4f56-b4a5-5aff80832ba5',
            LastModifiedDate: '2022-03-04T07:04:05.153',
            CompanyName: '',
            Email: '',
            Phone: '',
        },
),
updateProjectInfo = "ƒ updateProjectInfo() {}",
projectName = {},
customerName = (format is as follows:
{
    "id": "CustomerName",
    "value": "",
    "error": ""
  },),
contactName = (format is as follows:
{
    "id": "ContactName",
    "value": "",
    "error": ""
  },),
contactEmail = (format is as follows:
{
    "id": "ContactEmail",
    "value": "",
    "error": ""
  },),
contactNumber = (format is as follows:
{
    "id": "ContactNumber",
    "value": "",
    "error": ""
  },),
