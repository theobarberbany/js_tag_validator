import { combineReducers } from "redux";

//Action Types
export const ADD_BAD_TAG_PAIR = "ADD_BAD_TAG_PAIR";
export const ADD_BAD_TAG_PAIR_CONCAT = "ADD_BAD_TAG_PAIR_CONCAT";
export const TOGGLE_TAG_PAIR = "TOGGLE_TAG_PAIR";
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

//Other constants
export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

export const { SHOW_ALL } = VisibilityFilters;

//Reducers
export const initialWarningState = {
  badParis: [],
  badParisConcat: []
};

export function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

export function warningItems(state = initialWarningState, action) {
  switch (action.type) {
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
            pos: action.pos,
            completed: false
          }
        ]
      };
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

export const reducer = combineReducers({
  visibilityFilter,
  warningItems
});

//Action Creators
//1. Adds a bad tag pair to the store.
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

//2. Add bad tag pairs where tags are concatenations
export const addBadTagPairConcat = (tag1, tag2, diff, pos1, pos2) => {
  return {
    type: ADD_BAD_TAG_PAIR_CONCAT,
    id: nextTagPairId++,
    tag1: tag1,
    tag2: tag2,
    diff: diff,
    pos: pos1 + " : " + pos2
  };
};
//3. Toggle bad tag pairs complete
export const toggleTagPair = id => {
  return {
    type: TOGGLE_TAG_PAIR,
    id
  };
};

//4. Set visibility filter
export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}
