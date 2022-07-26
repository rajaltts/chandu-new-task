import React from 'react'
import CustomGrid from './CustomGrid'

export default {
    title: 'Component/CustomGrid',
    component: CustomGrid,
}

const CustomGridTemplate = ({ ...args }) => {
    const configSettings = {
        ProjectName: {
            lookUpKey: 'ProjectName',
            columnType: 'textBox',
            isEditable: true,
            onDoubleClick: null,
            validations: {
                validation: null,
            },
            className: '',
        },
        ProjectCustomer: {
            lookUpKey: 'ProjectCustomer',
            columnType: '',
            component: null,
            className: '',
        },
        UserRole: {
            lookUpKey: 'UserRole',
        },
        OwnerName: {
            lookUpKey: 'OwnerName',
            formatValue: null,
        },
        SharedWith: {
            lookUpKey: 'SharedWith',
            columnType: '',
            alt: '',
            component: null,
        },
        LastModifiedDate: {
            lookUpKey: 'LastModifiedDate',
            columnType: 'date',
            format: 'DD/MM/YYYY hh:mm A',
            updatedByKey: 'LastModifiedUser',
            className: '',
        },
        Actions: {
            lookUpKey: 'Actions',
            columnType: 'meatballMenu',
        },
    }
    return <CustomGrid {...args} config={configSettings}></CustomGrid>
}

const CustomGridForSelectionsTemplate = ({ ...args }) => {
    return <CustomGrid {...args}></CustomGrid>
}

const CustomGridForSearchTemplate = ({ ...args }) => {
    const OnSearchvalueChanged = () => {
        alert('onSearch event fired')
    }
    return <CustomGrid {...args} onSearch={OnSearchvalueChanged}></CustomGrid>
}

const CustomGridForCachedTemplate = ({ ...args }) => {
    return <CustomGrid {...args}></CustomGrid>
}

const CustomGridForGroupingTemplate = ({ ...args }) => {
    return <CustomGrid {...args}></CustomGrid>
}

export const NormalCustomGridComponent = CustomGridTemplate.bind({})
NormalCustomGridComponent.args = {
    selectedRows: [],
    rows: [
        {
            ProjectID: '3c8ff9af-b62b-48c9-8919-778b86c2dece',
            ProjectName: 'Project 134809',
            CreatedBy: '4b4b5e84-8b70-4f56-b4a5-5aff80832ba5',
            LastModifiedBy: '4b4b5e84-8b70-4f56-b4a5-5aff80832ba5',
            LastModifiedUser: 'User 1',
            LastModifiedDate: '2022-06-29T21:25:30',
            CustomerId: '645416b1-4513-4613-b524-ee2212eb2c46',
            ProjectCustomer: 'User 1',
            OwnerName: 'User 1',
            UserRole: 'Owner',
            SharedWith: 'AP,SR',
            IsFavorite: false,
            IsArchived: false,
            SharedUserList: [
                {
                    UserId: '5f3e8ac4-ddee-44c7-9a8d-401c12ffc273',
                    Email: 'A.P@Carrier.com',
                    FirstName: 'A',
                    LastName: 'P',
                    Role: 'Viewer',
                },
            ],
        },
    ],
    headCells: [
        {
            name: 'ProjectName',
            displayName: 'Project',
            className: '',
            sortingClassName: '',
        },
        {
            name: 'ProjectCustomer',
            displayName: 'Customer',
            disableSorting: true,
            className: '',
            sortingClassName: '',
        },
        {
            name: 'OwnerName',
            displayName: 'Owner',
            disableSorting: true,
            className: '',
            sortingClassName: '',
        },
        {
            name: 'SharedWith',
            displayName: 'Shared with',
            disableSorting: true,
            className: '',
            sortingClassName: '',
        },
        {
            name: 'LastModifiedDate',
            displayName: 'Last update',
            className: '',
            sortingClassName: '',
        },
        {
            name: 'Actions',
            displayName: ' ',
            disableSorting: true,
            className: '',
            sortingClassName: '',
        },
    ],
    rowsPerPageOptions: [5, 10, 20, 100],
    config: {
        ProjectName: {
            lookUpKey: 'ProjectName',
            columnType: 'textBox',
            isEditable: true,
            onDoubleClick: null,
            validations: {
                validation: null,
            },
            className: '',
        },
        ProjectCustomer: {
            lookUpKey: 'ProjectCustomer',
            columnType: 'customComponent',
            component: null,
            className: '',
        },
        UserRole: {
            lookUpKey: 'UserRole',
        },
        OwnerName: {
            lookUpKey: 'OwnerName',
            formatValue: null,
        },
        SharedWith: {
            lookUpKey: 'SharedWith',
            columnType: 'customComponent',
            alt: 'Shared With',
            component: null,
        },
        LastModifiedDate: {
            lookUpKey: 'LastModifiedDate',
            columnType: 'date',
            format: 'DD/MM/YYYY hh:mm A',
            updatedByKey: 'LastModifiedUser',
            className: '',
        },
        Actions: {
            lookUpKey: 'Actions',
            columnType: 'meatballMenu',
            component: {
                $$typeof: '',
                type: null,
                compare: null,
            },
        },
    },
    showCheckbox: false,
    rowsToShowPerPage: 100,
    sortable: true,
    orderByfield: 'LastModifiedDate',
    uniqueKey: 'customGrid',
    rowCheckboxHandler: null,
    rowOnclickHandler: null,
    hidePagination: false,
    hideSearch: true,
    isLoading: false,
    gridClassName: '',
    singleSelectGrid: false,
    doNotTranslate: true,
    id: 'customGrid',
    sorting: 'desc',
    gridStateHandler: null,
    pageNumber: 0,
    stateLessGrid: true,
    totalPageCount: 'rows.length',
    showLinearProgress: false,
    clickOnRowHighlight: false,
    rowHighlightClassName: null,
    rowClassName: null,
    columnPicker: false,
    columnGrouping: true,
    showDivider: true,
    reset: false,
    hideHeader: false,
}

