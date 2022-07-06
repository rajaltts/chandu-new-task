import React from 'react'
import SimpleRadioButtonGroup from './SimpleRadioButtonGroup'

export default {
    title: 'Component/SimpleRadioButtonGroup',
    component: SimpleRadioButtonGroup,
}

const SimpleRadioButtonGroupTemplate = ({ ...args }) => {
    const rulesJson = {
        Status: 'Feasible',
        VariableDomains: [
            {
                Name: 'DC_sCapacityType',
                Type: 0,
                AssignedValue: 'Max',
                Values: [
                    {
                        Attributes: {
                            Description: 'Max Capacity',
                        },
                        State: 1,
                        Value: 'Max',
                    },
                    {
                        Attributes: {
                            Description: 'Required Capacity (+/- 3%)',
                        },
                        State: 1,
                        Value: 'Nominal',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: true,
                Tags: ['UI', 'DC'],
                Value: 'Max',
            },
            {
                Name: 'DC_sCapacityType.DEFAULT',
                Type: 0,
                AssignedValue: 'Max',
                Values: [
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 1,
                        Value: 'Max',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: false,
                Tags: ['UI', 'DC'],
                Value: 'Max',
            },
            {
                Name: 'DC_sCapacityType.ENABLED',
                Type: 0,
                AssignedValue: 'TRUE',
                Values: [
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 1,
                        Value: 'TRUE',
                    },
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 2,
                        Value: 'FALSE',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: false,
                Tags: ['UI', 'DC'],
                Value: 'TRUE',
            },
            {
                Name: 'DC_sCapacityType.VISIBLE',
                Type: 0,
                AssignedValue: 'TRUE',
                Values: [
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 1,
                        Value: 'TRUE',
                    },
                    {
                        Attributes: {
                            Description: '',
                        },
                        State: 2,
                        Value: 'FALSE',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: false,
                Tags: ['UI', 'DC'],
                Value: 'TRUE',
            },
        ],
        RelaxedVarNames: [],
        Errors: [],
        ElapsedTime: {
            'Filter and Reconfigure ::': 19,
            'Get or Create Engine ::': 0,
            'Transforming engine result to output format:': 0,
        },
    }

    return (
        <SimpleRadioButtonGroup
            {...args}
            PropName='DC_sCapacityType'
            checkEnabledRule={true}
            RulesJSON={rulesJson}></SimpleRadioButtonGroup>
    )
}

export const SimpleRadioButtonGroupComponent = SimpleRadioButtonGroupTemplate.bind({})
SimpleRadioButtonGroupComponent.args = {
    checkEnabledRule: true,
    notAllowedDefaultState: false,
    useValueAsKey: false,
    highlightNotAllowed: false,
    tooltipMessage: '',
}
