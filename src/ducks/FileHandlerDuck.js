// FileHandler.js duck *quack*
import { CardStatus } from "carbon-components-react";
import fetch from "isomorphic-fetch";

//Action types
export const DROP_FILE = "DROP_FILE";
export const TOGGLE_COMPLETE = "TOGGLE_COMPLETE";
export const PUSH_DATA = "PUSH_DATA";
export const PUSH_OVERVIEW = "PUSH_OVERVIEW";
export const ADD_BAD_TAG_PAIR = "ADD_BAD_TAG_PAIR";
export const TOGGLE_TAG_PAIR = "TOGGLE_TAG_PAIR";

// Reducer Initial state for *this* component (Duck) (This only gets passed a
// slice of the state)
const initialState = {
  displayProps: {
    cardTitle: "Get started",
    cardIcon: "copy",
    cardInfo: ["Drop manifest file here"],
    status: CardStatus.appStatus.NOT_RUNNING
  },
  cleanData: []
};

//Reducer
export function reducer(state = initialState, action) {
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
    case PUSH_OVERVIEW:
      return {
        ...state,
        tagOverview: action.data
      };
    case ADD_BAD_TAG_PAIR:
      return [
        ...state,
        {
          id: action.id,
          tag1: action.tag1,
          tag2: action.tag2,
          completed: false
        }
      ];
    case TOGGLE_TAG_PAIR:
      return state.map(
        tagpair =>
          tagpair.id === action.id
            ? { ...tagpair, completed: !tagpair.completed }
            : tagpair
      );
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

//4. Pushes tag composition (array) to store
export const pushOverview = data => {
  return { type: PUSH_OVERVIEW, data };
};

//5. Adds a bad tag pair to the store.
let nextTagPairId = 0;
export const addBadTagPair = (tag1, tag2) => {
  return {
    type: ADD_BAD_TAG_PAIR,
    id: nextTagPairId++,
    tag1: tag1,
    tag2: tag2
  };
};

//6. Toggle bad tag pairs complete
export const toggleTagPair = id => {
  return {
    type: TOGGLE_TAG_PAIR,
    id
  };
};
