// Root reducer ties everything together here
import { combineReducers } from 'redux';
import reducer from './ducks/FileHandlerDuck';

/* 
the syntax is <key in store>:<reducer name> 
this means the object in connect must return
an object that maps whatever props to;
state.<key in store>.<whateverprop>
*/
const rootReducer = combineReducers({
    fileHandler:reducer
});
export default rootReducer;