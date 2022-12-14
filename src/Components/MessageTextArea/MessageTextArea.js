import React, { Fragment } from 'react'
import { GetProp, FormatTransKey } from '@carrier/workflowui-globalfunctions'
import { translation } from '@carrier/ngecat-reactcomponents'
import './MessageTextArea.css'
const ImageFolderPath = '/Images/'
function MessageTextArea(props) {
    let valueProp = GetProperty(props.PropName)

    function GetMessageImage(props, value) {
        if (props.PropName.toUpperCase().indexOf('.MSG_ERROR') >= 0) {
            return 'alert.png'
        } else if (props.PropName.toUpperCase().indexOf('.MSG_INFO') >= 0) {
            return value.Attributes.Note === 'WARNING' ? 'alert.png' : 'success.png'
        } else if (props.PropName.toUpperCase().indexOf('.MSG_WARNING') >= 0) {
            return 'warning.png'
        } else if (props.PropName.toUpperCase().indexOf('.MSG_QCREASON') >= 0) {
            return 'success.png'
        }
        return null
    }
    function GetProperty(PropName) {
        return GetProp(PropName, props.RulesJSON)
    }

    function getLineDelimiterValue(txtVal) {
        return txtVal.split(props.LineDelimiter).map((str, index) => <p key={index}>{str}</p>)
    }

    function getIcon(value) {
        return (
            <span className='iconLeft'>
                <img src={`${ImageFolderPath}${GetMessageImage(props, value)}`} alt={props.Text} />
            </span>
        )
    }

    function getTextElement(value) {
        return props.LineDelimiter ? (
            <div className='MessageTextArea'>
                {getIcon(value)}
                {props.DoTranslate
                    ? getLineDelimiterValue(translation(FormatTransKey(value.Value), value.Value))
                    : getLineDelimiterValue(value.Value)}
            </div>
        ) : (
            <p className='MessageTextArea'>
                {getIcon(value)}
                {props.DoTranslate ? translation(FormatTransKey(value.Value), value.Value) : value.Value}
            </p>
        )
    }

    return (
        <Fragment>
            {valueProp && !!valueProp.Value
                ? valueProp.Values.map((value, idx) => {
                      if (value.State === 2) {
                          return null
                      }
                      return (
                          <div className='MSG-Container' key={idx}>
                              {getTextElement(value)}
                          </div>
                      )
                  })
                : null}
        </Fragment>
    )
}
export default MessageTextArea
