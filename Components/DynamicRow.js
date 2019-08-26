import React from 'react';

function DynamicRow(props) {

    if(!props.Visible || props.Visible.Value=== "TRUE"){
        return (
            <div style={{margin: "0px", backgroundColor: props.backgroundColor, borderTop: "Solid #e5e5e5 1px", display:"flex", flexWrap:"wrap"}}>
                <div className="col col-lg-3 LeftOpCondLabel">{props.Label}</div>
                <div style={{flexBasis:0, flexGrow:1,maxWidth:"100%", padding:"5px 15px"}}>
                  {props.children}
                </div>
            </div>
        )
    }else
        return null
    
    
}

export default DynamicRow;