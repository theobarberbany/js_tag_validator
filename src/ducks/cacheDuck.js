//Cache management duck.. *quack*
import fetch from "isomorphic-fetch";

//Action types
export const REQUEST_CACHE = "REQUEST_CACHE";
export const RECIEVE_CACHE = "RECIEVE_CACHE";

// Reducer Initial state for *this* component (Duck) (This only gets passed a
// slice of the state)
const initialState = {
  isFetching: false,
  didInvalidate: false,
  data: []
};

//Reducer
export function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CACHE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECIEVE_CACHE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        data: action.data,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}

// Action Creators
//1. Initiate loading of cache
export const requestCache = cacheURL => {
  return { type: REQUEST_CACHE, cacheURL };
};

//2. Recieve the cache once the async request returns
export const recieveCache = (cacheURL, json) => {
  return {
    type: RECIEVE_CACHE,
    cacheURL,
    data: json,
    receivedAt: Date.now()
  };
};

//3. Actually fetch the cache (thunk action)
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
