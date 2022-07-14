import React from 'react'
import SimpleCombobox from './SimpleCombobox'

export default {
    title: 'Component/SimpleCombobox',
    component: SimpleCombobox,
}

const SimpleComboboxTemplate = ({ ...args }) => {
    const rulesJson = {
        Status: 'Feasible',
        VariableDomains: {
            sClrFrameSize_UI: {
                Name: 'sClrFrameSize_UI',
                Type: 0,
                AssignedValue: 'ANY',
                Values: [
                    {
                        Attributes: {
                            Description: 'ANY',
                        },
                        State: 1,
                        Value: 'ANY',
                    },
                    {
                        Attributes: {
                            Description: 'Frame 3',
                        },
                        State: 2,
                        Value: '3',
                    },
                    {
                        Attributes: {
                            Description: 'Frame 4',
                        },
                        State: 2,
                        Value: '4',
                    },
                    {
                        Attributes: {
                            Description: 'Frame 5',
                        },
                        State: 2,
                        Value: '5',
                    },
                    {
                        Attributes: {
                            Description: 'Frame A',
                        },
                        State: 1,
                        Value: 'A',
                    },
                    {
                        Attributes: {
                            Description: 'Frame B',
                        },
                        State: 1,
                        Value: 'B',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: true,
                Tags: ['UI', 'UI_SEL_DC', 'UI_SEL_DC_EVAPCOND'],
                Value: 'ANY',
            },
        },
        RelaxedVarNames: [],
        Errors: [],
        ElapsedTime: {
            'Filter and Reconfigure ::': 909,
            'Get or Create Engine ::': 5868,
            'Transforming engine result to output format:': 0,
        },
    }

    const serachValue = {
        search: true,
        placeholder: '',
        filter: '',
        sort: true,
    }

    const valueChanged = () => {
        alert('onChanged event fired')
    }

    return (
        <SimpleCombobox
            {...args}
            PropName='sClrFrameSize_UI'
            DoNotTranslate={true}
            onValueChanged={valueChanged}
            isSearchable={serachValue}
            RulesJSON={rulesJson}></SimpleCombobox>
    )
}

export const SimpleComboboxComponent = SimpleComboboxTemplate.bind({})
SimpleComboboxComponent.args = {
    isSearchable: {
        search: true,
        placeholder: '',
        filter: '',
        sort: true,
    },
    rulesJson: {
        Status: 'Feasible',
        VariableDomains: {
            sClrFrameSize_UI: {
                Name: 'sClrFrameSize_UI',
                Type: 0,
                AssignedValue: 'ANY',
                Values: [
                    {
                        Attributes: {
                            Description: 'ANY',
                        },
                        State: 1,
                        Value: 'ANY',
                    },
                    {
                        Attributes: {
                            Description: 'Frame 3',
                        },
                        State: 2,
                        Value: '3',
                    },
                    {
                        Attributes: {
                            Description: 'Frame 4',
                        },
                        State: 2,
                        Value: '4',
                    },
                    {
                        Attributes: {
                            Description: 'Frame 5',
                        },
                        State: 2,
                        Value: '5',
                    },
                    {
                        Attributes: {
                            Description: 'Frame A',
                        },
                        State: 1,
                        Value: 'A',
                    },
                    {
                        Attributes: {
                            Description: 'Frame B',
                        },
                        State: 1,
                        Value: 'B',
                    },
                ],
                IsRelaxed: false,
                IsUserSelected: true,
                Tags: ['UI', 'UI_SEL_DC', 'UI_SEL_DC_EVAPCOND'],
                Value: 'ANY',
            },
        },
        RelaxedVarNames: [],
        Errors: [],
        ElapsedTime: {
            'Filter and Reconfigure ::': 909,
            'Get or Create Engine ::': 5868,
            'Transforming engine result to output format:': 0,
        },
    },
    Visible: true,
    PropName: '',
    Enabled: true,
    Valid: true,
    DoNotTranslate: true,
    isNoMLP: true,
    isValidationMessage: false,
    className: null,
    HideNotAllowedValues: false,
    IsRelaxed: false,
}
