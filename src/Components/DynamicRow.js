import React from 'react';
import Col from './Col';

function DynamicRow(props) {

    if(!props.Visible || props.Visible.Value=== "TRUE"){
        return (
            <div className="row" style={{margin: "0px",padding:"5px 0", backgroundColor: props.backgroundColor, borderTop: "Solid #e5e5e5 1px"}}>
                <Col className="col-3 LeftOpCondLabel">{props.Label}</Col>
                <Col>
                  {props.children}
                </Col>
            </div>
        )
    }else
        return null
    
    
}

export default DynamicRow;