import React, { Fragment } from 'react'
import { GetProp } from '@carrier/workflowui-globalfunctions'

function SimpleLabelWithCurrency(props) {
    let prop = GetProperty(props.PropName)

    function GetProperty(PropName) {
        return GetProp(PropName, props.RulesJSON)
    }
    function GetPriceDollar(Value) {
        return ` ${Value ? `$ ${Value}` : ''}`
    }
    function getMLPValue() {
        if (!prop) {
            return null
        } else if (!prop.Value) {
            return <span id={`ctrl${props.PropName}`}>$ 0</span>
        }
        return <span id={`ctrl${props.PropName}`}>{prop && prop.Value && `$ ${prop.Value}`}</span>
    }
    if (props.isValue) {
        return (
            <label className='currency-label' id={`ctrl${props.PropName}`}>
                {prop && `$ ${prop.Value}`}
            </label>
        )
    }
    return (
        <Fragment>
            {props.MLPValue ? (
                getMLPValue()
            ) : (
                <label className='currency-label' id={`ctrl${props.PropName}`}>
                    {' '}
                    {prop && !!prop.Value ? (
                        props.PriceDollar ? (
                            props.IsValueArray ? (
                                prop.Values.map((value, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`${props.PropName} priceDollor ${
                                                'CostColumn_' + props.OptionName + '_' + index
                                            }`}>
                                            {GetPriceDollar(value.Attributes.MLP)}
                                        </div>
                                    )
                                })
                            ) : (
                                <div className={`${props.PropName} priceDollor-content`}>
                                    {GetPriceDollar(prop.Values[0].Attributes.MLP)}
                                </div>
                            )
                        ) : null
                    ) : null}
                </label>
            )}
        </Fragment>
    )
}

export default SimpleLabelWithCurrency
