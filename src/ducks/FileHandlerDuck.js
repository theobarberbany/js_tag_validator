// FileHandler.js duck *quack*
import { CardStatus } from "carbon-components-react";

//Action types
export const DROP_FILE = "DROP_FILE";
export const PUSH_DATA = "PUSH_DATA";
export const PUSH_OVERVIEW = "PUSH_OVERVIEW";
export const ADD_BAD_TAG_PAIR = "ADD_BAD_TAG_PAIR";
export const ADD_BAD_TAG_PAIR_CONCAT = "ADD_BAD_TAG_PAIR_CONCAT";
export const TOGGLE_TAG_PAIR = "TOGGLE_TAG_PAIR";

// Reducer Initial state for *this* component (Duck) (This only gets passed a
// slice of the state)
export const initialState = {
  displayProps: {
    cardTitle: "Get started",
    cardIcon: "copy",
    cardInfo: ["Drop manifest file here"],
    status: CardStatus.appStatus.NOT_RUNNING
  },
  cleanData: [],
  badPairs: [],
  badPairsConcat: [],
  overview: {
    composition: [],
    bad_tag_total: 0
  }
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
        overview: action.data
      };
    case ADD_BAD_TAG_PAIR:
      return {
        ...state,
        badPairs: [
          ...state.badPairs,
          {
            id: action.id,
            tag1: action.tag1,
            tag2: action.tag2,
            diff: action.diff,
            pos: action.pos,
            completed: false
          }
        ]
      };
    case ADD_BAD_TAG_PAIR_CONCAT:
      return {
        ...state,
        badPairsConcat: [
          ...state.badPairsConcat,
          {
            id: action.id,
            tag1: action.tag1,
            tag2: action.tag2,
            diff: action.diff,
            completed: false
          }
        ]
      };
    //todo; fix
    case TOGGLE_TAG_PAIR:
      return {
        ...state,
        badPairs: state.badPairs.map(
          tagPair =>
            tagPair.id === action.id
              ? { ...tagPair, completed: !tagPair.completed }
              : tagPair
        ),
        badPairsConcat: state.badPairsConcat.map(
          tagPair =>
            tagPair.id === action.id
              ? { ...tagPair, completed: !tagPair.completed }
              : tagPair
        )
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

//2. Changes FileHandler UI state when something is dropped on it
export const dropFile = fileHandlerState => {
  return { type: DROP_FILE, fileHandlerState };
};

//3. Pushes tag composition (array) to store
export const pushOverview = data => {
  return { type: PUSH_OVERVIEW, data };
};

//4. Adds a bad tag pair to the store.
let nextTagPairId = 0;
export const addBadTagPair = (tag1, tag2, diff, pos) => {
  return {
    type: ADD_BAD_TAG_PAIR,
    id: nextTagPairId++,
    tag1: tag1,
    tag2: tag2,
    diff: diff,
    pos: pos
  };
};

//5. Add bad tag pairs where tags are concatenations
export const addBadTagPairConcat = (tag1, tag2, diff) => {
  return {
    type: ADD_BAD_TAG_PAIR_CONCAT,
    id: nextTagPairId++,
    tag1: tag1,
    tag2: tag2,
    diff: diff
  };
};
//6. Toggle bad tag pairs complete
export const toggleTagPair = id => {
  return {
    type: TOGGLE_TAG_PAIR,
    id
  };
};

//7. processOverview to update overview data in store and call processBadTags.
export const processOverview = object => {
  //console.log(object);
  //Aliasing
  let normal = object.bad_tag_container.normal;
  let concatenated = object.bad_tag_container.concatenated;
  //Get the total number of bad tags
  let bad_tag_total = normal.bad_tag_count + concatenated.bad_tag_count;
  object.composition.bad_tag_total = bad_tag_total;
  return function(dispatch) {
    dispatch(pushOverview(object.composition));
    dispatch(processBadTags(object));
  };
};

//8. Process bad tags: add them to the store.
export const processBadTags = object => {
  //Aliasing
  let normal = object.bad_tag_container.normal;
  let concatenated = object.bad_tag_container.concatenated;
  return function(dispatch) {
    for (let i = 0; i < normal.bad_tag_count; i++) {
      dispatch(
        addBadTagPair(
          normal.bad_tag_pairs[i][0],
          normal.bad_tag_pairs[i][1],
          normal.bad_tag_pairs[i][2],
          normal.bad_tag_pairs[i][3]
        )
      );
    }
    for (let i = 0; i < concatenated.bad_tag_count; i++) {
      dispatch(
        addBadTagPairConcat(
          concatenated.bad_tag_pairs[i][0],
          concatenated.bad_tag_pairs[i][1],
          concatenated.bad_tag_pairs[i][2]
        )
      );
    }
  };
};
