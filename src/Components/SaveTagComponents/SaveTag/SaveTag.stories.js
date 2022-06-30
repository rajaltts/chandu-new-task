import React, { useState } from 'react'
import SaveTag from './saveTag'

export default {
    title: 'Save Tag',
    component: SaveTag,
}

const SaveTagTemplate = ({ ...args }) => {
    const [isClose, setIsclose] = useState(true)
    const hideComponent = () => {
        setIsclose(!isClose)
    }

    const dataList = [
        {
            ProjectID: '1ffd7597-e34d-470b-8ed5-873d04d071a0',
            ProjectName: 'testJune3',
            CreatedBy: 'bbbcf126-6e81-43ba-81a1-e3450fceba5c',
            LastModifiedBy: 'bbbcf126-6e81-43ba-81a1-e3450fceba5c',
            LastModifiedUser: 'A B C',
            LastModifiedDate: '2022-06-03T09:23:03',
            CustomerId: '742010ed-2df0-4be3-b224-1bc9835d8309',
            ProjectCustomer: '',
            OwnerName: '{"FirstName":"A B C","LastName":"C"}',
            UserRole: 'Viewer',
            SharedWith: 'AP,SR,AS',
            IsFavorite: false,
            IsArchived: false,
            SharedUserList: [
                '{Email: "Abc.PQR@Carrier.com", FirstName: "Ab…}',
                '{Email: "Stv.R@carrier.com", FirstName…}',
                '{Email: "Abc.S@carrier.com", FirstName: "A…}',
            ],
        },
        {
            ProjectID: '1ffd7597-e34d-470b-8ed5-873d04d071a1',
            ProjectName: 'Project 944104',
            CreatedBy: 'bbbcf126-6e81-43ba-81a1-e3450fceba5c',
            LastModifiedBy: 'bbbcf126-6e81-43ba-81a1-e3450fceba5c',
            LastModifiedUser: 'A B C',
            LastModifiedDate: '2022-06-03T09:23:03',
            CustomerId: '742010ed-2df0-4be3-b224-1bc9835d8501',
            ProjectCustomer: '',
            OwnerName: '{"FirstName":"A B C","LastName":"C"}',
            UserRole: 'Viewer',
            SharedWith: 'AP,SR,AS',
            IsFavorite: false,
            IsArchived: false,
            SharedUserList: [
                '{Email: "Abc.PQR@Carrier.com", FirstName: "Ab…}',
                '{Email: "Stv.R@carrier.com", FirstName…}',
                '{Email: "Abc.S@carrier.com", FirstName: "A…}',
            ],
        },
    ]

    const customerList = [
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
        {
            CustomerID: '50b356c8-b4fe-4156-ba63-5fd413aee21c',
            CustomerInformation: 'Test project QA',
            Owner: '4b4b5e84-8b70-4f56-b4a5-5aff80832ba5',
            CustomerName: 'Test project QA',
            IsActive: true,
            CreatedBy: '4b4b5e84-8b70-4f56-b4a5-5aff80832ba5',
            CreatedDate: '2022-03-04T07:04:05.153',
            LastModifiedBy: '4b4b5e84-8b70-4f56-b4a5-5aff80832ba5',
            LastModifiedDate: '2022-03-04T07:04:05.153',
            CompanyName: '',
            Email: '',
            Phone: '',
        },
    ]

    const tagvalue = () => {
        return {
            isVisible: true,
            value: '',
            isDisabled: false,
        }
    }

    const constructSaveTagObject = (saveTagData) => {
        if (saveTagData.newProjectData) {
            return alert(
                saveTagData.newProjectData.projectInfo.TagName.value +
                    saveTagData.newProjectData.projectInfo.ProjectName.value
            )
        } else {
            return alert(saveTagData.exisitingProjectData.projectData.ProjectName)
        }
    }

    const setErrorMessage = () => {
        return
    }

    const searchTextChange = () => {
        return
    }

    return (
        <SaveTag
            {...args}
            isModalOpen={isClose}
            hideComponent={hideComponent}
            projectDataList={dataList}
            saveTagData={constructSaveTagObject}
            customerNameList={customerList}
            tagName={tagvalue}
            setError={setErrorMessage}
            onSearchTextChange={searchTextChange}
        />
    )
}

