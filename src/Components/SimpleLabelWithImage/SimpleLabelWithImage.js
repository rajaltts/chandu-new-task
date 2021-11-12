import React from 'react';
import Tooltip from '@material-ui/core/Tooltip'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
const SimpleLabelWithImage = (props) => {
    const { className, noSpaceLeft, ImageName, Text, children, showTooltip = false, tooltipMessage = ''} = props;
  
  return (
    <label className={`SimpleLabel ${className}`}>
      {!noSpaceLeft && 
        <span className="iconLeft">
          {ImageName && <img src={`/Images/${ImageName}`} alt={Text} />}
        </span>
      }
      {Text}
      {children}
      {showTooltip && <Tooltip title={tooltipMessage} aria-label={tooltipMessage}>
                          <InfoOutlinedIcon className='HCGWII_Icon'/>
                      </Tooltip>}
    </label>
  )
}

export default SimpleLabelWithImage;