import React, { useEffect } from 'react'
import { GetProp, getBooleanValue } from '@carrier/workflowui-globalfunctions'
import { GetUnitConversionExt, GetUnitDesc } from '@carrier/ngecat-unitsconversion'
import Tooltip from '@material-ui/core/Tooltip'

function TextBoxWithDropdownList(props) {
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
    const [CheckboxIsChecked, SetCheckboxIsChecked] = React.useState(true)
    const [CheckboxIsEnabled, SetCheckboxIsEnabled] = React.useState(true)
    const [Valid, SetValid] = React.useState(true)

    useEffect(() => {
        let visibleProp, validProp
        // validate the valid property for respective field property in order to dispaly the error class for checkbox wrapper
        if (props.validPropName) {
            validProp = GetProperty(props.validPropName + '.VALID')
            SetValid(validProp ? getBooleanValue(validProp.Value) : false)
        }
        if (props.Visible) visibleProp = GetProperty(props.Visible)
        else visibleProp = GetProperty(props.PropName + '.VISIBLE')
        if (visibleProp) {
            SetVisibility(visibleProp.Value === 'TRUE' ? true : false)
        } else SetVisibility(true)
        UpdateStates()
    }, [null, props.RulesJSON])

    useEffect(() => {
        SetOutOfRange(Enabled && (Value < Min || Value > Max))
    }, [Min, Max, Value])

    function UpdateStates() {
        if (Object.entries(props.RulesJSON).length > 0 && props.RulesJSON.constructor === Object) {
            var mainProp = GetProperty(props.PropName)
            //to distinguish the state name defination:[UnitProp, SetUnitProp]
            let rulesUnitProp = GetProperty(props.PropName + '.UNIT')
            let enabledProp
            if (props.Enabled) enabledProp = GetProperty(props.Enabled)
            else enabledProp = GetProperty(props.PropName + '.ENABLED')
            if (!rulesUnitProp) {
                //the condition is for text box doesn't have unit
                SetMinMaxValues(mainProp, '0')
                SetEnabledRelaxed(enabledProp)
                return
            }
            let unitNumber = rulesUnitProp.Value
            if (!unitNumber && rulesUnitProp.Values.length > 1) {
                //Assign default unit
                let unitDefault = GetProperty(props.PropName + '.UNIT.DEFAULT').Value
                props.onValueChanged([{ Name: props.PropName + '.UNIT', Value: unitDefault }])
            } else {
                SetMinMaxValues(mainProp, unitNumber)
                SetUnitProp(rulesUnitProp)
                SetUnit(GetUnitDesc(rulesUnitProp, unitNumber))
                SetEnabledRelaxed(enabledProp)
            }
        }
    }

    function SetMinMaxValues(mainProp, unitNumber) {
        if (mainProp) {
            let minValue = Number.parseFloat(GetProperty(props.PropName + '.MIN').Value)
            let maxValue = Number.parseFloat(GetProperty(props.PropName + '.MAX').Value)
            if (minValue < maxValue) {
                SetMin(minValue)
                SetMax(maxValue)
            } else {
                SetMin(maxValue)
                SetMax(minValue)
            }
            let assignedValue = FormatNumber(mainProp.Value, unitNumber, props.toPrecisionValue || maxValue.length + 2)
            SetValue(assignedValue)
            SetOutOfRange(assignedValue < minValue || assignedValue > maxValue)
        }
    }

    function SetEnabledRelaxed(EnabledProp) {
        if (EnabledProp) SetEnabled(EnabledProp.Value === 'TRUE' ? true : false)
        else SetEnabled(true)
        if (props.CheckboxPropName) {
            let CheckboxCheckedProp = GetProperty(props.CheckboxPropName)
            SetCheckboxProp(CheckboxCheckedProp)
            SetCheckboxIsChecked(CheckboxCheckedProp && CheckboxCheckedProp.Value === 'TRUE')
            let CheckboxEnabledProp = GetProperty(props.CheckboxPropName + '.ENABLED')
            SetCheckboxIsEnabled(CheckboxEnabledProp && CheckboxEnabledProp.Value === 'TRUE')
        }
        let relaxProp = props.RulesJSON.RelaxedVarNames.find((propNa) => propNa === props.PropName)
        if (relaxProp) SetRelaxed(true)
        else SetRelaxed(false)
    }

    function FormatNumber(value, unitNumber, precision) {
        let convertedValue = isFinite(value) && Number.parseFloat(value)
        if (convertedValue === 0) return 0
        //fix data lose
        if (props.isRequiredMathRound) {
            convertedValue = Math.round(convertedValue * 100) / 100
        }
        if (props.toPrecisionRulesForValue) {
            //rules format is UnitNumber:PrecisionNumber
            precision = GetPredefinedPrecision(unitNumber)
            return Number(convertedValue.toPrecision(precision))
        }
        if (props.toFixedValue) {
            return convertedValue.toFixed(props.toFixedValue)
        }
        //significant digit by default
        if (convertedValue > 0 && convertedValue < 1) {
            convertedValue = Number.parseFloat(convertedValue).toPrecision(3)
        } else {
            convertedValue = Math.round(convertedValue * 100) / 100
        }
        return convertedValue
    }

    function GetPredefinedPrecision(unitId) {
        let precision = 6
        if (unitId && props.toPrecisionRulesForValue) {
            let toPrecisionRulesForValueArray = props.toPrecisionRulesForValue.split(';')
            if (toPrecisionRulesForValueArray && toPrecisionRulesForValueArray.length > 0) {
                let precisionConfiguration = toPrecisionRulesForValueArray.find((element) => {
                    return element.split(':')[0] === unitId
                })
                precision =
                    precisionConfiguration && precisionConfiguration.split(':').length > 0
                        ? Number.parseInt(precisionConfiguration.split(':')[1], 10)
                        : precision
            }
        }
        return precision
    }
    function GetProperty(PropName) {
        return GetProp(PropName, props.RulesJSON)
    }

    function onInputFocus() {
        SetDisplayMinMax(true)
    }

    function onInputFocusOut() {
        SetDisplayMinMax(false)
        if (!UnitProp) {
            //the condition is for text box doesn't have unit
            props.onValueChanged([{ Name: props.PropName, Value: Value }])
            SetOutOfRange(Value < Min || Value > Max)
            return
        }
        let oldValue = GetProperty(props.PropName)?.Value
        if (isNaN(Value) || Value === '') {
            SetValue(oldValue)
        } else {
            if (Number.parseFloat(oldValue) !== Number.parseFloat(Value)) {
                const displayValue = FormatNumber(Value, UnitProp.Value, props.toPrecisionValue)
                props.onValueChanged([{ Name: props.PropName, Value: displayValue.toString().replace(',', '.') }])
            }
        }
        SetOutOfRange(Value < Min || Value > Max)
    }

    function onChange(event) {
        if (props.regex) {
            if (event.target.value === '' || RegExp(props.regex).test(event.target.value)) {
                let value = event.target.value.trim().replace(',', '.')
                if (!isNaN(value) || value === '-' || value === '.') SetValue(value)
            }
        } else {
            let value = event.target.value.trim().replace(',', '.')
            if (!isNaN(value) || value === '-' || value === '.') SetValue(value)
        }
    }

    function onUnitChanged(event) {
        let fromUnitDesc = GetUnitDesc(UnitProp, UnitProp.Value)
        let toUnitDesc = GetUnitDesc(UnitProp, event.target.value)
        if (fromUnitDesc && toUnitDesc && fromUnitDesc !== toUnitDesc) {
            let convertedValue = GetUnitConversionExt(Value, fromUnitDesc, toUnitDesc, props.RulesJSON)
            convertedValue = isFinite(convertedValue) ? convertedValue : 0
            const displayValue = FormatNumber(convertedValue, event.target.value, props.toPrecisionValue)
            props.onValueChanged([
                { Name: UnitProp.Name, Value: event.target.value },
                { Name: props.PropName, Value: displayValue?.toString().replace(',', '.') },
            ])
        }
    }

    function handleCheckChange() {
        props.onValueChanged([
            { Name: props.CheckboxPropName, Value: CheckboxProp.Value === 'TRUE' ? 'FALSE' : 'TRUE' },
        ])
    }

    function PaintLabel() {
        if (Unit) {
            if (UnitProp && UnitProp.Values.length > 1) {
                return (
                    <select
                        className='TBWLAI-Select'
                        onChange={onUnitChanged}
                        value={UnitProp.Value}
                        disabled={!Enabled}>
                        {UnitProp.Values.map((unit, index) => {
                            if (unit?.Attributes?.VISIBLE?.toUpperCase() === 'FALSE') {
                                return null
                            }
                            return (
                                <option key={index} className='TBWLAI-SelectOption' value={unit.Value}>
                                    {unit?.Attributes?.Description}
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

    if (Visibility) {
        return (
            <div
                className={
                    'TBWLAI-container ' + (Relaxed && !DisplayMinMax ? 'RelaxedHighlight ' : '') + props.className
                }>
                <div className='TBWLAI-InputContainer'>
                    {props.Image ? (
                        <div className={'TBWLAI-ImageContainer' + (!Valid ? ' error-checkbox-wrapper ' : '')}>
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
                        <div className={'TBWLAI-ImageContainer' + (!Valid ? ' error-checkbox-wrapper ' : '')}>
                            <input
                                className='TBWLAI-CheckBox'
                                type='checkbox'
                                name={props.Checkbox}
                                onChange={handleCheckChange}
                                disabled={!CheckboxIsEnabled}
                                checked={CheckboxProp && CheckboxProp.Value === 'TRUE' ? true : false}
                            />
                        </div>
                    ) : null}
                    <input
                        id={'ctrl' + props.PropName}
                        disabled={Enabled ? false : true}
                        onFocus={onInputFocus}
                        onBlur={onInputFocusOut}
                        className={
                            (Enabled ? (OutOfRange ? 'ErrorCss ' : '') : '') +
                            (Unit !== ''
                                ? props.CheckboxPropName || props.Image
                                    ? 'TBWLAI-input'
                                    : 'TBWLAI-input-label'
                                : 'TBWLAI-input-full')
                        }
                        value={CheckboxIsEnabled && CheckboxIsChecked ? Value : ''}
                        onChange={onChange}
                        step='any'
                    />
                    {PaintLabel()}
                </div>
                {DisplayMinMax && (
                    <span className='TBWLAI-footer'>
                        (Min:{Min} Max: {Max} )
                    </span>
                )}
            </div>
        )
    } else if (props.KeepSpaceWhenHidden)
        return <div style={{ visibility: 'hidden' }} className='TBWLAI-container'></div>
    return null
}

export default TextBoxWithDropdownList
