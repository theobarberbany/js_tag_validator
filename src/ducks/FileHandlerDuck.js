// FileHandler.js duck *quack*
import { CardStatus } from "carbon-components-react";
import fetch from "isomorphic-fetch";

//Action types
export const DROP_FILE = "DROP_FILE";
export const TOGGLE_COMPLETE = "TOGGLE_COMPLETE";
export const PUSH_DATA = "PUSH_DATA";
export const REQUEST_CACHE = "REQUEST_CACHE";
export const RECIEVE_CACHE = "RECIEVE_CACHE";

// Reducer Initial state for *this* component (Duck) (This only gets passed a
// slice of the state)
const initialState = {
  displayProps: {
    cardTitle: "Get started",
    cardIcon: "copy",
    cardInfo: ["Drop manifest file here"],
    status: CardStatus.appStatus.NOT_RUNNING
  },
  cleanData: [],
  cache: {
    isFetching: false,
    didInvalidate: false,
    data: []
  }
};

//Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DROP_FILE:
      return {
        ...state,
        displayProps: {
          cardTitle: "Crunching Numbers",
          cardIcon: "copy",
          cardInfo: ["Won't be a minute"],
          status: CardStatus.appStatus.RUNNING
        }
      };

    case PUSH_DATA:
      return {
        ...state,
        cleanData: action.data
      };

    case REQUEST_CACHE:
      return {
        ...state,
        cache: {
          isFetching: true,
          didInvalidate: false
        }
      };
    case RECIEVE_CACHE:
      return {
        ...state,
        cache: {
          isFetching: false,
          didInvalidate: false,
          data: action.data,
          lastUpdated: action.receivedAt
        }
      };
    default:
      return state;
  }
}

// Action Creators
//1. Loads an object into store.
export const pushData = data => {
  return { type: PUSH_DATA, data };
};
// 2. Toggles a critical warning's complete / incomplete feild (notes it as
// addressed)
export const toggleComplete = id => {
  return { type: TOGGLE_COMPLETE, id };
};

//3. Changes FileHandler UI state when something is dropped on it
export const dropFile = fileHandlerState => {
  return { type: DROP_FILE, fileHandlerState };
};

//4. Initiate loading of cache
export const requestCache = cacheURL => {
  return { type: REQUEST_CACHE, cacheURL };
};

//5. Recieve the cache once the async request returns
export const recieveCache = (cacheURL, json) => {
  return {
    type: RECIEVE_CACHE,
    cacheURL,
    data: json,
    receivedAt: Date.now()
  };
};

//6. Actually fetch the cache (thunk action)
export const fetchCache = cacheURL => {
  return function(dispatch) {
    //Inform app async call is starting
    dispatch(requestCache(cacheURL));
    return fetch(cacheURL)
      .then(
        response => response.json(),
        error => console.log("An error occured.", error)
      )
      .then(json => dispatch(recieveCache(cacheURL, json)));
  };
};
