import React, { useEffect } from 'react';
import './SimpleCombobox.css'
import {GetProp} from '@carrier/workflowui-globalfunctions'
import { FormattedMessage as Culture } from 'react-intl';
import {FormatTransKey} from '@carrier/workflowui-globalfunctions'

function SimpleCombobox(props) {

    let VisibleProp = GetProperty(props.PropName+".VISIBLE")
    let prop = GetProperty(props.PropName)
    let EnabledProp
    if(props.Enabled)
        EnabledProp = GetProperty(props.Enabled)
    else
        EnabledProp = GetProperty(props.PropName+ ".ENABLED")
    let Enabled = true
    if (EnabledProp)
        Enabled = EnabledProp.Value === "TRUE" ? true: false
    let Visible = null
    if (VisibleProp) 
        Visible = VisibleProp.Value
    
    useEffect(() => {
        let SelectedOption = GetSelectedOption()
        if(SelectedOption && SelectedOption.State === 2 && props.HideNotAllowedValues){
            let defaultProp = GetProperty(prop.Name + ".DEFAULT")
            props.onValueChanged([{Name:prop.Name, Value:defaultProp.Value}])
        }
    }, [props.RulesJSON])

    function ValueChanged(event){
            let SelectedOption = prop.Values.find((Value)=> {
                return Value.Value === event.target.value
            })
            props.onValueChanged([{Name:prop.Name, Value:SelectedOption.Value}])
    }
    function GetSelectedOption(){
        if(prop && prop.Value){
            let SelectedOption = prop.Values.find((Value)=> {
                return Value.Value === prop.Value
            })
            return SelectedOption
        }
    }

    function GetSelectedValue() {
        let SelectedOption = GetSelectedOption()
        if(SelectedOption)
            return SelectedOption.Value
        else
            return ""
    }
    function GetProperty(PropName){
        return GetProp(PropName, props.RulesJSON)
      }

    if(Visible === "TRUE"){
        return (
            <select id={"ctrl"+ props.PropName}  className={(prop && prop.IsRelaxed && Enabled) ? ("SimpleCombobox-Container not-allow " + (props.HideNotAllowedValues? "SimpleCombobox-InvalidHidden ":"SimpleCombobox-Invalid ")) + props.className: "SimpleCombobox-Container "+ props.className} disabled={Enabled? false : true } onChange={ValueChanged} value={GetSelectedValue()} >
                {prop ? prop.Values.map((value, index) => {
                    if(props.HideNotAllowedValues && value.State===2)
                        return null
                    else if (props.DoNotTranslate)
                        return <option valueid={value.Value} className={value.State>1? "NotAllowedValue": "AllowedValue"} value={value.Value} key={index}>{value.Attributes.Description}</option>
                    else
                      return <Culture id={FormatTransKey(props.PropName + "|" +value.Attributes.Description)} key={index}>
                        {(message) => <option valueid={value.Value} className={value.State>1? "NotAllowedValue": "AllowedValue"} value={value.Value} key={index}>{message}</option>}
                      </Culture>
                        
                    }
                ) : null}
            </select>
        );
    }else{
        return null;
    }
}

export default SimpleCombobox;