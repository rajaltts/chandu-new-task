import React, { Fragment } from 'react';
import { GetProp } from '@carrier/workflowui-globalfunctions'

function SimpleLabelWithCurrency(props) {

    let prop = GetProperty(props.PropName)

    function GetProperty(PropName) {
        return GetProp(PropName, props.RulesJSON)
    }
    function GetPriceDollar(Value) {
        return ` ${!!Value ? `$ ${Value}` : ""}`
    }
    function getMLPValue() {
        if (!prop) {
            return null;
        }
        else if (!prop.Value) {
            return `$ 0`;
        }
        return prop && prop.Value && `$ ${prop.Value}`;
    }
    if (props.isValue) {
        return (
            <label className="currency-label">
                {prop && `$ ${prop.Value}`}
            </label>
        )
    }
    else {
        return (
            <Fragment>
                {props.MLPValue ? getMLPValue() :
                    <label className="currency-label">  {
                        prop && !!prop.Value ?
                            (props.PriceDollar) ?
                                props.IsValueArray ? prop.Values.map((value, index) => { return <div className={`${props.PropName} priceDollor ${'Cost_' + index}`}>{GetPriceDollar(value.Attributes.MLP)}</div> }) : <div className={`${props.PropName} priceDollor-content`}>{GetPriceDollar(prop.Values[0].Attributes.MLP)}</div>
                                : null : null
                    }
                    </label>
                }
            </Fragment>
        )
    }
}

export default SimpleLabelWithCurrency;