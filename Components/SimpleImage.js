import React, { useEffect, useState } from 'react';
const ImageFolderPath = 'Images/'

function SimpleImage(props) {
    const [ImagePath, SetImagePath] = useState('')

    useEffect(() => {
        let SelectedValue
        if(props.Prop)
            SelectedValue = props.Prop.Value
        if (SelectedValue){
            let ImageValue = props.Prop.Values.find((value) => {
                return value.Value === SelectedValue
            }) 
            SetImagePath(ImageFolderPath + ImageValue.Attributes.Image)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <img alt={SelectedValue}  src={ImagePath}/>
    );
}

export default SimpleImage;