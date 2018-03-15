import React, { Component } from 'react';
import './App.css';
import ProgressBar from './progressbar/progressbar';
import {connect} from 'react-redux';
import {addCredentialCaptain, addCredentialGeneral, addCredentialPresident} from './state/actions';

class App extends Component {

  constructor(props) {
    super(props);   
    this.username="";
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
    this.username = this.refs.username.value; 
    let memorableA = this.refs.memorablea.value;

    fetch(`https://apimicrobach.azurewebsites.net/firststepsecurity`, { 
      method: "POST",  
      body: JSON.stringify({username:this.username, memorableA:memorableA}),     
      headers: {
        'Content-type':'application/json',
        'Custom-Auth-Step1' : password1       
      }
    })
    .then(response => {
      if (response.status >= 400) { 
        console.log(response.status); 
      }    
      return response.json();
    })
    .then(data => {     

      if(data.success) {  
        this.username = data.username;      
        this.refs.token1.value = data.token;
        this.message1 = data.message;
        this.secondRoute = data.secondRoute;
        this.progress=33.33333;
        this.setState({success1:true}); 
        
        let credential1 = { 
            name:'Captain America', 
            organization:'Avengers', 
            website:'avengers.com', 
            contactEmail:'captainamerica@gmail.com', 
            role:	['Captain'],
            token:data.token
        }   
        
        this.props.dispatch(addCredentialCaptain("Step1", credential1));
      }
      else {
        this.refs.token1.value = "";
        this.message1 = data.message;
        this.setState({success1:false});
      }
    }); 
  };
  

  secondAuthentication = () => {
    let password2 = this.refs.password2.value;
    let token1 = this.refs.token1.value;    
   
    fetch(`https://apimicrobach.azurewebsites.net/${this.secondRoute}`, { 
      method: "POST",   
      body: JSON.stringify({token1:token1, username:this.username}),   
      headers: {
        'Content-type':'application/json',
        'Custom-Auth-Step2' : password2        
      }
    })
    .then(response => {
      if (response.status >= 400) {        
        console.log(response.status);      
      }    
      return response.json();
    })
    .then(data => {     

      if(data.success) {  
        this.username = data.username;      
        this.refs.token2.value = data.token;
        this.message2 = data.message;
        this.thirdRoute = data.thirdRoute;
        this.refs.secondAuth.className = 'hideElement';
        this.progress=66.66666;
        this.setState({success2:true});   
        
        
        let credential2 = { 
          name:'General Shang', 
          organization:'Mulan', 
          website:'disney.com',
          contactEmail:'generalshang@gmail.com',
          role:['Captain','General'],
          token:data.token
      }   
      
      this.props.dispatch(addCredentialGeneral("Step2", credential2));
      }
      else {
        this.refs.token2.value = "";
        this.message2 = data.message;
        this.setState({success2:false});
      }

      //this.refs.resultpassword1.innerHTML = data;
    }); 
  };


  thirdAuthentication = () => {
    let password3 = this.refs.password3.value;
    let token2 = this.refs.token2.value;    
   
    fetch(`https://apimicrobach.azurewebsites.net/${this.thirdRoute}`, { 
      method: "POST",   
      body: JSON.stringify({token2:token2, username:this.username}),   
      headers: {
        'Content-type':'application/json',
        'Custom-Auth-Step3' : password3,        
      }
    })
    .then(response => {
      if (response.status >= 400) {        
        console.log(response.status);      
      }    
      return response.json();
    })
    .then(data => {

      if(data.success) {  
        this.username = data.username;      
        this.refs.token3.value = data.token;
        this.message3 = data.message;
        this.fourthRoute = data.fourthRoute;
        this.refs.thirdAuth.className = 'hideElement';
        this.progress=99.99999;
        this.setState({success3:true});  
        
        
        let credential3 = { 
          name:'The President of the United States', 
          organization:'USA', 
          website:'usa.com',
          contactEmail:'abrahamlincoln@gmail.com',
          role:['Captain','General','Commander in Chief'],
          token:data.token
      }   
      
      this.props.dispatch(addCredentialPresident("Step3", credential3));
      }
      else {
        this.refs.token3.value = "";
        this.message3 = data.message;
        this.setState({success3:false});
      }

      //this.refs.resultpassword1.innerHTML = data;
    }); 
  };


