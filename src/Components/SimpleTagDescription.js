import React, { Fragment } from 'react';
import { GetProp } from '@carrier/workflowui-globalfunctions'; 

export default function SimpleTagDescription(props) {
  function getDescription(propName) {
    let PropDescription;
    let PropData = GetProp(propName, props.RulesJSON);
    if(props.isLabel === "true") {
      return PropData ? PropData.Value : "";
    }
    else {
      if (PropData && PropData.Values) {
        PropDescription = PropData.Values.find((data) => {
          return data.Value === PropData.Value
        })
      }
      return PropDescription && PropDescription.Attributes && PropDescription.Attributes.Description;
    }
  }
  return (
    <Fragment>
      <label id={`ctrl${props.propName}`}>{getDescription(props.propName)}</label>
    </Fragment>
  )
}
