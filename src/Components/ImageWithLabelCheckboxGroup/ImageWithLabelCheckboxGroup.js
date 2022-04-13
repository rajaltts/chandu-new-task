import React from 'react'
import './ImageWithLabelCheckboxGroup.css'
const ImageFolderPath = '/Images/'

function ImageWithLabelCheckboxGroup(props) {
    function getFullImagePath(name) {
        if (props.ImagesLocationUrl) return props.ImagesLocationUrl + name
        else return ImageFolderPath + name
    }

    function RenderListItem(value, index, Class) {
        return (
            <div
                onClick={() => {
                    props.onValueChanged([
                        {
                            Name: props.prop.Name,
                            Value: props.prop.Values[index].Value,
                        },
                    ])
                }}
                key={index}
                className={`IWLCG-tile ${Class}`}
                id={'ctrl' + props.prop.Name + value.Value}
            >
                <div className='IWLCG-ImageContainer'>
                    <img alt='CtrlImage' className='IWLCG-image' src={getFullImagePath(value.Attributes.Image)} />
                </div>
                <span className='IWLCG-Label'>{value.Attributes.Description}</span>
                <div
                    className={
                        props.prop.AssignedValue === value.Value ? 'IWLCG-Circle-Selected' : 'IWLCG-Circle-NotSelected'
                    }
                />
            </div>
        )
    }

    return (
        <div id={'ctrl' + (props.prop ? props.prop.Name : null)} className='IWLCG-Container'>
            {props.prop
                ? props.prop.Values.map((value, index) => {
                      switch (value.State) {
                          case 1:
                              return RenderListItem(value, index, '')
                          case 2:
                              return props.isNotAllowedVisible ? RenderListItem(value, index, 'IWLCG-notAllow') : null
                          default:
                              return null
                      }
                  })
                : null}
        </div>
    )
}

export default ImageWithLabelCheckboxGroup
