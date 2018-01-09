// Root reducer returns a single reducer from each Duck.
import { combineReducers } from "redux";
import { reducer as fileHandler } from "./ducks/FileHandlerDuck";
import { reducer as cache } from "./ducks/cacheDuck";
import { reducer as warningContainer } from "./ducks/warningDuck";
/*
the syntax is <key in store>:<reducer name>
this means the object in connect must return
an object that maps whatever props to;
state.<key in store>.<whateverprop>
*/
const rootReducer = combineReducers({
  fileHandler: fileHandler,
  warningContainer: warningContainer,
  cache: cache
});
export default rootReducer;
