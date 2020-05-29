import React, { useState, Fragment } from 'react';
import {GetProp} from '@carrier/workflowui-globalfunctions'
import './SimpleRadioButtonGroup.css';
import { FormattedMessage as Culture } from 'react-intl';
import {FormatTransKey} from '@carrier/workflowui-globalfunctions'

function SimpleRadioButtonGroup(props) {
    const [Visibility, SetVisibility] = useState(false)
    const [Prop, SetProp] = useState(null)


    React.useEffect(() => {
        let VisibleProp = GetProperty(props.PropName+".VISIBLE")
        let Prop = GetProperty(props.PropName)
        if(VisibleProp){
            SetVisibility(VisibleProp.Value === "TRUE"? true : false)
        }else
            SetVisibility(true)
        SetProp(Prop)
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [null, props.RulesJSON])

    function handleChange(event){
        props.onValueChanged([{Name:props.PropName, Value: event.target.value}])
    }

    function GetProperty(PropName){
        return GetProp(PropName, props.RulesJSON)
      }

    function GetClassName(){
        if(props.className)
            return props.className
        else
            if(props.vertical)
                return "SRBG-Label-vertical"
            else
                return "SRBG-Label-horizontal"
    }

    if(Visibility){
        return (
            <div id={"ctrl"+ props.PropName}>
                {Prop && Prop.Values.map((value, index) => {
                    if(props.HideNotAllowedValues && value.State===2)
                    return null;
                    else
                    return <>
                     <label key={index} className={((value.State === 2 && Prop.AssignedValue === value.Value)?"SRBG-radio-notAllowed ":"") + GetClassName()}>
                        <input id={"ctrl"+ props.PropName+ value.Value} className="SRBG-radio" type="radio"  name={props.PropName} value={value.Value} onChange={handleChange} checked={Prop.AssignedValue === value.Value ? true: false}/>
                        {props.DoNotTranslate ?
                            <Culture id={FormatTransKey((props.PropName + "|" +value.Attributes.Description))}/>
                            :
                            <span>{value.Attributes.Description}</span>
                        }
                    </label>
                     {(!!value.Attributes.Note && props.vertical)?<div> {value.Attributes.Note.split("||").map((value, index)=>{
                        return <li className={props.NoteclassName}>{value}</li>
                     })}</div>:""}
                    </>
                })}
            </div>
        );
    }else return null;
    
}

export default SimpleRadioButtonGroup;