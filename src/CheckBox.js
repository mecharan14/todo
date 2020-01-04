import React, { Component } from 'react';
import './CheckBox.css';

export default class CheckBox extends Component{
    render(){
        console.log()
        return(
            <div className="checkmark" onClick={this.props.checkOf}>
            <input className="inp-cbx" type="checkbox" checked={this.props.checked} onChange={()=>{console.log()}}  style={{display: "none"}}/>
<label className="cbx" htmlFor="cbx"><span>
    <svg width="12px" height="10px" viewBox="0 0 12 10">
      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </svg></span><span></span></label>
    </div>
        );
    }
}