export const CustomGridForSelectionTagsComponent = CustomGridForSelectionsTemplate.bind({})
CustomGridForSelectionTagsComponent.args = {
    rows: [
        {
            TagId: 'f5d6d345-39fa-4984-93de-c25b6e9d3f08',
            ProjectId: '53eac57c-4708-4c2c-b88d-c7b7acee96cb',
            ValidConfigurationState: 1,
            ValidPerformance: 1,
            TagVersion: '1.0.0.0',
            TagQty: 1,
            TagName: 'teas',
            PartNumber: '48A3E030-QG541AA',
            TagInformation: '',
            IsActive: true,
            CreatedBy: '5152d792-e257-4523-a15b-0865ab9774a3',
            CreatedDate: '0001-01-01T00:00:00',
            LastModifiedBy: ' ',
            LastModifiedDate: '2022-07-13T13:03:19',
            TagModel: '48A',
            TagSize: '30 Tons',
            TagSelectionId: '00000000-0000-0000-0000-000000000000',
            IsFactoryTestComplete: false,
            StartingEquipTypeCode: 0,
            ProductBuilder: 'ae495a99-9fb9-41a1-82cd-0ced358cc3ba',
            ComponentPerfVariables: '',
            TotalCount: 3,
            IsLockedMode: false,
            UIBuilderDetails: {
                TagActions: [
                    {
                        action: 'IsEditSelection',
                        enable: true,
                    },
                    {
                        action: 'IsDeleteTag',
                        enable: true,
                    },
                    {
                        action: 'IsReports',
                        enable: true,
                        component: {
                            $$typeof: 'Symbol(react.lazy)',
                            _ctor: 'ƒ () {}',
                            _status: -1,
                            _result: null,
                        },
                    },
                    {
                        action: 'IsCopyTag',
                        enable: true,
                    },
                    {
                        action: 'IsCopyTagToProject',
                        enable: true,
                    },
                    {
                        action: 'IsDrawingManager',
                        enable: true,
                    },
                    {
                        action: 'Status',
                        enable: true,
                        statusType: 1,
                    },
                    {
                        action: 'IsUpgrade',
                        enable: false,
                    },
                    {
                        enable: true,
                    },
                ],
                GridActions: {
                    IsCsoExport: {
                        enable: true,
                    },
                    IsExportToQuotePro: {
                        enable: true,
                    },
                    IsMultiTagEdit: {
                        enable: true,
                        configuration: { ProductType: 'Applied Rooftops NAO' },
                    },
                },
                AdditionalDetails: {
                    TagModel: '48A3E030-QG541AA',
                    TagVersion: '1.0.0.0',
                    ChillerCoolingCapacity: '30 Tons',
                    ChillerArrange: 'N/A',
                    CurrentVersion: '1.0.0.0',
                    SVP: 'N/A',
                    CRMReference: 'N/A',
                    Price: 'N/A',
                    Comment: 'N/A',
                },
            },
        },
    ],
    headCells: [
        {
            name: 'TagName',
            displayName: 'Selection Name',
            isSelected: true,
            isDefaultSelection: true,
        },
        {
            name: 'TagModel',
            displayName: 'Model',
            isSelected: true,
            isDefaultSelection: true,
        },
        {
            name: 'CRMReference',
            displayName: 'CRMReference',
            isSelected: false,
            isDefaultSelection: false,
        },
        {
            name: 'Price',
            displayName: 'Price',
            isSelected: false,
            isDefaultSelection: false,
        },
        {
            name: 'ChillerArrange',
            displayName: 'Chiller Arrangement',
            isSelected: true,
            isDefaultSelection: false,
        },
        {
            name: 'ChillerCoolingCapacity',
            displayName: 'Capacity',
            isSelected: true,
            isDefaultSelection: false,
        },
        {
            name: 'TagQty',
            displayName: 'Quantity',
            isSelected: true,
            isDefaultSelection: true,
        },
        {
            name: 'Comment',
            displayName: 'Comment',
            isSelected: false,
            isDefaultSelection: false,
        },
        {
            name: 'SVP',
            displayName: 'SVP',
            isSelected: false,
            isDefaultSelection: false,
        },
        {
            name: 'LastModifiedDate',
            displayName: 'Date Modified',
            isSelected: true,
            isDefaultSelection: true,
        },
        {
            name: 'Actions',
            displayName: 'Actions',
            disableSorting: true,
            className: 'jss282',
            isSelected: true,
            isDefaultSelection: true,
        },
    ],
    rowsPerPageOptions: [5, 10, 20, 100],
    config: {
        TagName: {
            lookUpKey: 'UIBuilderDetails-AdditionalDetails-TagName:TagName',
            columnType: 'textBox',
            isEditable: true,
            onDoubleClick: null,
            validations: {
                validation: null,
            },
            validationsOnLoading: true,
        },
        TagModel: {
            lookUpKey: 'UIBuilderDetails-AdditionalDetails-TagModel:TagModel',
        },
        CRMReference: {
            lookUpKey: 'UIBuilderDetails-AdditionalDetails-CRMReference:CRMReference',
        },
        Price: {
            lookUpKey: 'UIBuilderDetails-AdditionalDetails-Price:Price',
        },
        ChillerArrange: {
            lookUpKey: 'UIBuilderDetails-AdditionalDetails-ChillerArrange:ChillerArrange',
        },
        ChillerCoolingCapacity: {
            lookUpKey: 'UIBuilderDetails-AdditionalDetails-ChillerCoolingCapacity:ChillerCoolingCapacity',
            isNumericSort: true,
        },
        SVP: {
            lookUpKey: 'UIBuilderDetails-AdditionalDetails-SVP:SVP',
        },
        TagQty: {
            lookUpKey: 'UIBuilderDetails-AdditionalDetails-TagQty:TagQty',
            columnType: 'number',
            isEditable: true,
            onDoubleClick: null,
            validations: {
                validation: null,
            },
        },
        Comment: {
            lookUpKey: 'UIBuilderDetails-AdditionalDetails-Comment:Comment',
            isEditable: true,
            columnType: 'textBox',
            onDoubleClick: null,
            validations: {
                validation: null,
            },
        },
        LastModifiedDate: {
            lookUpKey: 'UIBuilderDetails-AdditionalDetails-LastModifiedDate:LastModifiedDate',
            columnType: 'date',
            format: 'MM/DD/YYYY LT',
        },
        Actions: {
            lookUpKey: 'UIBuilderDetails-TagActions',
            columnType: 'customComponent',
            alt: 'Actions',
            component: null,
        },
    },
    gridClassName: '',
    showCheckbox: true,
    doNotTranslate: false,
    isLoading: false,
    hideSearch: true,
    sortable: true,
    orderByfield: 'LastModifiedDate',
    rowCheckboxHandler: null,
    rowOnclickHandler: null,
    sorting: 'desc',
    showLinearProgress: false,
    columnPicker: true,
    saveColumnHandler: null,
    rowsToShowPerPage: 100,
    uniqueKey: 'TagId',
}

