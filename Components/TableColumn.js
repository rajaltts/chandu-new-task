import React from 'react';

function TableColumn(props) {

    if(props.Visible.Value=== "TRUE"){
        return (
            <div>
                <div style={{backgroundColor: props.BackgroundColor, height: "40px", lineHeight: "40px", textAlign: "center", width: "250px" }}>{props.Header}</div>
                {props.children}
            </div>
        )
    }else
        return null
    
    
}

export default TableColumn;