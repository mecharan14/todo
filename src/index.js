import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

const connSttg = () => {
	
	if(navigator.onLine){
		let toSync = localStorage.getItem("syncables");
		
		if(toSync != null){
            fetch("https://suryacharan.ga/to-do/operations.php?action=sync&data="+encodeURI(toSync))
                        .then(res=>res.json())
                        .then(data=>{
                            if(data[0] === "true"){
                                localStorage.removeItem("syncables");
                            }
                        })
		}
	}
}

window.addEventListener('online',  connSttg);
window.addEventListener('offline', connSttg);

window.onload = () => {
    if(navigator.onLine){
		let toSync = localStorage.getItem("syncables");
		
		if(toSync != null){
            fetch("https://suryacharan.ga/to-do/operations.php?action=sync&data="+encodeURI(toSync))
                        .then(res=>res.json())
                        .then(data=>{
                            if(data[0] === "true"){
                                localStorage.removeItem("syncables");
                            }
                        })
		}
	}
}