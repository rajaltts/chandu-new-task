import React from 'react';
import {GetProp} from '@carrier/workflowui-globalfunctions';

function SimpleCheckbox(props) {

    let ValueProp = GetProperty(props.PropName)
    let VisibleProp = GetProperty(props.PropName + ".VISIBLE")

    function GetProperty(PropName){
        return GetProp(PropName, props.RulesJSON)
      }

    function handleChange(event){
        props.onValueChanged([{Name:props.PropName, Value: ValueProp.Value === "FALSE" ? "TRUE": "FALSE"}])
    }
    

    if((!VisibleProp || (VisibleProp && VisibleProp.Value === "TRUE")) && ValueProp ){
        return (
            <label style={{fontSize: "0.95rem"}}><input  id={"ctrl"+ props.PropName} style={{marginRight: "5px"}} type="checkbox" name={props.PropName} onChange={handleChange} checked={ValueProp.Value === "TRUE" ? true: false}/>{ValueProp.Values[0].Attributes.Description}</label>
        )
    }else
        return null
    
    
}

export default SimpleCheckbox;