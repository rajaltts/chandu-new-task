import React from 'react'
import TextBoxWithLabel from './TextBoxWithLabel'

export default {
    title: 'Component/TextBoxWithLabel',
    component: TextBoxWithLabel,
}

const TextBoxWithLabelTemplate = ({ ...args }) => {
    const rulesJson = {
        Status: 'Feasible',
        VariableDomains: [
            {
                Name: 'DC_fClgCapacityReq',
                Type: 2,
                AssignedValue: '156.38',
                Values: [
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 1,
                        Value: '156.38',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: true,
                Tags: ['UI', 'DC'],
                Value: '156.38',
            },
            {
                Name: 'DC_fClgCapacityReq.DEFAULT',
                Type: 1,
                AssignedValue: '156.3832812',
                Values: [
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 1,
                        Value: '156.3832812',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: false,
                Tags: ['UI', 'DC'],
                Value: '156.3832812',
            },
            {
                Name: 'DC_fClgCapacityReq.MAX',
                Type: 1,
                AssignedValue: '156.3832812',
                Values: [
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 1,
                        Value: '156.3832812',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: false,
                Tags: ['UI', 'DC'],
                Value: '156.3832812',
            },
            {
                Name: 'DC_fClgCapacityReq.MIN',
                Type: 1,
                AssignedValue: '78.1916406',
                Values: [
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 1,
                        Value: '78.1916406',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: false,
                Tags: ['UI', 'DC'],
                Value: '78.1916406',
            },
            {
                Name: 'DC_fClgCapacityReq.UNIT',
                Type: 0,
                AssignedValue: '24',
                Values: [
                    {
                        Attributes: {
                            Description: 'tons',
                        },
                        State: 1,
                        Value: '24',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: false,
                Tags: ['UI', 'DC'],
                Value: '24',
            },
        ],
        RelaxedVarNames: [],
        Errors: [],
        ElapsedTime: {
            'Filter and Reconfigure ::': 21,
            'Get or Create Engine ::': 0,
            'Transforming engine result to output format:': 0,
        },
    }
    const valueChanged = () => {
        alert('onChanged event fired')
    }

    return (
        <TextBoxWithLabel
            {...args}
            PropName='DC_fClgCapacityReq'
            RulesJSON={rulesJson}
            saveSignificantDigit={true}
            DoNotTranslate={true}
            unitSystem='English'
            onValueChanged={valueChanged}></TextBoxWithLabel>
    )
}

const TextBoxWithLabelMultipleUnitTemplate = ({ ...args }) => {
    const rulesJson = {
        Status: 'Feasible',
        VariableDomains: [
            {
                Name: 'DC_fClgCapacityReq',
                Type: 2,
                AssignedValue: '156.38',
                Values: [
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 1,
                        Value: '156.38',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: true,
                Tags: ['UI', 'DC'],
                Value: '156.38',
            },
            {
                Name: 'DC_fClgCapacityReq.DEFAULT',
                Type: 1,
                AssignedValue: '156.3832812',
                Values: [
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 1,
                        Value: '156.3832812',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: false,
                Tags: ['UI', 'DC'],
                Value: '156.3832812',
            },
            {
                Name: 'DC_fClgCapacityReq.MAX',
                Type: 1,
                AssignedValue: '156.3832812',
                Values: [
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 1,
                        Value: '156.3832812',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: false,
                Tags: ['UI', 'DC'],
                Value: '156.3832812',
            },
            {
                Name: 'DC_fClgCapacityReq.MIN',
                Type: 1,
                AssignedValue: '78.1916406',
                Values: [
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 1,
                        Value: '78.1916406',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: false,
                Tags: ['UI', 'DC'],
                Value: '78.1916406',
            },
            {
                Name: 'DC_fClgCapacityReq.UNIT',
                Type: 0,
                AssignedValue: '24',
                Values: [
                    {
                        Attributes: {
                            Description: 'tons',
                        },
                        State: 1,
                        Value: '24',
                    },
                    {
                        Attributes: {
                            Description: 'BHP',
                        },
                        State: 1,
                        Value: '25',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: false,
                Tags: ['UI', 'DC'],
                Value: '24',
            },
        ],
        RelaxedVarNames: [],
        Errors: [],
        ElapsedTime: {
            'Filter and Reconfigure ::': 21,
            'Get or Create Engine ::': 0,
            'Transforming engine result to output format:': 0,
        },
    }
    const valueChanged = () => {
        alert('onChanged event fired')
    }

    return (
        <TextBoxWithLabel
            {...args}
            PropName='DC_fClgCapacityReq'
            RulesJSON={rulesJson}
            saveSignificantDigit={true}
            DoNotTranslate={true}
            unitSystem='English'
            onValueChanged={valueChanged}></TextBoxWithLabel>
    )
}

export const TextBoxWithLabelComponent = TextBoxWithLabelTemplate.bind({})
TextBoxWithLabelComponent.args = {
    PropName: '',
    RulesJSON: {
        Status: 'Feasible',
        VariableDomains: [
            {
                Name: 'DC_fClgCapacityReq',
                Type: 2,
                AssignedValue: '156.38',
                Values: [
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 1,
                        Value: '156.38',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: true,
                Tags: ['UI', 'DC'],
                Value: '156.38',
            },
            {
                Name: 'DC_fClgCapacityReq.DEFAULT',
                Type: 1,
                AssignedValue: '156.3832812',
                Values: [
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 1,
                        Value: '156.3832812',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: false,
                Tags: ['UI', 'DC'],
                Value: '156.3832812',
            },
            {
                Name: 'DC_fClgCapacityReq.MAX',
                Type: 1,
                AssignedValue: '156.3832812',
                Values: [
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 1,
                        Value: '156.3832812',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: false,
                Tags: ['UI', 'DC'],
                Value: '156.3832812',
            },
            {
                Name: 'DC_fClgCapacityReq.MIN',
                Type: 1,
                AssignedValue: '78.1916406',
                Values: [
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 1,
                        Value: '78.1916406',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: false,
                Tags: ['UI', 'DC'],
                Value: '78.1916406',
            },
            {
                Name: 'DC_fClgCapacityReq.UNIT',
                Type: 0,
                AssignedValue: '24',
                Values: [
                    {
                        Attributes: {
                            Description: 'tons',
                        },
                        State: 1,
                        Value: '24',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: false,
                Tags: ['UI', 'DC'],
                Value: '24',
            },
        ],
        RelaxedVarNames: [],
        Errors: [],
        ElapsedTime: {
            'Filter and Reconfigure ::': 21,
            'Get or Create Engine ::': 0,
            'Transforming engine result to output format:': 0,
        },
    },
    saveSignificantDigit: true,
    Visible: true,
    unitSystem: 'English',
    Enabled: true,
    onValueChanged: null,
    Tooltip: '',
    CheckboxPropName: '',
    KeepSpaceWhenHidden: true,
    Image: null,
}

export const TextBoxWithLabelMultipleUnitComponent = TextBoxWithLabelMultipleUnitTemplate.bind({})
TextBoxWithLabelMultipleUnitComponent.args = {
    PropName: '',
    RulesJSON: {
        Status: 'Feasible',
        VariableDomains: [
            {
                Name: 'DC_fClgCapacityReq',
                Type: 2,
                AssignedValue: '156.38',
                Values: [
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 1,
                        Value: '156.38',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: true,
                Tags: ['UI', 'DC'],
                Value: '156.38',
            },
            {
                Name: 'DC_fClgCapacityReq.DEFAULT',
                Type: 1,
                AssignedValue: '156.3832812',
                Values: [
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 1,
                        Value: '156.3832812',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: false,
                Tags: ['UI', 'DC'],
                Value: '156.3832812',
            },
            {
                Name: 'DC_fClgCapacityReq.MAX',
                Type: 1,
                AssignedValue: '156.3832812',
                Values: [
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 1,
                        Value: '156.3832812',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: false,
                Tags: ['UI', 'DC'],
                Value: '156.3832812',
            },
            {
                Name: 'DC_fClgCapacityReq.MIN',
                Type: 1,
                AssignedValue: '78.1916406',
                Values: [
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 1,
                        Value: '78.1916406',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: false,
                Tags: ['UI', 'DC'],
                Value: '78.1916406',
            },
            {
                Name: 'DC_fClgCapacityReq.UNIT',
                Type: 0,
                AssignedValue: '24',
                Values: [
                    {
                        Attributes: {
                            Description: 'tons',
                        },
                        State: 1,
                        Value: '24',
                    },
                    {
                        Attributes: {
                            Description: 'BHP',
                        },
                        State: 1,
                        Value: '25',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: false,
                Tags: ['UI', 'DC'],
                Value: '24',
            },
        ],
        RelaxedVarNames: [],
        Errors: [],
        ElapsedTime: {
            'Filter and Reconfigure ::': 21,
            'Get or Create Engine ::': 0,
            'Transforming engine result to output format:': 0,
        },
    },
    saveSignificantDigit: true,
    Visible: true,
    unitSystem: 'English',
    Enabled: true,
    onValueChanged: null,
    Tooltip: '',
    CheckboxPropName: null,
    KeepSpaceWhenHidden: true,
    Image: null,
}
