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
    applyMiddleware(thunk, createRavenMiddleware(Raven))
  );
}

//Initialise the global store.
const store = configureStore();
// Export store
export default store;
