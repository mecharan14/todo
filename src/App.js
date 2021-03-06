import React, { Component } from 'react';
import './App.css';
import ToDos from './ToDos';


export default class App extends Component{
  constructor(){
    super();
    this.state = {indexSelected: 0};
  }

  selectIndex(n){
    this.setState({indexSelected: n});
  }

  openAdd = () =>{
    let el = document.querySelector(".addBox");
    el.style.display = "block";
  }

  render(){
    return(
      <>
      <nav className="nav">Remainders <button className="addBtn" onClick={this.openAdd}><i className="material-icons">add</i></button></nav>
      
      <ToDos selected={this.state.indexSelected}/>
      <div className="gap"></div>
      <div className="footer">
        <button className={this.state.indexSelected === 0 ? "active" : ""}><i className="material-icons" onClick={this.selectIndex.bind(this, 0)}>shopping_cart</i></button>
        <button className={this.state.indexSelected === 1 ? "active" : ""}><i className="material-icons" onClick={this.selectIndex.bind(this, 1)}>movie</i></button>
        <button className={this.state.indexSelected === 2 ? "active" : ""}><i className="material-icons" onClick={this.selectIndex.bind(this, 2)}>calendar_today</i></button>
        <button className={this.state.indexSelected === 3 ? "active" : ""}><i className="material-icons" onClick={this.selectIndex.bind(this, 3)}>link</i></button>
      </div>
      <div className="toast" id="toast">Toast</div>
      </>
    );
  }
}
