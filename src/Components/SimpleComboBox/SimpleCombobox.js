import React, { useEffect, useState, Fragment } from 'react';
import './SimpleCombobox.css'
import {GetProp} from '@carrier/workflowui-globalfunctions'
import { FormattedMessage as Culture, injectIntl } from 'react-intl';
import {FormatTransKey, keyboard, injectIntlTranslation} from '@carrier/workflowui-globalfunctions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

function SimpleCombobox(props) {
    const {isSearchable: { search, placeholder, filter } = {}, intl } = props;
    const [Open, setOpen] = useState(false)
    const [Visible, setVisible] = useState(true)
    const [Enabled, setEnabled] = useState(true)
    const [Valid, setValid] = useState(true)
    const [editedValue, setEditedValue] = useState('');

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
        if (Enabled) {
            setOpen(!Open)
        }
    }

    function clickAwayHandler() {
        setOpen(false);
    }

    function editHandler(event) {
        setEditedValue(event.target.value);
    }

    function updateValue(event) {
        event.stopPropagation();
        if (event.key === keyboard.ENTER) {
            ValueChanged(editedValue);
        }
    }

    function ValueChanged(value){
        let SelectedOption = prop.Values.find((Value)=> {
            return Value.Value.toLowerCase() === value.toLowerCase();
        })
        SelectedOption && props.onValueChanged([{Name:prop.Name, Value:SelectedOption.Value }])
        if (search) {
            setEditedValue('');
        }
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
            <Fragment>
                {props.isValidationMessage && Valid === false && <span className="ErrorText"> {props.isValidationMessage} </span>}
                <ClickAwayListener onClickAway={clickAwayHandler}>
                    <div id={"ctrl"+ props.PropName}
                        className={((prop && prop.IsRelaxed) ? "SCB-Container-notAllowed ": "")+ ("SCB-Container " + props.className)}>
                        <div className={classNames(!Enabled && "SCB-BtnWrapper-Disabled", "SCB-BtnWrapper", search && "SCB-BtnWrapper-noBorder")} onClick= {() => onDropBtnClick()}>
                            {search && Open ?
                                <input
                                    type="text"
                                    className="SCB-input-searchable"
                                    placeholder={placeholder || injectIntlTranslation(intl, "Search")}
                                    value={editedValue}
                                    onChange={editHandler}
                                    onClick={updateValue}
                                    onKeyPress={updateValue}
                                />
                                :
                                <React.Fragment>
                                    <span>
                                        {GetSelectedValue()}
                                        {(prop && prop.Value && props.PriceDollar) && <span>{GetPriceDollar(GetSelectedOption().Attributes.MLP)}</span>}
                                    </span>
                                    <div>
                                        {(props.Prices && props.Prices.length > 0) && <span className="SCB-Price">{GetPrice(GetSelectedValue())}</span>}
                                        <FontAwesomeIcon icon={faSortDown} color="#000000" />
                                    </div>
                                </React.Fragment>
                            }
                        </div>
                        {Open &&
                            <div className={classNames("SCB-SubBtnWrapper", search && "SCB-input-searchable-list")}>
                                {prop.Values.map((value, index) => {
                                    if((props.HideNotAllowedValues && value.State===2) || value.Attributes["VISIBLE"] === "FALSE")
                                        return null
                                    else if (search && editedValue && 
                                                (filter === "startsWith" ? 
                                                    !value.Attributes.Description.toLowerCase().startsWith(editedValue.toLowerCase())
                                                    : !value.Attributes.Description.toLowerCase().includes(editedValue.toLowerCase())
                                                )
                                            )
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
                            </div>
                        }
                    </div>
                </ClickAwayListener>
            </Fragment>
        )
    } else {
        return null;
    }
}

export default injectIntl(SimpleCombobox);