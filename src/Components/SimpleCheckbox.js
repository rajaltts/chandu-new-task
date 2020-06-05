import React from 'react';
import {GetProp} from '@carrier/workflowui-globalfunctions';
import { FormattedMessage as Culture } from 'react-intl';
import './app.css';

function SimpleCheckbox(props) {

    let ValueProp = GetProperty(props.PropName)
    let VisibleProp = GetProperty(props.PropName + ".VISIBLE")
    let EnableProp = GetProperty(props.PropName + ".ENABLED")
    let IsValidProp = GetProperty(props.PropName + ".VALID")
    
    function GetProperty(PropName){
        return GetProp(PropName, props.RulesJSON)
      }

    function handleChange(){
        props.onValueChanged([{Name:props.PropName, Value: ValueProp.Value === "FALSE" ? "TRUE": "FALSE"}])
    }
    function GetLabel() {
      if (props.DoNotTranslate) {
        let PropDescription;
        if (ValueProp && ValueProp.Values) {
          PropDescription = ValueProp.Values.map((data) => {
            return data;
          });
          return PropDescription && PropDescription[0].Attributes && PropDescription[0].Attributes.Description;
        }
      } else {
        return <Culture id={props.PropName} />;
      }
    }

    if((!VisibleProp || (VisibleProp && VisibleProp.Value === "TRUE")) && ValueProp ){
        return (
            <label style={{fontSize: "0.95rem"}}><input  className={IsValidProp && IsValidProp.Value === "FALSE" ? "checkbox-error-css":""} id={"ctrl"+ props.PropName} style={{marginRight: "5px"}} type="checkbox" name={props.PropName} onChange={handleChange} checked={ValueProp.Value === "TRUE" ? true: false} disabled={EnableProp && EnableProp.Value === "FALSE" ? true: false} />{GetLabel()}</label>
        )
    }else
        return null
       
}

export default SimpleCheckbox;