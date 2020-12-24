import React from 'react';

const SimpleLabelWithImage = (props) => {
  const { className, noSpaceLeft, ImageName, Text, children } = props;
  
  return (
    <label className={`SimpleLabel ${className}`}>
      {!noSpaceLeft && 
        <span className="iconLeft">
          {ImageName && <img src={`Images/${ImageName}`} alt={Text} />}
        </span>
      }
      {Text}
      {children}
    </label>
  )
}

export default SimpleLabelWithImage;