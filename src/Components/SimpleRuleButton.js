import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetProp } from '@carrier/workflowui-globalfunctions'

const SimpleRuleButton = (props) => {
    const { id, icon, propName, name, guiPropName, RulesJSON, onClick } = props
    const enableProp = GetProp(`${propName}.ENABLED`, RulesJSON)

    const handleClick = () => {
        onClick([
            { Name: propName, Value: 'TRUE' },
            { Name: guiPropName, Value: guid().replace(/-/g, '') },
        ])
    }

    const guid = () => {
        const s4 = () =>
            Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1)
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    }

    return (
        <button
            id={id}
            className={enableProp && enableProp.Value === 'FALSE' ? 'eButtondisable' : 'eButtonPrimary'}
            disabled={enableProp && enableProp.Value === 'FALSE' ? true : false}
            onClick={handleClick}>
            {icon && <FontAwesomeIcon icon={icon} />}
            {name}
        </button>
    )
}

export default SimpleRuleButton
