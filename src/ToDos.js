import React, { Component } from 'react';
import './App.css';
import ToDo from './ToDo';
import AddBox from './AddTodo';

export default class ToDos extends Component{
    constructor(){
        super();
        this.state = {isLoaded: false, data: null};
    }

    componentDidMount(){
        this.getData();
    }

    toast = (msg)=>{
        let el = document.querySelector("#toast");
    el.innerHTML = msg;
    el.style.opacity = "1";
    el.style.bottom = "0";
    setTimeout(()=>{
        el.style.opacity = "0";
        el.style.bottom = "-20%";
    },2000)
    }


    
      closeAdd = () => {
        let el = document.querySelector(".addBox");
        el.style.display = "none";
        document.querySelector("#inputAdd").value = "";
      }

    getData(){
        if(!navigator.onLine){
            let list = JSON.parse(localStorage.getItem("data"));
            let syncables = JSON.parse(localStorage.getItem("syncables"));
            this.setState({isLoaded: true, data: [...list,...syncables]})
        }else{
            let syncables = JSON.parse(localStorage.getItem("syncables"));
            fetch("https://suryacharan.ga/to-do/operations.php?action=getAll")
            .then(res=>res.json())
            .then(data=>{
                if(syncables != null){
                    this.setState({isLoaded: true, data: [...data,...syncables]})
                }else{
                    this.setState({isLoaded: true, data})
                }
                
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
            .then(data=>{
                    this.toast((truth === "1" ?"Done" : "Undone"))
                
            })
            .catch(err=>console.log("Error: ",err))
    }



    checkAdd = () =>{
        let val = document.querySelector("#inputAdd").value;
        if(val === ""){
            console.log("Empty todo");
        }else{
            let curr = {
                id: Math.floor(Math.random(0, 100)),
                item: val,
                cat: this.props.selected,
                stats: '0'
            }
            this.setState({isLoaded: true, data: [...this.state.data, curr]})

            if(navigator.onLine){
                fetch("https://suryacharan.ga/to-do/operations.php?action=add&item="+curr.item+"&stats="+curr.stats+"&cat="+curr.cat)
                .then(res=>res.json())
                .then(data=>console.log(data));
            }else{
                if(localStorage.getItem("syncables")){
                    let arr = JSON.parse(localStorage.getItem("syncables"));
                    arr.push(curr);
                    localStorage.setItem("syncables", JSON.stringify(arr));
    
                }else{
                    let arr = [curr];
                    localStorage.setItem("syncables", JSON.stringify(arr));
                }
            }

            
        }
        this.toast("Added");
        this.closeAdd();
    }

    delTodo = (id, e) =>{
        let ch = window.confirm("Do you really want to do?");
        if(ch){
            fetch("https://suryacharan.ga/to-do/operations.php?action=del&id="+id)
            .then(res=>res.text())
            .then(data=>{
                if(data === "success"){
                    this.toast("Deleted");
                    this.getData()
                }
            })
        }
        
    }

    render(){
        if(!this.state.isLoaded){
            return(<h3 style={{textAlign: "center"}}>Loading...</h3>)
        }
        let items = [<AddBox closeAdd={this.closeAdd} key="addBox" checkAdd={this.checkAdd}/>];
        this.state.data.forEach(each=>{
            if(parseInt(each.cat) === this.props.selected){
                items.push(<ToDo key={each.id} id={each.id} delTodo={this.delTodo.bind(this, each.id)} done={each.stats} cat={each.cat} item={each.item} checkOf={this.checkEm.bind(this, each.id)}/>);
            }
        })
        return(<>{items}</>)
    }
}