import React, { Component } from 'react';

export default class AddBox extends Component{
    render(){
        return(
            <div className="addBox">
                <button className="removeBox" onClick={this.props.closeAdd}><i className="material-icons">close</i></button>
                <h1>Add Todo</h1>
                <input type="text" className="inputBox" id="inputAdd" autoFocus={true} placeholder="What you want to do?"></input>
                <button className="addBtn2" onClick={this.props.checkAdd}><i className="material-icons">add_circle_outline</i></button>
            </div>
        )
    }
}