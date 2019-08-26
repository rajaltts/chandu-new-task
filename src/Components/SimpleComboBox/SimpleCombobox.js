import React from 'react';
import './SimpleCombobox.css'
import {GetProp} from '@carrier/workflowui-globalfunctions'

function SimpleCombobox(props) {

    let VisibleProp = GetProperty(props.PropName+".VISIBLE")
    let prop = GetProperty(props.PropName)
    let EnabledProp = GetProperty(props.PropName+ ".ENABLED")
    let Enabled = true
    if (EnabledProp)
        Enabled = EnabledProp.Value === "TRUE" ? true: false
    let Visible = null
    if (VisibleProp) 
        Visible = VisibleProp.Value

    function ValueChanged(event){
            let SelectedOption = prop.Values.find((Value)=> {
                return Value.Attributes.Description === event.target.value
            })
            props.onValueChanged([{Name:prop.Name, Value:SelectedOption.Value}])
    }

    function GetSelectedValue() {
        if(prop && prop.Value){
            let SelectedOption = prop.Values.find((Value)=> {
                return Value.Value === prop.Value
            })
            if(SelectedOption)
                return SelectedOption.Attributes.Description
        }
    }
    function GetProperty(PropName){
        return GetProp(PropName, props.RulesJSON)
      }

    if(Visible === "TRUE"){
        return (
            
            <select id={"ctrl"+ props.PropName}  className={(prop && prop.IsRelaxed) ? "SimpleCombobox-Container SimpleCombobox-Invalid " + props.className: "SimpleCombobox-Container "+ props.className} disabled={Enabled? false : true } onChange={ValueChanged} value={GetSelectedValue()} >
                {prop ? prop.Values.map((value, index) => {
                    if(props.HideNotAllowedValues && value.State===2)
                        return null
                    else 
                        return <option id={"ctrl"+ props.PropName+value.Value}  className={value.State>1? "NotAllowedValue": "AllowedValue"} key={index}>{value.Attributes.Description}</option>
                }
                ) : null}
            </select>
        );
    }else{
        return null;
    }
}

export default SimpleCombobox;