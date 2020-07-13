import React from 'react';
import {GetProp} from '@carrier/workflowui-globalfunctions';

const HorizontalCheckboxGroupWithImage = (props) => {
    const { PropName, Class, RulesJSON, isLabel, onValueChanged } = props;
    const ValueProp = GetProp(PropName, RulesJSON);

    const handleChange = () => {
        onValueChanged([{ Name:props.PropName, Value: ValueProp.Value === "FALSE" ? "TRUE": "FALSE" }]);
    }

    return (
        <div className={`IWLCG_Wrapper ${Class}`}>
            {ValueProp && ValueProp.Values.map((value, index) => {
                if(value.Value === "TRUE") {
                    return (
                        <div 
                            onClick={handleChange} 
                            key={index} 
                            className="IWLCG-tile" 
                            id={"ctrl"+ValueProp.Name+value.Value}
                        >
                            <img src={`Images/${value.Attributes.Image}`} alt="icon"/>
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