export const CustomGridForSearchTagsComponent = CustomGridForSearchTemplate.bind({})
CustomGridForSearchTagsComponent.args = {
    rows: [
        {
            Name: null,
            DocumentNames: ['HyperLink', 'Chiller', 'Category', 'Document'],
            Document: 'Help_19DV.pdf',
            Category: 'Help',
            FileHyperLinkName: 'Help',
            FileExtention: '.pdf',
            ProductBuilderModel: null,
            ContainerName: 'asiabuilder',
            Chiller: '19DV',
        },
        {
            Name: null,
            DocumentNames: ['HyperLink', 'Chiller', 'Category', 'Document'],
            Document: 'Help_19PV.pdf',
            Category: 'Help',
            FileHyperLinkName: 'Help',
            FileExtention: '.pdf',
            ProductBuilderModel: null,
            ContainerName: 'asiabuilder',
            Chiller: '19PV',
        },
        {
            Name: null,
            DocumentNames: ['HyperLink', 'Chiller', 'Category', 'Document'],
            Document: 'Help_30DW.pdf',
            Category: 'Help',
            FileHyperLinkName: 'Help',
            FileExtention: '.pdf',
            ProductBuilderModel: null,
            ContainerName: 'asiabuilder',
            Chiller: '30DW',
        },
    ],
    headCells: [
        {
            name: 'HyperLink',
            displayName: '',
            className: 'hyperLinkColumn',
        },
        {
            name: 'Chiller',
            displayName: '',
            className: 'ChillerColumn',
        },
        {
            name: 'Category',
            displayName: '',
            className: 'categoryColumn',
        },
        {
            name: 'Document',
            displayName: '',
        },
    ],
    rowsPerPageOptions: [5, 10, 20, 100, 'All'],
    config: {
        HyperLink: {
            lookUpKey: 'FileHyperLinkName',
            columnType: 'url',
            onClick: null,
        },
        Document: {
            lookUpKey: 'Document',
            formatValue: null,
        },
        Category: {
            lookUpKey: 'Category',
        },
    },
    orderByfield: 'Category',
    sortable: true,
    isLoading: false,
    onSearch: null,
    doNotTranslate: false,
    uniqueKey: 'TagId',
}

