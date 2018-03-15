import {combineReducers} from "redux";


/* const credentials = (state = {}, action) => {	
	let newState = {};	
	switch (action.type) {				
		case "ADD-CREDENTIAL-CAPTAIN" :
		newState = {...state};	
		Object.defineProperty(newState, action.stepName, {value:action.entityCredentials, writable:true});
		return newState;

		case "ADD-CREDENTIAL-GENERAL" :
		newState = {...state, Step1:{...state.Step1}};	
		Object.defineProperty(newState, action.stepName, {value:action.entityCredentials, writable:true});	
		return newState;

		case "ADD-CREDENTIAL-PRESIDENT" :
		newState = {...state, Step1:{...state.Step1}, Step2: {...state.Step2}};	
		Object.defineProperty(newState, action.stepName, {value:action.entityCredentials, writable:true});	
		return newState;

		default:
		return state;
	}
};
 */

const credentials = (state ={}, action) => {
	const newState = {Claims:state.Claims};
	switch (action.type) {
		case "ADD-CREDENTIAL" : 
		Object.defineProperty(newState.Claims, action.stepName, {value:action.entityCredentials});
		return newState;
		default :
		return state;
	}
}

const counter = (state = 0, action) => {
	switch (action.type) {
		case "INCREMENT" : 
			return state + action.amount;
		case "DECREMENT" :
			return state - action.amount;
		default:
			return state;
	}
};

const theme = (state = "", action) => {
	switch (action.type) {
		case "LIGHT" : 
			return "light";
		case "DARK" :
			return "dark";
		default:
			return state;
	}
}



/* const counter = (state = 0, action) => {  
	switch (action.type) {
	case "INCREMENT":
		return state + action.howMuch;
	case "DECREMENT":
		return state - action.howLess;
	default:
		return state;
	}
};

const changer = (state = {}, action) => {  
 
	switch (action.type) {
	case "WRITE":  
		return action.newItem;   
	case "ERASE": 
		break;     
	default:
		return state;
	}
};

const pageVisited = (state = {}, action) => {  
	//const newState = [...state]; // Es6 array cloning
	switch (action.type) {
	case "ACQUIRE":	
		//newState.push(action.newItem);
		return action.newItem;   
	case "ERASE": 
		break;   
		//let index = newState.indexOf(action.itemToRemove);      
		//if (index > -1) { newState.splice(index, 1); return newState} else return state;
	default:
		return state;
	}
}; */

const reducers = combineReducers({
	credentials : credentials,
	counter:counter,
	theme:theme
});

export default reducers