import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);   
    this.secondRoute="";
    this.thirdRoute="";
    this.fourthRoute="";
    this.message1="";
    this.message2="";
    this.message3="";
    this.message4="";
    this.superSecretData="";
    this.state = {success1:false, success2:false, success3:false, success4:false}
  }


  firstAuthentication = () => {
    let password1 = this.refs.password1.value;    
   
    fetch(`http://localhost:8080/firststepsecurity`, { 
      method: "POST",      
      headers: {
        'Content-type':'application/json',
        'Custom-Auth-Step1' : password1,
        // 'Custom-Auth-Step2' : 'Second password',
        // 'Custom-Auth-Step3' : 'Third password',
        // 'Custom-Auth-Step4' : 'Fourth password',
        // 'Custom-Auth-Step5' : 'Fifth password', 
      }
    })
    .then(response => {
      if (response.status >= 400) {        
        console.log(response.status);      
      }    
      return response.json();
    })
    .then(data => {
      console.log(data);

      if(data.success) {        
        this.refs.token1.value = data.token;
        this.message1 = data.message;
        this.secondRoute = data.secondRoute;
        this.setState({success1:true});        
      }
      else {
        this.refs.token1.value = "";
        this.message1 = data.message;
        this.setState({success1:false});
      }

      //this.refs.resultpassword1.innerHTML = data;
    }); 
  }
  


  secondAuthentication = () => {
    let password2 = this.refs.password2.value;
    let token1 = this.refs.token1.value;    
   
    fetch(`http://localhost:8080/${this.secondRoute}`, { 
      method: "POST",   
      body: JSON.stringify({token1:token1}),   
      headers: {
        'Content-type':'application/json',
        'Custom-Auth-Step2' : password2,
        // 'Custom-Auth-Step2' : 'Second password',
        // 'Custom-Auth-Step3' : 'Third password',
        // 'Custom-Auth-Step4' : 'Fourth password',
        // 'Custom-Auth-Step5' : 'Fifth password', 
      }
    })
    .then(response => {
      if (response.status >= 400) {        
        console.log(response.status);      
      }    
      return response.json();
    })
    .then(data => {
      console.log(data);

      if(data.success) {        
        this.refs.token2.value = data.token;
        this.message2 = data.message;
        this.thirdRoute = data.thirdRoute;
        this.refs.secondAuth.className = 'hideElement';
        this.setState({success2:true});        
      }
      else {
        this.refs.token2.value = "";
        this.message2 = data.message;
        this.setState({success2:false});
      }

      //this.refs.resultpassword1.innerHTML = data;
    }); 
  }


  thirdAuthentication = () => {
    let password3 = this.refs.password3.value;
    let token2 = this.refs.token2.value;    
   
    fetch(`http://localhost:8080/${this.thirdRoute}`, { 
      method: "POST",   
      body: JSON.stringify({token2:token2}),   
      headers: {
        'Content-type':'application/json',
        'Custom-Auth-Step3' : password3,
        // 'Custom-Auth-Step2' : 'Second password',
        // 'Custom-Auth-Step3' : 'Third password',
        // 'Custom-Auth-Step4' : 'Fourth password',
        // 'Custom-Auth-Step5' : 'Fifth password', 
      }
    })
    .then(response => {
      if (response.status >= 400) {        
        console.log(response.status);      
      }    
      return response.json();
    })
    .then(data => {
      console.log(data);

      if(data.success) {        
        this.refs.token3.value = data.token;
        this.message3 = data.message;
        this.fourthRoute = data.fourthRoute;
        this.refs.thirdAuth.className = 'hideElement';
        this.setState({success3:true});        
      }
      else {
        this.refs.token3.value = "";
        this.message3 = data.message;
        this.setState({success3:false});
      }

      //this.refs.resultpassword1.innerHTML = data;
    }); 
  }


  fourthAuthentication = () => {
    let password4 = this.refs.password4.value;
    let token3 = this.refs.token3.value;    
   
    fetch(`http://localhost:8080/${this.fourthRoute}`, { 
      method: "POST",   
      body: JSON.stringify({token3:token3}),   
      headers: {
        'Content-type':'application/json',
        'Custom-Auth-Step4' : password4,
        // 'Custom-Auth-Step2' : 'Second password',
        // 'Custom-Auth-Step3' : 'Third password',
        // 'Custom-Auth-Step4' : 'Fourth password',
        // 'Custom-Auth-Step5' : 'Fifth password', 
      }
    })
    .then(response => {
      if (response.status >= 400) {        
        console.log(response.status);      
      }    
      return response.json();
    })
    .then(data => {
      console.log(data);

      if(data.success) {       
        this.superSecretData = data.superSecretData;
        this.message4 = data.message;
        this.refs.fourthAuth.className = 'hideElement';
        this.setState({success4:true});        
      }
      else {
        
        this.message4 = data.message;
        this.setState({success4:false});
      }

      //this.refs.resultpassword1.innerHTML = data;
    }); 
  }

  componentDidMount() {
    console.log(this.refs.firstAuth.className);
  }

  render() {
    return (
      <div className="container-fetch" >        
        <div>  
          <div ref="firstAuth" className = {(this.state.success1)? 'hideElement':'showElement'}>             
            <p>First password</p>
            <input ref="password1" name="password1" type="text"/>            
            <button onClick={this.firstAuthentication}>First verification</button>            
          </div>  
          
          <div ref="secondAuth" className = {(this.state.success1)? 'showElement' : 'hideElement'}>
            <p>{this.message1}</p> 
            <input ref="token1" name="token1" type="text"/>
            <p>Second password</p>
            <input ref="password2" name="password2" type="text"/>
            <button onClick={this.secondAuthentication}>Second verification</button>
          </div>

          <div ref="thirdAuth" className = {(this.state.success1 && this.state.success2)? 'showElement' : 'hideElement'}> 
            <p>{this.message2}</p> 
            <input ref="token2" name="token2" type="text"/>
            <p>Third password</p>
            <input ref="password3" name="password3" type="text"/>
            <button onClick={this.thirdAuthentication}>Third verification</button>
          </div>
            
          <div ref="fourthAuth" className = {(this.state.success1 && this.state.success2 && this.state.success3)? 'showElement' : 'hideElement'}>
            <p>{this.message3}</p>             
            <input ref="token3" name="token3" type="text"/>
            <p>Fourth password</p>
            <input ref="password4" name="password4" type="text"/>
            <button onClick={this.fourthAuthentication}>Fourth verification</button>            
          </div> 

          <div ref="secretData" className = {(this.state.success1 && this.state.success2 && this.state.success3 && this.state.success4)? 'showElement' : 'hideElement'}>
            <p>{this.message4}</p>
            <p style={{width:'300px'}}>{this.superSecretData}</p>
          </div> 
            
        </div>
      </div> 
    );
  }
}

export default App;