export const CustomGridForCachedTagsComponent = CustomGridForCachedTemplate.bind({})
CustomGridForCachedTagsComponent.args = {
    selectedRows: [],
    gridClassName: '',
    rows: [
        {
            Row: 1,
            Report: '/Images/Report.png',
            type: '',
            Id: '61196580-20ea-4db7-9841-51f687c20358',
            Model: '19DV-G20G224425B9',
            textAlign: 'center',
            'Cooler Passes': '2',
            'Condenser Passes': '2',
            Capacity: '600.0',
            'Chiller Input': '299.7',
            'Cooling Efficiency': '0.4995',
            'Cooler Pressure Drop': '29.5',
            'Condenser Pressure Drop': '20.3',
            'NPLV kW/ton': '0.2995',
            Budget: '5698',
        },
    ],
    headCells: [
        {
            name: 'Row',
            displayName: '',
        },
        {
            name: 'Report',
            displayName: '',
            disableSorting: true,
        },
        {
            name: 'Model',
            displayName: '',
            className: 'HeaderCell_Min_Width',
            textAlign: 'center',
            subHeader: '',
        },
        {
            name: 'Cooler Passes',
            displayName: '',
            className: 'HeaderCell_Min_Width',
            textAlign: 'center',
            subHeader: '',
        },
        {
            name: 'Condenser Passes',
            displayName: '',
            className: 'HeaderCell_Min_Width',
            textAlign: 'center',
            subHeader: '',
        },
        {
            name: 'Capacity',
            displayName: '',
            className: 'HeaderCell_Min_Width',
            textAlign: 'center',
            subHeader: '(tonR)',
        },
        {
            name: 'Chiller Input',
            displayName: '',
            className: 'HeaderCell_Min_Width',
            textAlign: 'center',
            subHeader: '(kW)',
        },
        {
            name: 'Cooling Efficiency',
            displayName: '',
            className: 'HeaderCell_Min_Width',
            textAlign: 'center',
            subHeader: '(kW/tonʀ)',
        },
        {
            name: 'Cooler Pressure Drop',
            displayName: '',
            className: 'HeaderCell_Min_Width',
            textAlign: 'center',
            subHeader: '(ft H2O)',
        },
        {
            name: 'Condenser Pressure Drop',
            displayName: '',
            className: 'HeaderCell_Min_Width',
            textAlign: 'center',
            subHeader: '(ft H2O)',
        },
        {
            name: 'NPLV kW/ton',
            displayName: '',
            className: 'HeaderCell_Min_Width',
            textAlign: 'center',
            subHeader: '(kW/tonʀ)',
        },
        {
            name: 'Budget',
            displayName: '',
            className: 'HeaderCell_Min_Width',
            textAlign: 'center',
            subHeader: '(RMB/ton)',
        },
    ],
    config: {
        Report: {
            columnType: 'icon',
            alt: 'Report',
            onClick: null,
        },
    },
    showCheckbox: true,
    orderByfield: 'Row',
    uniqueKey: 'Id',
    sortable: true,
    hideSearch: true,
    selectAllCheckboxHandler: null,
    rowCheckboxHandler: null,
    rowsPerPageOptions: [5, 10, 25, 100],
    rowsToShowPerPage: 100,
    doNotTranslate: false,
}

