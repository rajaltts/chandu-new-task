import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import './CheckboxWithDropDown.css'
import { Checkbox } from '@material-ui/core';
import InfoIcon from './information.svg'
import {GetProp} from '@carrier/workflowui-globalfunctions'

const OptionCheckbox = withStyles({
    root: {
      marginRight: '20px',
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);

function CheckboxWithDropDown(props) {
  
  const [DisplayDetails, SetDisplayDetails] = React.useState(false)

    function ValueChanged(event){
        props.onValueChanged([{Name:props.PropName, Value:(Value === "TRUE" ? "FALSE":"TRUE")}])
        SetDisplayDetails(!DisplayDetails)
    }

    function GetProperty(PropName){
      return GetProp(PropName, props.RulesJSON)
    }

    function onInfoIconClick(){
      SetDisplayDetails(!DisplayDetails)
    }

    let Value, Title, Visibility

    if(Object.entries(props.RulesJSON).length > 0 && props.RulesJSON.constructor === Object){
      Visibility = GetProperty(props.PropName+".VISIBLE")
      if(Visibility && Visibility.Value === "TRUE"){
        let MainProp = GetProperty(props.PropName)
        if(MainProp){
            Value = MainProp.Value
            Title = MainProp.Values[0].Attributes.Description
            if(!Title)
              Title = GetProperty(props.PropName+".DESCRIPTION").Value
        }

        return (
            <div  className="CBWDD-Container">
            <div className="CBWDD-MainContainer">
                <div onClick={ValueChanged} className="CBWDD-ClickableContainer">
                  <OptionCheckbox id={"ctrl"+ props.PropName} color="primary" className="CBWDD-Checkbox" checked={Value ==="TRUE"?true:false}/>
                  <span className="CBWDD-Title">{Title}</span>
                </div>
                {props.children ? <img alt="InfoIcon" className="CBWDD-InfoIcon" src={InfoIcon} onClick={onInfoIconClick}/> : null}
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