// Set up the global redux store Configure all in one file for simplicity

import { createStore, applyMiddleware } from "redux";
import Raven from "raven-js";
import createRavenMiddleware from "raven-for-redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

//Enable redux devtools, and apply middlewear.
export function configureStore() {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
      thunk,
      createRavenMiddleware(
        //modify state so cache isn't sent
        Raven,
        {
          stateTransformer: state => {
            let copy = { ...state }; //return a copy of the state - so it does not get modified.
            delete copy["cache"];
            return copy;
          }
        }
      )
    )
  );
}

//Initialise the global store.
const store = configureStore();
// Export store
export default store;
