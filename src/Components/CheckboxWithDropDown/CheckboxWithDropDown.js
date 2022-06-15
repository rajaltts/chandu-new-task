import React, { useEffect, useState } from 'react'
import './CheckboxWithDropDown.css'
import { Checkbox } from '@material-ui/core'
import { GetProp, FormatTransKey } from '@carrier/workflowui-globalfunctions'
import { InfoIcon } from '../SvgImages'
import { FormattedMessage as Culture } from 'react-intl'
import { css } from '@emotion/core'
import { HashLoader } from 'react-spinners'

const override = css`
    display: block;
    float: left;
    margin: 10px 8.5px;
    border-color: red;
`

function CheckboxWithDropDown(props) {
    const {
        PropName,
        RulesJSON,
        ReadOnly,
        DoNotTranslate,
        children,
        onValueChanged,
        iconColor = '#2d4181',
        iconWidth = '30px',
        toggleContentPanel = false,
    } = props

    const [DisplayDetails, SetDisplayDetails] = useState(toggleContentPanel)
    const [Loading, SetLoading] = useState(false)
    const [OldValue, SetOldValue] = useState('')

    useEffect(() => {
        if (Loading) {
            let UpdatedProp = GetProperty(PropName)
            if (UpdatedProp && UpdatedProp.Value === OldValue) SetLoading(false)
        }
    }, [RulesJSON])

    useEffect(() => {
        if (toggleContentPanel !== DisplayDetails) {
            SetDisplayDetails(toggleContentPanel)
        }
    }, [toggleContentPanel])

    function ValueChanged() {
        if (!Loading && !ReadOnly) {
            SetLoading(true)
            let UpdatedValue = Value === 'TRUE' ? 'FALSE' : 'TRUE'
            SetOldValue(UpdatedValue)
            onValueChanged([{ Name: PropName, Value: UpdatedValue }])
            SetDisplayDetails(!DisplayDetails)
        }
    }

    function GetProperty(PropName) {
        return GetProp(PropName, RulesJSON)
    }

    function onInfoIconClick() {
        SetDisplayDetails(!DisplayDetails)
    }
    function GetTitle() {
        let DescriptionProp = GetProperty(PropName)
        if (DoNotTranslate) return DescriptionProp.Values[0].Attributes.Description
        return (
            <Culture
                id={FormatTransKey(PropName)}
                defaultMessage={
                    DescriptionProp ? (
                        <Culture
                            id={FormatTransKey(PropName + '|' + DescriptionProp.Values[0].Attributes.Description)}
                        />
                    ) : (
                        'MISSING TRANSLATION'
                    )
                }
            />
        )
    }

    let Value, Visibility

    if (Object.entries(RulesJSON).length > 0 && RulesJSON.constructor === Object) {
        Visibility = GetProperty(PropName + '.VISIBLE')
        if (Visibility && Visibility.Value === 'TRUE') {
            let MainProp = GetProperty(PropName)
            Value = MainProp.Value
            return (
                <div className='CBWDD-Container'>
                    <div className='CBWDD-MainContainer'>
                        <div onClick={ValueChanged} className='CBWDD-ClickableContainer'>
                            {Loading ? (
                                <HashLoader
                                    css={override}
                                    sizeUnit={'px'}
                                    size={25}
                                    color={'#123abc'}
                                    loading={Loading}
                                />
                            ) : (
                                <Checkbox
                                    id={'ctrl' + PropName}
                                    color='primary'
                                    className='CBWDD-Checkbox'
                                    checked={Value === 'TRUE' ? true : false}
                                />
                            )}
                            <span className='CBWDD-Title'>{GetTitle(MainProp)}</span>
                        </div>
                        {children ? (
                            <div className='OptionControl-InfoIcon' onClick={onInfoIconClick}>
                                <InfoIcon id={PropName} color={iconColor} width={iconWidth} />
                            </div>
                        ) : null}
                    </div>
                    <span className='CBWDD-Separator' />
                    {DisplayDetails && children ? <div className='CBWDD-DetailsContainer'>{children}</div> : null}
                </div>
            )
        }
        return null
    }
}

export default CheckboxWithDropDown
