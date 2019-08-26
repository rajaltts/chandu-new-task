import React from 'react';
import './ImageWithLabelCheckboxGroup.css'
const ImageFolderPath = 'Images/'

function ImageWithLabelCheckboxGroup(props) {

    function getFullImagePath(name){
        return ImageFolderPath + name;
    }
  
  return (
    
  <div id={"ctrl"+(props.prop ? props.prop.Name:null)} className="IWLCG-Container">
    {props.prop ? props.prop.Values.map((value, index) => {
      if(value.State === 1){
        return(
          <div onClick={() => {
            props.onValueChanged([{Name:props.prop.Name, Value:props.prop.Values[index].Value}])
          }} key={index} className="IWLCG-tile" id={"ctrl"+props.prop.Name+value.Value}>
            <div className="IWLCG-ImageContainer">
              <img alt="CtrlImage" className="IWLCG-image" src={getFullImagePath(value.Attributes.Image)}/>
            </div>
            <span className="IWLCG-Label">{value.Attributes.Description}</span>
            <div className={props.prop.AssignedValue === value.Value ? "IWLCG-Circle-Selected" : "IWLCG-Circle-NotSelected"}/>
        </div>
        )
      }    
      return null  
    }) : null}
  </div> 
  );
}

export default ImageWithLabelCheckboxGroup;