  fourthAuthentication = () => {
    let password4 = this.refs.password4.value;
    let token3 = this.refs.token3.value;    
   
    fetch(`https://apimicrobach.azurewebsites.net/${this.fourthRoute}`, { 
      method: "POST",   
      body: JSON.stringify({token3:token3, username:this.username}),   
      headers: {
        'Content-type':'application/json',
        'Custom-Auth-Step4' : password4       
      }
    })
    .then(response => {
      if (response.status >= 400) { 
        console.log(response.status);              
      }    
      return response.json();
    })
    .then(data => {  
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
  };

  componentWillUpdate(nextProps) {
    if(nextProps.credentials !== this.props.credentials) {
      console.log(nextProps.credentials);
    }
  }
 
  render() {    
    return (
      <div className = "auth-main-container">
      <div className="container-auth" >   
      <h1>4-Step Token Verification</h1>   
          <ProgressBar progress={this.progress}/>  
          
          <div ref="firstAuth" className = {(this.state.success1)? 'hideElement':'showElement auth-steps'}>             
           
            <div className = "auth-logo-flex">
              <div>
                <p>Username: <span>DM88</span></p>
                <input ref="username" name="username" type="text"/> 
                <p>Favourite season? <span>autumn</span></p>
                <input ref="memorablea" name="memorablea" type="password"/>
              </div>
              <div className = "auth-logo-case-study"></div>
            </div>
            <p>First password: <span>secret</span></p>
            <div className = "auth-button-flex">
              <input ref="password1" name="password1" type="password"/>     
              <p className = "auth-steps-message-failure">{this.message1}</p>         
              <button onClick={this.firstAuthentication}>Verify</button> 
            </div>
            <p className = "auth-steps-explanation">
              This 4-step-token verification requires the user to have a valid username, a memorable question,
              and four passwords. Username, answer to the memorable question and first password 
              will be checked by a Node.js API that will return a jwt token verifiable &nbsp;
              <a href="https://jwt.io/">HERE</a> required for the second 
              step of the verification. This token will be issued by the first fiduciary entity at the bottom of the scale 
              of trust called Captain America and will be available for 2 minutes only. The valid username will also be sent back
              and will be checked in the second step of the verification as well.</p>

                    
          </div>  
          
          <div ref="secondAuth" className = {(this.state.success1)? 'showElement auth-steps' : 'hideElement'}>
            <div className = "auth-message-logo-flex">
              <p className = "auth-steps-message-success">{this.message1}</p> 
              <div className ="auth-captain-logo auth-entity-logo"></div>
            </div>
            
            <p>First token</p>
            <textarea ref="token1" name="token1" type="text"/>
            <p>Second password: <span>hidden</span></p>
            <div className = "auth-button-flex">
              <input ref="password2" name="password2" type="password"/>
              <p className = "auth-steps-message-failure">{this.message2}</p>
              <button onClick={this.secondAuthentication}>Verify</button>
            </div>
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
            
          </div>

          <div ref="thirdAuth" className = {(this.state.success1 && this.state.success2)? 'showElement auth-steps' : 'hideElement'}> 
          <div className = "auth-message-logo-flex">
            <p className = "auth-steps-message-success">{this.message2}</p> 
            <div className ="auth-general-logo auth-entity-logo"></div>
            </div>
            <p>Second token</p>
            <textarea ref="token2" name="token2" type="text"/>
            <p>Third password: <span>concealed</span></p>
            <div className = "auth-button-flex">
              <input ref="password3" name="password3" type="password"/>
              <p className = "auth-steps-message-failure">{this.message3}</p>
              <button onClick={this.thirdAuthentication}>Verify</button>
            </div>
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
              President of the United States of America, will emit a third token for the fourth and final verification.
            </p>
             
          </div>
            
          <div ref="fourthAuth" className = {(this.state.success1 && this.state.success2 && this.state.success3)? 'showElement auth-steps' : 'hideElement'}>
            
            
            <div className = "auth-message-logo-flex">
            <p className = "auth-steps-message-success">{this.message3}</p> 
            <div className ="auth-president-logo auth-entity-logo"></div>
            </div>


            <p>Third token</p>           
            <textarea ref="token3" name="token3" type="text"/>
            <p>Fourth password: <span>inaccessible</span></p>
            <div className = "auth-button-flex">
              <input ref="password4" name="password4" type="password"/>
              <p className = "auth-steps-message-failure">{this.message4}</p> 
              <button onClick={this.fourthAuthentication}>Verify</button>  
            </div>
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
            The President of the USA has issued a third and final token for the fourth verification. 
            By submitting the credentials, the President will check the third token and if it is valid and 
            the password coincides, access to the secret data will be granted.
            </p>             
                      
          </div> 

          <div ref="secretData" className = {(this.state.success1 && this.state.success2 && this.state.success3 && this.state.success4)? 'showElement auth-steps' : 'hideElement'}>
            
            <p className = "auth-steps-message-success">{this.message4}</p>
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

const mapStateToProps = (state) => {
  return {credentials:state.credentials};  
}

export default connect(mapStateToProps)(App);
