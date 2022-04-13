import { GetProp } from '@carrier/workflowui-globalfunctions'
import React, { Fragment } from 'react'

const HorizontalRadioGroupWithImage = (props) => {
    const { PropName, RulesJSON, unCheckRadio, onValueChanged, isNotAllowedVisible, isRequired } = props
    const ValueProp = GetProp(PropName, RulesJSON)

    const ErrorMsg = () => {
        let errFlag = false
        for (let i = 0; i < ValueProp.Values.length; i++) {
            if (ValueProp.Values[i].Attributes.VISIBLE === 'TRUE' && ValueProp.Values[i].State === 1) {
                errFlag = false
                break
            } else {
                errFlag = true
            }
        }
        return errFlag
    }

    const handleChange = (value, index) => {
        onValueChanged([
            {
                Name: ValueProp.Name,
                Value: value.Value === ValueProp.AssignedValue && unCheckRadio ? 'NONE' : ValueProp.Values[index].Value,
            },
        ])
    }

    return (
        <Fragment>
            <div className='IWLCG_Wrapper'>
                {ValueProp && ValueProp.Values
                    ? ValueProp.Values.map((value, index) => {
                          if (value.Attributes.VISIBLE === 'TRUE') {
                              return (
                                  <div
                                      onClick={() => handleChange(value, index)}
                                      key={index}
                                      className={`IWLCG-tile ${
                                          value.State === 1 ? `` : isNotAllowedVisible ? 'IWLCG-notAllow' : `disabled`
                                      }`}
                                      id={'ctrl' + ValueProp.Name + value.Value}
                                  >
                                      <img src={`/Images/${value.Attributes.Image}`} alt='icon' />
                                      {props.isLabel && (
                                          <span className='IWLCG-Label'>{value.Attributes.Description}</span>
                                      )}

                                      <div
                                          className={
                                              ValueProp.AssignedValue === value.Value
                                                  ? 'IWLCG-Circle-Selected'
                                                  : 'IWLCG-Circle-NotSelected'
                                          }
                                      />
                                  </div>
                              )
                          }
                      })
                    : null}
            </div>
            {ValueProp && ValueProp.AssignedValue === 'NONE' && !ErrorMsg() && isRequired && (
                <div style={{ color: 'red' }}>This Field is required</div>
            )}
        </Fragment>
    )
}

export default HorizontalRadioGroupWithImage
