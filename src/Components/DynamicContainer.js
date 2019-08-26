import React from 'react';

function DynamicContainer (props) {

    if(!props.Visible || props.Visible.Value === "TRUE"){
        return (
            <div className={props.className}>
                {props.children}
            </div>
        )
    }else
    if(props.KeepSpaceWhenHidden)
            return <div style={{visibility: "hidden"}} className={props.className}></div>
    else
        return null
    
    
}

export default DynamicContainer;