import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import './OptionControl.css'
import { Checkbox } from '@material-ui/core';
import InfoIcon from './information.svg'
import IncompIcon from './Incomp.svg'
import {GetProp} from '@carrier/workflowui-globalfunctions'
import Tooltip from '@material-ui/core/Tooltip';

const ImageFolderPath = 'Images/'


const OptionCheckbox = withStyles({
    root: {
      marginRight: '20px',
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);

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

    function GetImpactIconImage(Property) {
        let Val = Property.Values.find((value) => {
            return value.Value === Property.Value
        })
        if(Val)
          return ImageFolderPath+ Val.Attributes.Image;
    }
    function GetImpactIconText(PropName) {
      let Prop = GetProperty(PropName)
      let Val = Prop.Values.find((value) => {
          return value.Value === Prop.Value
      })
      if(Val)
        return Val.Attributes.Description;
  }

    function onInfoIconClick(){
      SetDisplayDetails(!DisplayDetails)
    }

    let Value, Name, OptNumber, CapImpactIconImage, EffImpactIconImage, NoiseImpactIconImage, Allowed, Description, Advantage, InputBlock, InputBlockComp

    if(Object.entries(props.RulesJSON).length > 0 && props.RulesJSON.constructor === Object){
      let VisibilityProp = GetProperty(props.PropName+".VISIBLE")
      if(VisibilityProp && VisibilityProp.Value === "TRUE"){
        let MainProp = GetProperty(props.PropName)
        if(MainProp){
          Value = MainProp.Value
          Name = MainProp.Values[0].Attributes.Description
          if(!Name)
            Name = GetProperty(props.PropName+".DESCRIPTION").Value
            
          OptNumber = GetProperty(props.PropName+".SUBTITLE").Value
          InputBlock = MainProp.Values[0].Attributes.TOS
          if(InputBlock)
          InputBlockComp = props.InputBlocksLib[InputBlock]
          CapImpactIconImage = GetImpactIconImage(GetProperty(props.PropName+".CAPACITYIMPACT.IMAGE"))
          EffImpactIconImage = GetImpactIconImage(GetProperty(props.PropName+".EFFICIENCYIMPACT.IMAGE"))
          NoiseImpactIconImage = GetImpactIconImage(GetProperty(props.PropName+".SOUNDIMPACT.IMAGE"))
          Description = GetProperty(props.PropName+".DETAILEDDESCRIPTION").Value
          let AdvantageProp = GetProperty(props.PropName+".ADVANTAGE")
          if(AdvantageProp)
            Advantage = GetProperty(props.PropName+".ADVANTAGE").Value

          Allowed = MainProp.Values[0].State===2
        }

        return (
          <div  className="OptionControl-Container">
            <div className="OptionControl-MainContainer">
              <div onClick={ValueChanged} className="OptionControl-ClickableContainer">
                <OptionCheckbox color="primary" className="OptionControl-Checkbox" id={"ctrl"+ props.PropName} checked={Value ==="TRUE"?true:false}/>
                <div className="OptionControl-LabelsContainer">
                    <span className="OptionControl-OptName">{Name}</span>
                    <span className="OptionControl-OptNumber">{OptNumber}</span>
                </div>
                {Allowed?<img alt="CompIcon" className="OptionControl-CompIcon" src={IncompIcon}/>:null}
                <Tooltip title={GetImpactIconText(props.PropName+".CAPACITYIMPACT.IMAGE")} placement="top">
                  <img alt="ImpactIcon" className="OptionControl-ImpactIcon" src={CapImpactIconImage}/>
                </Tooltip>
                <Tooltip title={GetImpactIconText(props.PropName+".EFFICIENCYIMPACT.IMAGE")} placement="top">
                  <img alt="ImpactIcon" className="OptionControl-ImpactIcon" src={EffImpactIconImage}/>
                </Tooltip>
                <Tooltip title={GetImpactIconText(props.PropName+".SOUNDIMPACT.IMAGE")} placement="top">
                  <img alt="ImpactIcon" className="OptionControl-ImpactIcon" src={NoiseImpactIconImage}/>
                </Tooltip>
              </div>
              <Tooltip title="Click to get more information about this option" placement="top">
                <img alt="InfoIcon" className="OptionControl-InfoIcon" src={InfoIcon} onClick={onInfoIconClick}/>
              </Tooltip>
              
            </div> 
            <span className="OptionControl-Separator"/>
            {DisplayDetails ? 
            <div className="OptionControl-DetailsContainer">
              <h3 className="OptionControl-DetailTitle">Description</h3>
              <span className="OptionControl-Detail">{Description}</span>
              <h3 className="OptionControl-DetailTitle">Advantage</h3>
              <span className="OptionControl-Detail">{Advantage}</span>
              {props.children || InputBlock ? 
              <div>
                <h3 className="OptionControl-DetailTitle">Conditions</h3>
                {props.children}
                {InputBlockComp?
                  <InputBlockComp RulesJSON={props.RulesJSON} onNewAssignment={props.onNewAssignment} unitSystem={props.unitSystem}/>
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