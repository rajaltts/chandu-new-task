import React, { useEffect, useState } from 'react'
import {GetProp} from '@carrier/workflowui-globalfunctions'
import Tooltip from '@material-ui/core/Tooltip'
import SimpleLabelWithImage from '../SimpleLabelWithImage'
import {makeStyles} from '@material-ui/core'
import { Incomp } from '../../SvgImages'

const useStyles = makeStyles((theme) => ({
    IncompWrapper:{
        flexGrow: 1,
    },
}))

const SimpleLabelWithImageWarnIcon = (props) => {
    const {PropName, RulesJSON, color='#FF9900', warnMessage='', ImageName, Text='', className='', noSpaceLeft, 
        iconStyle={width: '18px',marginRight: '0px',float:'right'}} = props
    const [showWarn, setShowWarn] = useState(false)
    const {IncompWrapper} = useStyles()
    useEffect(() => {
        const Prop = GetProp(PropName, RulesJSON)
        const AssignedValue = Prop.AssignedValue
        const obj = Prop.Values.find(item => item.Value === AssignedValue)
        setShowWarn(obj.State === 2)
    }, [RulesJSON])

    return (
        <SimpleLabelWithImage className={className} ImageName={ImageName} Text={Text} noSpaceLeft={noSpaceLeft}>
            {showWarn ?
                <div className={IncompWrapper}>
                    <Tooltip title={warnMessage} aria-label={warnMessage}>
                        <Incomp 
                            color={color}
                            style={iconStyle}
                        />
                    </Tooltip>
                </div> : null}
        </SimpleLabelWithImage>
    )
}

export default SimpleLabelWithImageWarnIcon