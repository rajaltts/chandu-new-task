import React, { useState, Fragment } from 'react';
import {GetProp} from '@carrier/workflowui-globalfunctions'
import './SimpleRadioButtonGroup.css';
import { FormattedMessage as Culture } from 'react-intl';
import {FormatTransKey} from '@carrier/workflowui-globalfunctions'
import { Incomp } from '../SvgImages';
import Tooltip from '@material-ui/core/Tooltip'

function SimpleRadioButtonGroup(props) {
    const {notAllowedDefaultState = false, checkEnabledRule = false, useValueAsKey = false, highlightNotAllowed = false, tooltipMessage = ''} = props
    const [Visibility, SetVisibility] = useState(false)
    const [Enabled, SetEnabled] = useState(true)
    const [Prop, SetProp] = useState(null)
    
    const VISIBLE = '.VISIBLE'
    const ENABLED = '.ENABLED'

    React.useEffect(() => {
        handleInputState(VISIBLE);
        if(checkEnabledRule) {
            handleInputState(ENABLED);
        }
        let Prop = GetProperty(props.PropName)
        SetProp(Prop)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [null, props.RulesJSON])

    function handleInputState(type) {
      let PropData = GetProperty(props.PropName + type);
      if (PropData) {
        switch (type) {
          case VISIBLE:
            SetVisibility(PropData.Value === "TRUE" ? true : false);
            break;
          case ENABLED:
            SetEnabled(PropData.Value === "TRUE" ? true : false);
            break;
          default:
            break;
        }
      } else {
        SetVisibility(true);
        SetEnabled(true);
      }
    }  

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
                    if((props.HideNotAllowedValues && value.State===2) || (props.HideInvisibleValues && value.Attributes["VISIBLE"] === "FALSE"))
                    return null;
                    else
                    return <Fragment>
                    <label key={index} className={((value.State === 2 && (notAllowedDefaultState || Prop.AssignedValue === value.Value))?"SRBG-radio-notAllowed ":"") + GetClassName()}>
                        <input id={"ctrl"+ props.PropName+ value.Value} className="SRBG-radio" type="radio"  name={props.PropName} value={value.Value} onChange={handleChange} checked={Prop.AssignedValue === value.Value ? true: false} disabled={!Enabled}/>
                        {props.DoNotTranslate ?
                            <span>{value.Attributes.Description}</span>
                            :
                            <Culture id={FormatTransKey(props.PropName + "|" + (useValueAsKey ? value.Value : value.Attributes.Description))} defaultMessage={value.Attributes.Description} />
                        }
                        {highlightNotAllowed && value.State === 2 && Prop.AssignedValue === value.Value ? 
                          <span className='SRBG-highlight-notAllowed'>
                            <Tooltip title={tooltipMessage} aria-label={tooltipMessage}>
                              <Incomp width='16px' color='#FF9900'/>
                            </Tooltip> 
                          </span> : null}
                    </label>
                     {(!!value.Attributes.Note && props.vertical)?<div> {value.Attributes.Note.split("||").map((value, index)=>{
                        return <li className={props.NoteclassName}>{value}</li>
                     })}</div>:""}
                    </Fragment>
                })}
            </div>
        );
    }else return null;
    
}

export default SimpleRadioButtonGroup;