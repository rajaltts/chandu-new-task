import React, { useEffect } from 'react'
import { GetProp } from '@carrier/workflowui-globalfunctions'
import { GetMetricValue, GetEnglishValue, SameSystemConversion, GetUnitLabel } from '@carrier/ngecat-unitsconversion'
import Tooltip from '@material-ui/core/Tooltip'
import './TextBoxWithLabel.css'

function TextBoxWithLabel(props) {
    const [DisplayMinMax, SetDisplayMinMax] = React.useState(false)
    const [Visibility, SetVisibility] = React.useState(true)
    const [Value, SetValue] = React.useState(0)
    const [Min, SetMin] = React.useState()
    const [Max, SetMax] = React.useState()
    const [Unit, SetUnit] = React.useState()
    const [UnitProp, SetUnitProp] = React.useState()
    const [Relaxed, SetRelaxed] = React.useState(false)
    const [Enabled, SetEnabled] = React.useState(true)
    const [OutOfRange, SetOutOfRange] = React.useState(false)
    const [CheckboxProp, SetCheckboxProp] = React.useState(0)

    const { saveSignificantDigit = false } = props

    useEffect(() => {
        let VisibleProp
        if (props.Visible) VisibleProp = GetProperty(props.Visible)
        else VisibleProp = GetProperty(props.PropName + '.VISIBLE')
        if (VisibleProp) {
            SetVisibility(VisibleProp.Value === 'TRUE' ? true : false)
        } else SetVisibility(true)
        UpdateStates()
    }, [null, props.unitSystem, props.RulesJSON])

    useEffect(() => {
        SetOutOfRange(Value < Min || Value > Max)
    }, [Min, Max, Value])

    function UpdateStates() {
        if (Object.entries(props.RulesJSON).length > 0 && props.RulesJSON.constructor === Object) {
            var MainProp = GetProperty(props.PropName)
            let UnitProp = GetProperty(props.PropName + '.UNIT')
            let EnabledProp
            if (props.Enabled) EnabledProp = GetProperty(props.Enabled)
            else EnabledProp = GetProperty(props.PropName + '.ENABLED')
            let UnitNumber
            if (UnitProp) {
                UnitNumber = UnitProp.Value
                if (!UnitNumber && UnitProp.Values.length > 1) {
                    //Assign default unit
                    let UnitDefault = GetProperty(props.PropName + '.UNIT.DEFAULT').Value
                    props.onValueChanged([
                        {
                            Name: props.PropName + '.UNIT',
                            Value: saveSignificantDigit ? SignificantDigit(UnitDefault) : UnitDefault,
                        },
                    ])
                } else {
                    if (MainProp) {
                        SetValue(FormatNumber(MainProp.Value, UnitNumber))
                        SetMin(FormatNumber(GetProperty(props.PropName + '.MIN').Value, UnitNumber))
                        SetMax(FormatNumber(GetProperty(props.PropName + '.MAX').Value, UnitNumber))
                    }
                    SetUnitProp(UnitProp)
                    SetUnit(GetUnitLabel(UnitNumber, props.unitSystem))
                    if (EnabledProp) SetEnabled(EnabledProp.Value === 'TRUE' ? true : false)
                    else SetEnabled(true)
                    if (props.CheckboxPropName) SetCheckboxProp(GetProperty(props.CheckboxPropName))
                    let relaxProp = props.RulesJSON.RelaxedVarNames.find((propNa) => propNa === props.PropName)
                    if (relaxProp) SetRelaxed(true)
                    else SetRelaxed(false)
                }
            }
        }
    }

    function SignificantDigit(valueToPrint) {
        if (valueToPrint > 0 && valueToPrint < 1) {
            return Number.parseFloat(valueToPrint).toPrecision(3)
        }
        return Math.round(valueToPrint * 100) / 100
    }

    function FormatNumber(value, UnitNumber) {
        if (props.unitSystem === 'Metric') value = GetMetricValue(value, UnitNumber)
        return SignificantDigit(value)
    }

    function GetProperty(PropName) {
        return GetProp(PropName, props.RulesJSON)
    }

    function onInputFocus() {
        SetDisplayMinMax(true)
    }

    function onInputFocusOut() {
        SetDisplayMinMax(false)
        let OldValue = GetProperty(props.PropName).Value
        if (isNaN(Value) || Value === '') {
            SetValue(SignificantDigit(OldValue, UnitProp.Value))
        } else {
            let NewValue = Value
            if (props.unitSystem === 'Metric') NewValue = GetEnglishValue(Value, UnitProp.Value)
            if (parseFloat(OldValue) !== parseFloat(NewValue)) {
                NewValue = NewValue.toString().replace(',', '.')
                NewValue = saveSignificantDigit ? SignificantDigit(NewValue) : NewValue
                props.onValueChanged([{ Name: props.PropName, Value: NewValue }])
            } else SetValue(FormatNumber(OldValue, UnitProp.Value))
            SetOutOfRange(parseFloat(Value) < Min || parseFloat(Value) > Max)
        }
    }

    function onChange(event) {
        let value = event.target.value.trim().replace(',', '.')
        if (!isNaN(value) || value === '-' || value === '.') SetValue(value)
    }

    function onUnitChanged(event) {
        let NewValue =
            Math.round(SameSystemConversion(UnitProp.Value, event.target.value, Value, props.unitSystem) * 100) / 100
        if (props.unitSystem === 'Metric') {
            NewValue = GetEnglishValue(NewValue, event.target.value).toString().replace(',', '.')
            NewValue = saveSignificantDigit ? SignificantDigit(NewValue) : NewValue
            props.onValueChanged([
                { Name: UnitProp.Name, Value: event.target.value },
                { Name: props.PropName, Value: NewValue },
            ])
        } else {
            NewValue = NewValue.toString().replace(',', '.')
            NewValue = saveSignificantDigit ? SignificantDigit(NewValue) : NewValue
            props.onValueChanged([
                { Name: UnitProp.Name, Value: event.target.value },
                { Name: props.PropName, Value: NewValue },
            ])
        }
    }

    function handleCheckChange() {
        props.onValueChanged([
            { Name: props.CheckboxPropName, Value: CheckboxProp.Value === 'TRUE' ? 'FALSE' : 'TRUE' },
        ])
    }

    function PaintLabel() {
        if (Unit !== '') {
            if (UnitProp && UnitProp.Values.length > 1) {
                return (
                    <select className='TBWLAI-Select' onChange={onUnitChanged} value={UnitProp.Value}>
                        {UnitProp.Values.map((Unit, index) => {
                            return (
                                <option key={index} className='TBWLAI-SelectOption' value={Unit.Value}>
                                    {GetUnitLabel(Unit.Value, props.unitSystem)}
                                </option>
                            )
                        })}
                    </select>
                )
            }
            return <span className='TBWLAI-label'>{Unit}</span>
        }
        return null
    }

    if (Visibility)
        return (
            <div className={'TBWLAI-container ' + (Relaxed ? 'RelaxedHighlight ' : '') + props.className}>
                <div className='TBWLAI-InputContainer'>
                    {props.Image ? (
                        <div className='TBWLAI-ImageContainer'>
                            {props.Tooltip ? (
                                <Tooltip title={props.Tooltip} placement='top'>
                                    <img alt='ImageIcon' className='TBWLAI-Image' src={'/Images/' + props.Image} />
                                </Tooltip>
                            ) : (
                                <img alt='ImageIcon' className='TBWLAI-Image' src={'/Images/' + props.Image} />
                            )}
                        </div>
                    ) : null}
                    {props.CheckboxPropName ? (
                        <div className='TBWLAI-ImageContainer'>
                            <input
                                className='TBWLAI-CheckBox'
                                type='checkbox'
                                name={props.Checkbox}
                                onChange={handleCheckChange}
                                checked={CheckboxProp.Value === 'TRUE' ? true : false}
                            />
                        </div>
                    ) : null}
                    <input
                        id={'ctrl' + props.PropName}
                        disabled={Enabled ? false : true}
                        onFocus={onInputFocus}
                        onBlur={onInputFocusOut}
                        className={
                            (OutOfRange ? 'ErrorCss ' : '') +
                            (Unit !== ''
                                ? props.CheckboxPropName || props.Image
                                    ? 'TBWLAI-input'
                                    : 'TBWLAI-input-label'
                                : 'TBWLAI-input-full')
                        }
                        value={Value}
                        onChange={onChange}
                        step='any'
                    />
                    {PaintLabel()}
                </div>
                {DisplayMinMax ? (
                    <span className='TBWLAI-footer'>
                        (Min:{Min} Max: {Max} )
                    </span>
                ) : null}
            </div>
        )
    else if (props.KeepSpaceWhenHidden) return <div style={{ visibility: 'hidden' }} className='TBWLAI-container'></div>
    return null
}

export default TextBoxWithLabel
