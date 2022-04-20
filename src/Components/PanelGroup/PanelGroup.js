import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { GetProp, getBooleanValue, isRelaxed } from '@carrier/workflowui-globalfunctions'
import './PanelGroup.css'

function PanelGroup(props) {
    const [open, setOpen] = useState(props.open ? props.open : false)

    useEffect(() => {
        setOpen(props.open)
    }, [props.open])

    function togglePanel(e) {
        if (
            e.target.id === 'PanelSection' ||
            e.target.id === 'SubHeaderTitle' ||
            e.target.id === 'SubHeader' ||
            e.target.id === 'PanelCaret'
        ) {
            props.togglePanel ? props.togglePanel() : setOpen(!open)
        }
    }

    let ValidProp = props.RulesJSON && GetProp(props.validStateCheckProp, props.RulesJSON)
    return (
        <div id='PanelSection' className='PanelSection' onClick={(e) => togglePanel(e)}>
            <div id='SubHeader' className='SubHeader'>
                <h1 id='SubHeaderTitle' className='SubHeaderTitle'>
                    {props.panelName}
                    {((ValidProp && !getBooleanValue(ValidProp.Value)) ||
                        isRelaxed(props.RulesJSON, props.relaxedPropName)) && (
                        <span className='StepNotValidText NaApp'>
                            <FontAwesomeIcon icon={faExclamationCircle} size='lg' color='#CC0000' />
                        </span>
                    )}
                </h1>
                <span id='PanelCaret' className={open ? 'caret caret-reversed' : 'caret'} />
            </div>
            {open ? <div className='SubContainer'>{props.children}</div> : ''}
        </div>
    )
}

export default PanelGroup
