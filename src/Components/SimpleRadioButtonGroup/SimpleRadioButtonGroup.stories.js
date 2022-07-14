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
        ],
        RelaxedVarNames: [],
        Errors: [],
        ElapsedTime: {
            'Filter and Reconfigure ::': 19,
            'Get or Create Engine ::': 0,
            'Transforming engine result to output format:': 0,
        },
    }

    const valueChanged = () => {
        alert('onChanged event fired')
    }

    return (
        <SimpleRadioButtonGroup
            {...args}
            PropName='DC_sCapacityType'
            checkEnabledRule={true}
            onValueChanged={valueChanged}
            RulesJSON={rulesJson}></SimpleRadioButtonGroup>
    )
}

export const SimpleRadioButtonGroupComponent = SimpleRadioButtonGroupTemplate.bind({})
SimpleRadioButtonGroupComponent.args = {
    PropName: '',
    rulesJson: {
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
        ],
        RelaxedVarNames: [],
        Errors: [],
        ElapsedTime: {
            'Filter and Reconfigure ::': 19,
            'Get or Create Engine ::': 0,
            'Transforming engine result to output format:': 0,
        },
    },
    checkEnabledRule: true,
    notAllowedDefaultState: false,
    useValueAsKey: false,
    highlightNotAllowed: false,
    tooltipMessage: '',
    className: null,
    HideNotAllowedValues: false,
    vertical: '',
    NoteclassName: null,
}
