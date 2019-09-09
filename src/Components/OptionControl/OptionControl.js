import React from 'react';
import './OptionControl.css'
import { Checkbox } from '@material-ui/core';
import {GetProp} from '@carrier/workflowui-globalfunctions'
import Tooltip from '@material-ui/core/Tooltip';
import {InfoIcon, Incomp, EfficiencyIcon, CapacityIcon, SoundImpact} from '../SvgImages'

const ImageFolderPath = 'Images/'

function OptionControl(props) {
  
  const [DisplayDetails, SetDisplayDetails] = React.useState(false)

  function ValueChanged(event){
    if((props.children || InputBlock) && Value === "FALSE")
      SetDisplayDetails(true)
    else
      SetDisplayDetails(false)
    props.onValueChanged([{Name:props.PropName, Value:(Value === "TRUE" ? "FALSE":"TRUE")}])
}

function GetProperty(PropName){
  return GetProp(PropName, props.RulesJSON)
}

const ImpactData = {
  colors: [
    {value: "+/-", color: "#f8a31e"},
    {value: "+", color: "#6abd55"},
    {value: "-", color: "#cc0000"},
    {value: "NA", color: "#d8d8d8"},
  ],
  CapacityText : [
    {value: "+/-", txt: "This option may have an impact on the unit capacity"},
    {value: "+", txt: "This option has a positive impact on the unit capacity"},
    {value: "-", txt: "This option has a negative impact on the unit capacity"},
    {value: "NA", txt: "This option has no impact on the unit capacity"},
  ],
  EfficiencyText : [
    {value: "+/-", txt: "This option may have an impact on the unit efficiency"},
    {value: "+", txt: "This option has a positive impact on the unit efficiency"},
    {value: "-", txt: "This option has a negative impact on the unit efficiency"},
    {value: "NA", txt: "This option has no impact on the unit efficiency"},
  ],
  SoundText : [
    {value: "+/-", txt: "This option may have an impact on the unit unit sound power"},
    {value: "+", txt: "This option has a positive impact on the unit unit sound power"},
    {value: "-", txt: "This option has a negative impact on the unit unit sound power"},
    {value: "NA", txt: "This option has no impact on the unit unit sound power"},
  ]
}

function GetImpactIconColor(Val) {
  let colorObj = ImpactData.colors.find(val => val.value === Val)
  if(colorObj) return colorObj.color
  else return "#d8d8d8"
}

function GetImpactText(Val, type) {
  let TextObject
  if(type === "Capacity") TextObject = ImpactData.CapacityText.find(val => val.value === Val)
  if(type === "Efficiency") TextObject = ImpactData.EfficiencyText.find(val => val.value === Val)
  if(type === "Sound") TextObject = ImpactData.SoundText.find(val => val.value === Val)
  if(TextObject) return TextObject.txt
  else return ""
}

function onInfoIconClick(){
  SetDisplayDetails(!DisplayDetails)
}

let Value, Allowed, InputBlock, InputBlockComp

if(Object.entries(props.RulesJSON).length > 0 && props.RulesJSON.constructor === Object){
  let VisibilityProp = GetProperty(props.PropName+".VISIBLE")
  if(VisibilityProp && VisibilityProp.Value === "TRUE"){
    let MainProp = GetProperty(props.PropName)
    if(MainProp){
      Value = MainProp.Value
      InputBlock = MainProp.Values[0].Attributes.InputBlock
      if(InputBlock)
          InputBlockComp = props.InputBlocksLib[InputBlock]
      Allowed = MainProp.Values[0].State===2
    }

        return (
          <div  className="OptionControl-Container">
            <div className="OptionControl-MainContainer">
              <div onClick={ValueChanged} className="OptionControl-ClickableContainer">
                <Checkbox color="primary" className="OptionControl-Checkbox" id={"ctrl"+ props.PropName} checked={Value ==="TRUE"?true:false}/>
                <div className="OptionControl-LabelsContainer">
                    <span className="OptionControl-OptName">{MainProp.Values[0].Attributes.Description}</span>
                    <span className="OptionControl-OptNumber">{MainProp.Values[0].Attributes.OptNumber}</span>
                </div>
                {Allowed?<div className="OptionControl-CompIcon"><Incomp color="#FF9900" width="18px"/></div>:null}
                <Tooltip title={GetImpactText(MainProp.Values[0].Attributes.SoundImpact, "Sound")} placement="top">
                  <div className="OptionControl-ImpactIcon"><SoundImpact color={GetImpactIconColor(MainProp.Values[0].Attributes.SoundImpact)} width="20px"/></div>
                </Tooltip>
                <Tooltip title={GetImpactText(MainProp.Values[0].Attributes.EfficiencyImpact, "Efficiency")} placement="top">
                  <div className="OptionControl-ImpactIcon"><EfficiencyIcon color={GetImpactIconColor(MainProp.Values[0].Attributes.EfficiencyImpact)} width="20px"/></div>
                </Tooltip>
                <Tooltip title={GetImpactText(MainProp.Values[0].Attributes.CapacityImpact, "Capacity")} placement="top">
                  <div className="OptionControl-ImpactIcon"><CapacityIcon color={GetImpactIconColor(MainProp.Values[0].Attributes.CapacityImpact)} width="20px"/></div>
                </Tooltip>               
              </div>
              <Tooltip title="Click to get more information about this option" placement="top">
              <div className="OptionControl-InfoIcon" onClick={onInfoIconClick}><InfoIcon color="#2d4181" width="26px"/></div>
              </Tooltip>
            </div> 
            <span className="OptionControl-Separator"/>
            {DisplayDetails ? 
            <div className="OptionControl-DetailsContainer">
              <h3 className="OptionControl-DetailTitle">Description</h3>
              <span className="OptionControl-Detail">{MainProp.Values[0].Attributes.DetailledDescription}</span>
              <h3 className="OptionControl-DetailTitle">Advantage</h3>
              <span className="OptionControl-Detail">{MainProp.Values[0].Attributes.Advantage}</span>
              {props.children || InputBlock ? 
              <div>
                <h3 className="OptionControl-DetailTitle">Conditions</h3>
                {props.children}
                {InputBlockComp?
                  <InputBlockComp RulesJSON={props.RulesJSON} onNewAssignment={props.onValueChanged} unitSystem={props.unitSystem}/>
                  :null
                }
              </div>
              :null
              }
            </div>: null}  
          </div>
        )
      }else
        return null
    }
}

export default OptionControl;