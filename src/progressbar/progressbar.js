import React, { Component } from 'react';
import './styles.css';
import {connect} from 'react-redux';
import classNames from 'classnames';


class ProgressBar extends Component {

  render() {      

    let progressClasses = classNames({
        "progress-bar-container-dark":this.props.theme === "dark",
        "progress-bar-container-light":this.props.theme === "light"
    })
    return (   
        
        <div className={progressClasses}>
            <div className="progress-container">
                <div style={{width:`${this.props.progress}%`, backgroundColor:`hsl(${this.props.progress},100%,50%)`} } className={this.progress===100?"auth-progress auth-progress-end":"auth-progress"}>                    
                </div>
                <p><i className = {this.props.progress >= 33.33333? 'i-checked':''}></i></p>
                <p><i className = {this.props.progress >= 66.66666? 'i-checked':''}></i></p>
                <p><i className = {this.props.progress >= 99.99999? 'i-checked':''}></i></p>
                <p><i className = {this.props.progress >= 100? 'i-checked':''}></i></p>
                
            </div>
            <div className = {this.props.progress === 100? "auth-lock-container auth-lock-container-opening": "auth-lock-container"}>
                <div className = {this.props.progress === 100? "auth-lock auth-lock-opening": "auth-lock"}></div>
            </div>
        </div>


        
    );
  }
}


const mapStateToProps = (state) => {
    return {theme:state.theme};  
  }
  
export default connect(mapStateToProps)(ProgressBar);

