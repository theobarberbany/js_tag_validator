// FileHandler.js duck *quack*
import { CardStatus } from "carbon-components-react";
import { addBadTagPair, addBadTagPairConcat } from "./warningDuck";
import "isomorphic-fetch";
import "form-data";

//Action types
export const DROP_FILE = "DROP_FILE";
export const PUSH_DATA = "PUSH_DATA";
export const PUSH_OVERVIEW = "PUSH_OVERVIEW";
export const PUSHED_TO_S3 = "PUSHED_TO_S3";

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
    case PUSHED_TO_S3:
      return {
        ...state,
        filePushedToS3: action.fileName
      };
    default:
      return state;
  }
}

// Action Creators
//1. Loads an object into store.
export const pushData = data => {
  return {
    type: PUSH_DATA,
    data
  };
};

//2. Changes FileHandler UI state when something is dropped on it
export const dropFile = fileHandlerState => {
  return {
    type: DROP_FILE,
    fileHandlerState
  };
};

//3. Pushes tag composition (array) to store
export const pushOverview = data => {
  return {
    type: PUSH_OVERVIEW,
    data
  };
};

//Async
//4. processOverview to update overview data in store and call processBadTags.
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

//5. Process bad tags: add them to the store.
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
          concatenated.bad_tag_pairs[i][2],
          concatenated.bad_tag_pairs[i][3],
          concatenated.bad_tag_pairs[i][4]
        )
      );
    }
  };
};
//6. Notify the app that you've pushed to S3
export const pushedToS3 = fileName => {
  return {
    type: PUSHED_TO_S3,
    fileName
  };
};
//7. Push dropped file to S3 Bucket
export const pushToS3 = (file, fileName) => {
  return dispatch => {
    return fetch("/api/S3Sign?objectName=" + fileName, {
      method: "GET"
    })
      .then(
        url => url.json(),
        error => console.log("Error generating signed URL", error)
      )
      .then(url =>
        fetch(url.signedUrl, {
          method: "PUT",
          body: file
        })
      )
      .then((response, error) => {
        if (response.status === 200) {
          dispatch(pushedToS3(fileName));
        } else if (error) {
          console.log("Error pushing to S3", error);
        }
      });
  };
};