export const CustomGridForGroupingTagsComponent = CustomGridForGroupingTemplate.bind({})
CustomGridForGroupingTagsComponent.args = {
    selectedRows: [],
    rows: [
        {
            CheckBoxId: '64da0d6d-c920-9814-0f6a-d3b7add3e4f1',
            Model: '30RC',
            UnitSize: '080',
            Tier: 'S',
            CoolingCapacity: '73.1701',
        },
        {
            CheckBoxId: '26438424-6f2a-694a-e2e3-0be7368b4938',
            Model: '30RC',
            UnitSize: '100',
            Tier: 'S',
            CoolingCapacity: '90.0373',
        },
        {
            CheckBoxId: '54fddc75-3548-8b45-4f16-2ce3734362da',
            Model: '30RC',
            UnitSize: '090',
            Tier: 'S',
            CoolingCapacity: '81.2240',
        },
        {
            CheckBoxId: '774cf27e-ecc9-11ea-86a2-c589a66a5529',
            Model: '30RC',
            UnitSize: '110',
            Tier: 'S',
            CoolingCapacity: '100.256',
        },
        {
            CheckBoxId: '74b61ebe-92e5-0cb7-6c7c-0f232c46196e',
            Model: '30RC',
            UnitSize: '120',
            Tier: 'S',
            CoolingCapacity: '111.907',
        },
        {
            CheckBoxId: '0fec3f54-d381-fc40-069a-fb22649d56c1',
            Model: '30RC',
            UnitSize: '130',
            Tier: 'S',
            CoolingCapacity: '123.584',
        },
        {
            CheckBoxId: '10501657-fd28-6752-3810-e752ab3a1530',
            Model: '30RC',
            UnitSize: '150',
            Tier: 'S',
            CoolingCapacity: '134.646',
        },
    ],
    headCells: [
        {
            name: 'Model',
            displayName: 'Model',
            disableSorting: false,
            className: '',
        },
        {
            name: 'UnitSize',
            displayName: 'Unit Size',
            disableSorting: false,
            className: '',
        },
        {
            name: 'Tier',
            displayName: 'Tier',
            disableSorting: false,
            className: '',
        },
        {
            name: 'CoolingCapacity',
            displayName: 'Cooling Capacity',
            subHeader: 'Tons',
            disableSorting: false,
            className: '',
            columnGrp1: 'Cooling',
        },
    ],
    config: {
        Model: {
            lookUpKey: 'Model',
            columnType: 'textBox',
        },
        UnitSize: {
            lookUpKey: 'UnitSize',
            columnType: 'textBox',
            isNumericSort: true,
        },
        Tier: {
            lookUpKey: 'Tier',
            columnType: 'textBox',
        },
        CoolingCapacity: {
            lookUpKey: 'CoolingCapacity',
            columnType: 'textBox',
            cellClassName: 'cooler',
            isNumericSort: true,
        },
    },
    id: 'CandidateGrid',
    uniqueKey: 'CheckBoxId',
    gridClassName: '',
    rowClassName: '',
    showCheckbox: true,
    isLoading: false,
    hideSearch: true,
    sortable: true,
    doNotTranslate: false,
    sorting: 'desc',
    orderByfield: 'UnitSize',
    showLinearProgress: false,
    rowCheckboxHandler: null,
    singleSelectGrid: true,
    rowsPerPageOptions: [5, 10, 25, 100],
    rowsToShowPerPage: 5,
    paginationClass: '',
    columnGrouping: true,
    columnGroupConfig: {
        Heating: {
            className: '',
        },
        Cooling: {
            className: '',
        },
        Default: {
            className: '',
        },
    },
}
