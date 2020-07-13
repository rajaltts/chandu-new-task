import React from 'react';

const SimpleLabelWithImage = (props) => {
  const { className, noSpaceLeft, ImageName, Text } = props;
  
  return (
    <label className={`SimpleLabel ${className}`}>
      {!noSpaceLeft && 
        <span className="iconLeft">
          {ImageName && <img src={`Images/${ImageName}`} alt={Text} />}
        </span>
      }
      {Text}
    </label>
  )
}

export default SimpleLabelWithImage;