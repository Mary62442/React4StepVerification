import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProgressBar from './progressbar/progressbar';

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
    this.progress=0;
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
        this.progress=25;
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
        this.progress=50;
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
        this.progress=75;
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
        this.progress=100;
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
    console.log(this.progress)
    return (
      <div className = "auth-main-container">
      <div className="container-auth" >   
      <h1>4-Step Token Verification</h1>   
          <ProgressBar progress={this.progress}/>  
          
          <div ref="firstAuth" className = {(this.state.success1)? 'hideElement':'showElement auth-steps'}>             
            <p className = "auth-steps-explanation">Four passwords are required for this 4-step token verification. 
              The first password will be checked by a Node.js API that will return a jsonwebtoken required for the second 
              step of the verification. This token will be issued by the first fiduciary entity at the bottom of the scale 
              of trust called Captain America and will be available for 2 minutes only.</p>
            <p>First password: <span>'secret'</span></p>
            <div className = "auth-button-flex">
            <input ref="password1" name="password1" type="password"/>          
            <button onClick={this.firstAuthentication}>First verification</button> 
            </div>
            <p className = "auth-steps-message">{this.message1}</p>            
          </div>  
          
          <div ref="secondAuth" className = {(this.state.success1)? 'showElement auth-steps' : 'hideElement'}>
            <p className = "auth-steps-message">{this.message1}</p> 
            <p className = "auth-steps-explanation">The first token has been provided by the first fiduciary entity:</p>
            <pre><code>
{`signInEntityCaptain : { 
  name:'Captain America', 
  organization:'Avengers', 
  website:'avengers.com', 
  contactEmail:'captainamerica@gmail.com', 
  role:	['Captain'];
}`}
            </code></pre>
            <p className = "auth-steps-explanation">The second password is now needed to access
              the third stage of the verification. Upon submitting the credentials the token will be verified in 
              another Node.js API by Captain America and if both the token and the password are valid, a new entity 
              called General Shang will provide a second token with 2 minutes expiration time required in the third verification.
            </p>
            <p>First token</p>
            <textarea ref="token1" name="token1" type="text"/>
            <p>Second password: <span>'hidden'</span></p>
            <div className = "auth-button-flex">
            <input ref="password2" name="password2" type="password"/>
            <button onClick={this.secondAuthentication}>Second verification</button>
            </div>
            <p className = "auth-steps-message">{this.message2}</p>
          </div>

          <div ref="thirdAuth" className = {(this.state.success1 && this.state.success2)? 'showElement auth-steps' : 'hideElement'}> 
            <p className = "auth-steps-message">{this.message2}</p> 
            <p className = "auth-steps-explanation">The second token has been provided by the second fiduciary entity:</p>
            <pre><code>
{`signInEntityGeneral : {
  name:'General Shang', 
  organization:'Mulan', 
  website:'disney.com',
  contactEmail:'generalshang@gmail.com',
  role:['Captain','General']
}`}
            </code></pre>
            <p className = "auth-steps-explanation">By sending the second token and the third password 
              to a third Node.js API which will verify the validity of the General's token, a third entity, the 
              Commander in chief President of the USA, will emit a third token for the fourth and final verification.
            </p>
            <p>Second token</p>
            <textarea ref="token2" name="token2" type="text"/>
            <p>Third password: <span>'concealed'</span></p>
            <div className = "auth-button-flex">
            <input ref="password3" name="password3" type="password"/>
            <button onClick={this.thirdAuthentication}>Third verification</button>
            </div>
            <p className = "auth-steps-message">{this.message3}</p> 
          </div>
            
          <div ref="fourthAuth" className = {(this.state.success1 && this.state.success2 && this.state.success3)? 'showElement auth-steps' : 'hideElement'}>
            <p className = "auth-steps-message">{this.message3}</p> 
            <p className = "auth-steps-explanation">The second token has been provided by the second fiduciary entity:</p>
            <pre><code>
{`signInEntityCommander : {
  name:'The President of the United States', 
  organization:'USA', 
  website:'usa.com',
  contactEmail:'abrahamlincoln@gmail.com',
  role:['Captain','General','Commander in Chief']
}`}
            </code></pre>
            <p className = "auth-steps-explanation">The token was verified by General Shang and the third password was correct. 
            Commander in chief President of the USA has issued a third and final token for the fourth verification. 
            By submitting the credentials, the Commander in chief will check the third token and if it is valid and 
            the password coincides, access to the secret data will be granted.
            </p>             
            <p>Third token</p>           
            <textarea ref="token3" name="token3" type="text"/>
            <p>Fourth password: <span>'inaccessible'</span></p>
            <div className = "auth-button-flex">
            <input ref="password4" name="password4" type="password"/>
            <button onClick={this.fourthAuthentication}>Fourth verification</button>  
            </div>
            <p className = "auth-steps-message">{this.message4}</p>           
          </div> 

          <div ref="secretData" className = {(this.state.success1 && this.state.success2 && this.state.success3 && this.state.success4)? 'showElement auth-steps' : 'hideElement'}>
            
            <p className = "auth-steps-message">{this.message4}</p>
            <p className = "auth-steps-explanation">The fourth password and the third token have been verified by the Commander in chief and were valid.
              The verification is now complete.
            </p>
            <p>{this.superSecretData}</p>
          </div> 
            
          </div>
      </div> 
    );
  }
}

export default App;
