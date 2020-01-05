import React, { Component } from 'react';
import './App.css';
import CheckBox from './CheckBox';

export default class ToDo extends Component{
    render(){
        let id = this.props.id;
        return(<div className="listItem"  key={id}>
            <CheckBox id={id} checked={this.props.done === "1" ? true : false} val={this.props.item} checkOf={this.props.checkOf}/>
            
            <p className={this.props.done === "1" ? "done" : ""}>{this.props.item}</p>
            <button className="delBtn" onClick={this.props.delTodo}>
                <i className="material-icons">delete</i>
                </button>
                </div>)
    }
}


//<input type="checkbox" className="checkmark" id={id}  onChange={this.change.bind(this,id)}></input>