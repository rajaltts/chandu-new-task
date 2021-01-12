import React, {useState, useEffect} from 'react';
import {GetProp, getBooleanValue} from '@carrier/workflowui-globalfunctions';
import classNames from 'classnames'

const HorizontalCheckboxGroupWithImage = (props) => {
    const { PropName, Class, RulesJSON, isLabel, onValueChanged, checkEnabledRule = false, isRedHighlight = false} = props;
    const ValueProp = GetProp(PropName, RulesJSON);
    const [Enabled, SetEnabled] = useState(true)
    const ENABLED = '.ENABLED'

    useEffect(() => {
      if (checkEnabledRule) {
        let EnableProp = GetProp(PropName + ENABLED, RulesJSON);
        if (EnableProp) {
          SetEnabled(EnableProp.Value === "TRUE" ? true : false);
        } else {
          SetEnabled(true);
        }
      }
    }, [props.RulesJSON]);    

    const handleChange = () => {
        onValueChanged([{ Name:props.PropName, Value: ValueProp.Value === "FALSE" ? "TRUE": "FALSE" }]);
    }

    return (
        <div className={`IWLCG_Wrapper ${Class}`}>
            {ValueProp && ValueProp.Values.map((value, index) => {
                if(value.Value === "TRUE") {
                    const enableRedHighlight = isRedHighlight && value.State === 2 && getBooleanValue(ValueProp.Value) ;
                    return (
                        <div 
                            onClick={handleChange} 
                            key={index}
                            className={classNames("IWLCG-tile", enableRedHighlight && "IWLCG-notAllow", !Enabled && "IWLCG_Disabled")}
                            id={"ctrl"+ValueProp.Name+value.Value}
                        >
                            <img src={`/Images/${value.Attributes.Image}`} alt="icon"/>
                            {isLabel &&
                                <span className="IWLCG-Label">
                                    <input type="checkbox" onChange={handleChange} checked={ValueProp.AssignedValue === value.Value} />
                                    {value.Attributes.Description}
                                </span>
                            }
                            <div className={ValueProp.AssignedValue === value.Value ? "IWLCG-Circle-Selected" : "IWLCG-Circle-NotSelected"}/>
                        </div> 
                    )
                }
            })}
        </div>
    )
}

export default HorizontalCheckboxGroupWithImage;