const SaveTagTemplateDefaultProject = ({ ...args }) => {
    const [isClose, setIsclose] = useState(true)
    const hideComponent = () => {
        setIsclose(!isClose)
    }

    const dataList = [
        {
            ProjectID: '1ffd7597-e34d-470b-8ed5-873d04d071a0',
            ProjectName: 'testJune3',
            CreatedBy: 'bbbcf126-6e81-43ba-81a1-e3450fceba5c',
            LastModifiedBy: 'bbbcf126-6e81-43ba-81a1-e3450fceba5c',
            LastModifiedUser: 'A B C',
            LastModifiedDate: '2022-06-03T09:23:03',
            CustomerId: '742010ed-2df0-4be3-b224-1bc9835d8309',
            ProjectCustomer: '',
            OwnerName: '{"FirstName":"A B C","LastName":"C"}',
            UserRole: 'Viewer',
            SharedWith: 'AP,SR,AS',
            IsFavorite: false,
            IsArchived: false,
            SharedUserList: [
                '{Email: "Abc.PQR@Carrier.com", FirstName: "Ab…}',
                '{Email: "Stv.R@carrier.com", FirstName…}',
                '{Email: "Abc.S@carrier.com", FirstName: "A…}',
            ],
        },
        {
            ProjectID: '1ffd7597-e34d-470b-8ed5-873d04d071a1',
            ProjectName: 'Project 944104',
            CreatedBy: 'bbbcf126-6e81-43ba-81a1-e3450fceba5c',
            LastModifiedBy: 'bbbcf126-6e81-43ba-81a1-e3450fceba5c',
            LastModifiedUser: 'A B C',
            LastModifiedDate: '2022-06-03T09:23:03',
            CustomerId: '742010ed-2df0-4be3-b224-1bc9835d8501',
            ProjectCustomer: '',
            OwnerName: '{"FirstName":"A B C","LastName":"C"}',
            UserRole: 'Viewer',
            SharedWith: 'AP,SR,AS',
            IsFavorite: false,
            IsArchived: false,
            SharedUserList: [
                '{Email: "Abc.PQR@Carrier.com", FirstName: "Ab…}',
                '{Email: "Stv.R@carrier.com", FirstName…}',
                '{Email: "Abc.S@carrier.com", FirstName: "A…}',
            ],
        },
    ]

    const customerList = [
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
        {
            CustomerID: '50b356c8-b4fe-4156-ba63-5fd413aee21c',
            CustomerInformation: 'Test project QA',
            Owner: '4b4b5e84-8b70-4f56-b4a5-5aff80832ba5',
            CustomerName: 'Test project QA',
            IsActive: true,
            CreatedBy: '4b4b5e84-8b70-4f56-b4a5-5aff80832ba5',
            CreatedDate: '2022-03-04T07:04:05.153',
            LastModifiedBy: '4b4b5e84-8b70-4f56-b4a5-5aff80832ba5',
            LastModifiedDate: '2022-03-04T07:04:05.153',
            CompanyName: '',
            Email: '',
            Phone: '',
        },
    ]
    const defaultSelectedProjectData = {
        ProjectID: '1ffd7597-e34d-470b-8ed5-873d04d071a0',
        ProjectName: 'testJune3',
        CustomerID: '3e1c2058-7122-4e15-b6b3-81f5fd7ac319',
        UserRole: 'Owner',
    }

    const constructSaveTagObject = (saveTagData) => {
        if (saveTagData.newProjectData) {
            return alert(
                saveTagData.newProjectData.projectInfo.TagName.value +
                    saveTagData.newProjectData.projectInfo.ProjectName.value
            )
        } else {
            return alert(saveTagData.exisitingProjectData.projectData.ProjectName)
        }
    }

    const setErrorMessage = () => {
        return
    }

    const searchTextChange = () => {
        return
    }

    return (
        <SaveTag
            {...args}
            isModalOpen={isClose}
            hideComponent={hideComponent}
            projectDataList={dataList}
            saveTagData={constructSaveTagObject}
            customerNameList={customerList}
            defaultSelectedProject={defaultSelectedProjectData}
            setError={setErrorMessage}
            onSearchTextChange={searchTextChange}
        />
    )
}

export const SaveTagModal = SaveTagTemplate.bind({})
SaveTagModal.args = {
    errorMsg: '',
    contactName: '',
    contactEmail: '',
    contactNumber: '',
    isLoading: false,
}

export const SaveTagModalDefaultProject = SaveTagTemplateDefaultProject.bind({})
SaveTagModalDefaultProject.args = {
    errorMsg: '',
    contactName: '',
    contactEmail: '',
    contactNumber: '',
    isLoading: false,
}
