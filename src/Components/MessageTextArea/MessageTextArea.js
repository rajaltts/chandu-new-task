import React from 'react';
import { GetProp } from '@carrier/workflowui-globalfunctions';
import './MessageTextArea.css';
const ImageFolderPath = 'Images/';

function MessageTextArea(props) {
  let valueProp = GetProperty(props.PropName)

  function GetMessageImage(props, value) {
    if (props.PropName.toUpperCase().indexOf(".MSG_ERROR") >= 0) {
      return "alert.png"
    } else if (props.PropName.toUpperCase().indexOf(".MSG_INFO") >= 0) {
        return value.Attributes.Note === "WARNING" ? "alert.png" : "success.png";
    } else if (props.PropName.toUpperCase().indexOf(".MSG_WARNING") >= 0) {
        return "warning.png"
    } else {
      return null
    }
  }
  function GetProperty(PropName) {
    return GetProp(PropName, props.RulesJSON)
  }

  return (
    <React.Fragment>
      {valueProp && !!valueProp.Value ? valueProp.Values.map((value, idx) => {
        if (value.State === 2) {
          return null;
        } else {
          return <div className="MSG-Container" key={idx}>
            <p className="MessageTextArea">
              <span className="iconLeft">
                <img src={`${ImageFolderPath}${GetMessageImage(props, value)}`} alt={props.Text} />
              </span>
              {value.Value}
            </p>
          </div>
        }
      }) : null}
    </React.Fragment>
  )
}
export default MessageTextArea;