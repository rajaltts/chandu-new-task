import React, { useState, useEffect } from "react";
import { GetProp } from "@carrier/workflowui-globalfunctions";
import { FormattedMessage as Culture } from "react-intl";
import { FormatTransKey } from "@carrier/workflowui-globalfunctions";
import "./SimpleRadioButtonWithCurrencyGroup.css";

const SimpleRadioButtonWithCurrencyGroup = (props) => {
  const { PropName, RulesJSON, className, vertical, HideNotAllowedValues, DoNotTranslate, NoteclassName, onValueChanged } = props;
  const [Visibility, SetVisibility] = useState(false);
  const [Prop, SetProp] = useState(null);

  useEffect(() => {
    const VisibleProp = GetProperty(PropName + ".VISIBLE");
    const Prop = GetProperty(PropName);
    if (VisibleProp) {
      SetVisibility(VisibleProp.Value === "TRUE" ? true : false);
    }
    else {
      SetVisibility(true);
    } 
    SetProp(Prop);
  }, [null, RulesJSON]);

  const GetProperty = (PropName) => {
    return GetProp(PropName, RulesJSON);
  }

  const GetPriceDollar = (Value) => {
    return `${!!Value ? `$ ${Value}` : "$ 0"}`;
  }

  const GetClassName = () => {
    if (className) return className;
    else if (vertical) return "SRBG-Label-vertical";
    else return "SRBG-Label-horizontal";
  }

  const handleChange = (event) => {
    onValueChanged([{ Name: PropName, Value: event.target.value }]);
  }

  if (Visibility) {
    return (
      <div>
        {Prop
          ? Prop.Values.map((value, index) => {
              if (HideNotAllowedValues && value.State === 2) return null;
              else {
                return (
                  <div key={index} className="RowDiv">
                    <div
                      id={"ctrl" + PropName}
                      className={
                        (value.State === 2 && Prop.AssignedValue === value.Value
                          ? "SRBG-radio-notAllowed "
                          : "") + GetClassName()
                      }
                    >
                      <input
                        id={"ctrl" + PropName + value.Value}
                        className="SRBG-radio"
                        type="radio"
                        name={PropName}
                        value={value.Value}
                        onChange={handleChange}
                        checked={
                          Prop.AssignedValue === value.Value ? true : false
                        }
                      />
                        {(DoNotTranslate) ?
                          <span>{value.Attributes.Description}</span>
                          :
                          <Culture
                            id={FormatTransKey(
                              PropName + "|" + value.Attributes.Description
                            )}
                          />
                        }
                      {!!value.Attributes.Note && vertical ? (
                        <div className={"LiGroup"}>
                          {" "}
                          {value.Attributes.Note.split("||").map(
                            (value, index) => {
                              return (
                                <li key={index} className={NoteclassName}>
                                  {value}
                                </li>
                              );
                            }
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className={"priceDollor"}>
                      {GetPriceDollar(value.Attributes.MLP)}
                    </div>
                  </div>
                );
              }
            })
          : null}
      </div>
    );
  } else return null;
}

export default SimpleRadioButtonWithCurrencyGroup;
