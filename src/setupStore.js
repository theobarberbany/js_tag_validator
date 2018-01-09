// Set up the global redux store Configure all in one file for simplicity

import { createStore, applyMiddleware } from "redux";
import Raven from "raven-js";
import createRavenMiddleware from "raven-for-redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
eimport { GoogleAnalytics } from "redux-beacon/targets/google-analytics"; //Redux Beacon target
import { createMiddleware } from "redux-beacon";

//Analytics set up
//

// Define an event
const pageView = action => ({
  hitType: "pageview",
  page: action.payload
});

// Map the event to a Redux action
const eventsMap = {
  LOCATION_CHANGE: pageView
};

// Create the analytics middleware
const analytics = createMiddleware(eventsMap, GoogleAnalytics);


//Configure Store.
export function configureStore() {
  return createStore(
    rootReducer, // Import root reducer from rootReducer.js
    window.__REDUX_DEVTOOLS_EXTENSION__ && // Enable redux-devtools
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
      thunk, // Apply Redux thunk
      analytics, //Apply Redux Beacon analytics
      createRavenMiddleware(
        // Redux + Sentry Config
        //modify state so cache isn't sent as state, or an action. (Don't undo!)
        Raven,
        {
          stateTransformer: state => {
            let copy = { ...state }; //return a copy of the state - so it does not get modified.
            delete copy["cache"];
            return copy;
          },

          actionTransformer: action => {
            let copy = { ...action };
            if (copy.type === "RECIEVE_CACHE") {
              delete copy["data"];
            }
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
