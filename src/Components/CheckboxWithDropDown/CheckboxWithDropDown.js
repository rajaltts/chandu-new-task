import React, {useEffect, useState} from 'react';
import './CheckboxWithDropDown.css'
import { Checkbox } from '@material-ui/core';
import {GetProp, FormatTransKey} from '@carrier/workflowui-globalfunctions'
import {InfoIcon} from '../SvgImages'
import { FormattedMessage as Culture } from 'react-intl';
import { css } from '@emotion/core';
import { HashLoader } from 'react-spinners';

const override = css`
    display: block;
    float: left;
    margin: 10px 8.5px;
    border-color: red;
`;

function CheckboxWithDropDown(props) {
  
  const [DisplayDetails, SetDisplayDetails] = useState(false)
  const [Loading, SetLoading] = useState(false)
  const [OldValue, SetOldValue] = useState('')

  useEffect(() => {
    if(Loading){
      let UpdatedProp = GetProperty(props.PropName)
      if(UpdatedProp && UpdatedProp.Value === OldValue)
        SetLoading(false)
    }
  },[props.RulesJSON])

    function ValueChanged(){
      if(!Loading){
        SetLoading(true)
        let UpdatedValue = (Value === "TRUE" ? "FALSE":"TRUE")
        SetOldValue(UpdatedValue)
        props.onValueChanged([{Name:props.PropName, Value:UpdatedValue}])
        SetDisplayDetails(!DisplayDetails)
      }
    }

    function GetProperty(PropName){
      return GetProp(PropName, props.RulesJSON)
    }

    function onInfoIconClick(){
      SetDisplayDetails(!DisplayDetails)
    }
    function GetTitle(){
      let DescriptionProp = GetProperty(props.PropName+".DESCRIPTION")
      return <Culture id={FormatTransKey(props.PropName)} defaultMessage={DescriptionProp?<Culture id={FormatTransKey(props.PropName +"DESCRIPTION"+ "|" + DescriptionProp.Values[0].Attributes.Description)}/>:"MISSING TRANSLATION"}/>
      }

    let Value, Visibility

    if(Object.entries(props.RulesJSON).length > 0 && props.RulesJSON.constructor === Object){
      Visibility = GetProperty(props.PropName+".VISIBLE")
      if(Visibility && Visibility.Value === "TRUE"){
        let MainProp = GetProperty(props.PropName)
        Value = MainProp.Value
        return (
            <div  className="CBWDD-Container">
            <div className="CBWDD-MainContainer">
                <div onClick={ValueChanged} className="CBWDD-ClickableContainer">
                {Loading?<HashLoader css={override} sizeUnit={"px"} size={25} color={'#123abc'} loading={Loading}/>:
                <Checkbox id={"ctrl"+ props.PropName} color="primary" className="CBWDD-Checkbox" checked={Value ==="TRUE"?true:false}/>}
                  <span className="CBWDD-Title">{GetTitle(MainProp)}</span>
                </div>
                {props.children ?<div className="OptionControl-InfoIcon" onClick={onInfoIconClick}><InfoIcon color="#2d4181" width="30px"/></div>:null}
            </div> 
            <span className="CBWDD-Separator"/>
            {DisplayDetails && props.children ? 
            <div className="CBWDD-DetailsContainer">
              {props.children}
            </div>: null}  
            </div>
        )
    }else
      return null
  }
}

export default CheckboxWithDropDown;