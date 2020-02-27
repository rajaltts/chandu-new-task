import React, { useEffect, useState } from 'react';
import './SimpleCombobox.css'
import {GetProp} from '@carrier/workflowui-globalfunctions'
import { FormattedMessage as Culture } from 'react-intl';
import {FormatTransKey} from '@carrier/workflowui-globalfunctions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useOnClickOutside from 'use-onclickoutside'
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

function SimpleCombobox(props) {
    const [Open, setOpen] = useState(false)
    const [Visible, setVisible] = useState(true)
    const [Enabled, setEnabled] = useState(true)
    const [Valid, setValid] = useState(true)
    const ref = React.useRef()
    useOnClickOutside(ref, () => setOpen(false))

    let prop = GetProperty(props.PropName)
    
    useEffect(() => {
        let SelectedOption = GetSelectedOption()
        if(SelectedOption && SelectedOption.State === 2 && props.HideNotAllowedValues){
            let defaultProp = GetProperty(prop.Name + ".DEFAULT")
            props.onValueChanged([{Name:prop.Name, Value:defaultProp.Value}])
        }
        UpdateState()
    }, [props.RulesJSON])

    function UpdateState(){
        let VisibleProp
        if(props.Visible)
            VisibleProp = GetProperty(props.Visible)
        if(VisibleProp === undefined)
            VisibleProp = GetProperty(props.PropName+".VISIBLE")
        if(VisibleProp === undefined)
            setVisible(true)
        else
            setVisible(VisibleProp.Value==="FALSE"?false:true)
        let EnabledProp
        if(props.Enabled)
            EnabledProp = GetProperty(props.Enabled)
        if(EnabledProp === undefined)
            EnabledProp = GetProperty(props.PropName+".ENABLED")
        if(EnabledProp === undefined)
            setEnabled(true)
        else
            setEnabled(EnabledProp.Value === "FALSE" ? false : true)
        let ValidProp
        if (props.Valid)
          ValidProp = GetProperty(props.Valid)
        if (ValidProp === undefined)
          ValidProp = GetProperty(props.PropName + ".VALID")
        if (ValidProp === undefined)
          setValid(true)
        else
          setValid(ValidProp.Value === "FALSE" ? false : true)
    }

    function onDropBtnClick(){
        if(Enabled)
            setOpen(!Open)
    }

    function ValueChanged(value){
        let SelectedOption = prop.Values.find((Value)=> {
            return Value.Value === value
        })
        props.onValueChanged([{Name:prop.Name, Value:SelectedOption.Value}])
        setOpen(false)
    }
    function GetSelectedOption(){
        if(prop && prop.Value){
            let SelectedOption = prop.Values.find((Value)=> {
                return Value.Value === prop.Value
            })
            return SelectedOption
        }
    }

    function GetSelectedValue() {
        let SelectedOption = GetSelectedOption()
        if(SelectedOption)
            return (props.DoNotTranslate?SelectedOption.Attributes.Description:<Culture id={FormatTransKey(props.PropName + "|" +SelectedOption.Attributes.Description)}/>)
        else
            return ""
    }
    function GetProperty(PropName){
        return GetProp(PropName, props.RulesJSON)
    }

    function GetPrice(Value){
        let PriceItem = props.Prices.find(p => p.Size === Value)
        if(PriceItem && PriceItem.Price)
            return PriceItem.Price.toLocaleString()+ " €"
    }

    function GetPriceDollar(Value) {
        return !!Value ? (props.isNoMLP ? ` $ ${Value}`:` $ ${Value} MLP`):" $ TBD";
    }

    if(Visible){
        return (
          <>
            {props.isValidationMessage && Valid === false && <span className="ErrorText"> {props.isValidationMessage} </span>}
            <div ref={ref} id={"ctrl"+ props.PropName}
                className={((prop && prop.IsRelaxed) ? "SCB-Container-notAllowed ": "")+ ("SCB-Container " + props.className)}>
                <div className={(!Enabled?"SCB-BtnWrapper-Disabled ":"")+"SCB-BtnWrapper"} onClick= {() => onDropBtnClick()}>   
                    <span>
                        {GetSelectedValue()}
                        {(prop && prop.Value && props.PriceDollar) ? <span>{GetPriceDollar(GetSelectedOption().Attributes.MLP)}</span> : null}
                    </span>
                    <div>
                        {(props.Prices && props.Prices.length > 0)?<span className="SCB-Price">{GetPrice(GetSelectedValue())}</span>:null}
                        <FontAwesomeIcon icon={faSortDown} color="#000000"/>
                    </div>
                    
                </div>
                {Open?
                    <div className="SCB-SubBtnWrapper">
                        {prop.Values.map((value, index) => {
                            if((props.HideNotAllowedValues && value.State===2) || value.Attributes["VISIBLE"] === "FALSE")
                                return null
                            else if (props.DoNotTranslate)
                                return <div valueid={value.Value} onClick={() => ValueChanged(value.Value)} className={(value.State>1? "NotAllowedValue": "")+" SCB-valueContainer"} key={index}>
                                        <span>
                                            {value.Attributes.Description}
                                            {(props.PriceDollar) ? <span>{GetPriceDollar(value.Attributes.MLP)}</span> : null}
                                        </span>
                                        {(props.Prices && props.Prices.length > 0)?<span className="SCB-Price">{GetPrice(value.Attributes.Description)}</span>:null}
                                    </div>
                            else
                            return <div valueid={value.Value} onClick={() => ValueChanged(value.Value)} className={(value.State>1? "NotAllowedValue": "")+" SCB-valueContainer"} key={index}>
                                        <Culture id={FormatTransKey(props.PropName + "|" +value.Attributes.Description)} key={index}/>
                                        {(props.Prices && props.Prices.length > 0)?<span className="SCB-Price">{GetPrice(value.Attributes.Description)}</span>:null}
                                    </div>
                        })}
                    </div>: null
                }
            </div>
          </>
        )
    }else return null
}

export default SimpleCombobox;