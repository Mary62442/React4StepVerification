import {createStore,applyMiddleware, compose}   from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
//import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";


export default createStore(
	reducers,
	{
		credentials : {},
		counter: 0,
		theme:"light"
	},
	compose(applyMiddleware(thunk)));