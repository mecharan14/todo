import React, { Component } from 'react';
import './App.css';
import ToDo from './ToDo';

export default class ToDos extends Component{
    constructor(){
        super();
        this.state = {isLoaded: false, data: null};
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        if(!navigator.onLine){
            let data = JSON.parse(localStorage.getItem("data"));
            this.setState({isLoaded: true, data})
        }else{
            fetch("https://suryacharan.ga/to-do/operations.php?action=getAll")
            .then(res=>res.json())
            .then(data=>{
                this.setState({isLoaded: true, data})
                localStorage.setItem("data", JSON.stringify(data));
            })
            .catch(err=>console.log("Error: "+err))
        }
        
    }

    checkEm(id, e){
        let truth;
        this.setState({isLoaded: true, data: this.state.data.map(todo=>{
            if(todo.id === id){
                truth = (todo.stats === "1" ? "0" : "1");
                todo.stats = truth;
            }
            return todo;
        })})

            fetch("https://suryacharan.ga/to-do/operations.php?action="+(truth === "1" ?"done" : "undone")+"&id="+id)
            .then(res=>res.text())
            .then(data=>console.log(data))
            .catch(err=>console.log("Error: ",err))
    }

    render(){
        if(!this.state.isLoaded){
            return(<h3 style={{textAlign: "center"}}>Loading...</h3>)
        }
        let items = [];
        this.state.data.forEach(each=>{
            if(parseInt(each.cat) === this.props.selected){
                items.push(<ToDo key={each.id} id={each.id} done={each.stats} cat={each.cat} item={each.item} checkOf={this.checkEm.bind(this, each.id)}/>);
            }
        })
        return(<>{items}</>)
    }
}