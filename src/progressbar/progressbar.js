import React, { Component } from 'react';
import './styles.css';

class ProgressBar extends Component {

  constructor(props) {
    super(props);   
    
    
  }

  render() {
      console.log(this.props.progress);
    return (   
        
        <div className="progress-bar-container">
            <div className="progress-container">
                <div style={{width:`${this.props.progress}%`, backgroundColor:`hsl(${this.props.progress},100%,45%)`} } className="auth-progress">                    
                </div>
                <p><i className = {this.props.progress >= 25? 'i-checked':''}></i></p>
                <p><i className = {this.props.progress >= 50? 'i-checked':''}></i></p>
                <p><i className = {this.props.progress >= 75? 'i-checked':''}></i></p>
                <p><i className = {this.props.progress >= 100? 'i-checked':''}></i></p>
                <p><i className = {this.props.progress >= 100? 'i-checked':''}></i></p>
            </div>
            <div className = {this.props.progress === 100? "auth-lock-container auth-lock-container-opening": "auth-lock-container"}>
                <div className = {this.props.progress === 100? "auth-lock auth-lock-opening": "auth-lock"}></div>
            </div>
        </div>


        
    );
  }
}

export default ProgressBar;
