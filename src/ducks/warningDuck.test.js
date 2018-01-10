import { reducer } from "./warningDuck";
import * as duck from "./warningDuck";
import { EventTypes } from "redux-segment";

describe("Warning actions", () => {
  it("should create an action to toggle a tag pair completed", () => {
    const id = 1;
    const expectedAction = {
      type: duck.TOGGLE_TAG_PAIR,
      id
    };
    expect(duck.toggleTagPair(id)).toEqual(expectedAction);
  });
  it("Should create an action to add a new bad tag pair to the store", () => {
    let nextTagPairId = 0;
    const tag1 = "GGAGCTAC";
    const tag2 = "TCGACTAG";
    const diff = 2;
    const pos = 1;
    const expectedAction = {
      type: duck.ADD_BAD_TAG_PAIR,
      id: nextTagPairId++,
      tag1,
      tag2,
      diff,
      pos,
      meta: {
        analytics: {
          eventType: EventTypes.track,
          eventPayload: {
            event: duck.ADD_BAD_TAG_PAIR,
            properties: {
              tag1,
              tag2,
              diff,
              pos
            }
          }
        }
      }
    };
    expect(duck.addBadTagPair(tag1, tag2, diff, pos)).toEqual(expectedAction);
  });
  it("Should create an action to add a new concatenated bad tag pair to the store", () => {
    let nextTagPairId = 1;
    const tag1 = "GGAGCTAC";
    const tag2 = "TCGACTAG";
    const diff = 2;
    const pos1 = 22;
    const pos2 = 56;
    const expectedAction = {
      type: duck.ADD_BAD_TAG_PAIR_CONCAT,
      id: nextTagPairId++,
      tag1,
      tag2,
      diff,
      pos: "22 : 56",
      meta: {
        analytics: {
          eventType: EventTypes.track,
          eventPayload: {
            event: duck.ADD_BAD_TAG_PAIR_CONCAT,
            properties: {
              tag1,
              tag2,
              diff,
              pos: pos1 + ":" + pos2
            }
          }
        }
      }
    };
    expect(duck.addBadTagPairConcat(tag1, tag2, diff, pos1, pos2)).toEqual(
      expectedAction
    );
  });
});

describe("Warning reducer", () => {
  const initialState = {
    visibilityFilter: "SHOW_ACTIVE",
    warningItems: duck.initialWarningState
  };
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it("should handle ADD_BAD_TAG_PAIR", () => {
    expect(
      reducer(undefined, {
        type: duck.ADD_BAD_TAG_PAIR,
        id: 0,
        tag1: "ATCG",
        tag2: "ATCG",
        diff: 0,
        pos: 11
      })
    ).toEqual({
      ...initialState,
      warningItems: {
        ...initialState.warningItems,
        badPairs: [
          ...initialState.warningItems.badPairs,
          {
            id: 0,
            tag1: "ATCG",
            tag2: "ATCG",
            diff: 0,
            pos: 11,
            completed: false
          }
        ]
      }
    });
  });
  it("should handle ADD_BAD_TAG_PAIR_CONCAT", () => {
    expect(
      reducer(undefined, {
        type: duck.ADD_BAD_TAG_PAIR_CONCAT,
        id: 1,
        tag1: "ATCGATCG",
        tag2: "ATCGATCG",
        diff: 0
      })
    ).toEqual({
      ...initialState,
      warningItems: {
        ...initialState.warningItems,

        badPairsConcat: [
          ...initialState.warningItems.badPairsConcat,
          {
            id: 1,
            tag1: "ATCGATCG",
            tag2: "ATCGATCG",
            diff: 0,
            completed: false
          }
        ]
      }
    });
  });
  it("should handle TOGGLE_TAG_PAIR with a normal tag", () => {
    const state = {
      ...initialState,
      warningItems: {
        ...initialState.warningItems,

        badPairs: [
          {
            id: 0,
            tag1: "ATCG",
            tag2: "ATCG",
            diff: 0,
            pos: 11,
            completed: false
          }
        ],
        badPairsConcat: [
          {
            id: 1,
            tag1: "ATCGATCG",
            tag2: "ATCGATCG",
            diff: 0,
            completed: false
          }
        ]
      }
    };
    expect(
      reducer(state, {
        type: duck.TOGGLE_TAG_PAIR,
        id: 0
      })
    ).toEqual({
      ...initialState,
      warningItems: {
        ...initialState.warningItems,
        badPairs: [
          {
            id: 0,
            tag1: "ATCG",
            tag2: "ATCG",
            diff: 0,
            pos: 11,
            completed: true
          }
        ],
        badPairsConcat: [
          {
            completed: false,
            diff: 0,
            id: 1,
            tag1: "ATCGATCG",
            tag2: "ATCGATCG"
          }
        ]
      }
    });
  });
  it("should handle ADD_BAD_TAG_PAIR_CONCAT", () => {
    expect(
      reducer(undefined, {
        type: duck.ADD_BAD_TAG_PAIR_CONCAT,
        id: 1,
        tag1: "ATCGATCG",
        tag2: "ATCGATCG",
        diff: 0
      })
    ).toEqual({
      ...initialState,
      warningItems: {
        ...initialState.warningItems,

        badPairsConcat: [
          ...initialState.warningItems.badPairsConcat,
          {
            id: 1,
            tag1: "ATCGATCG",
            tag2: "ATCGATCG",
            diff: 0,
            completed: false
          }
        ]
      }
    });
  });
  it("should handle TOGGLE_TAG_PAIR with a concatenated tag", () => {
    const state = {
      ...initialState,
      warningItems: {
        ...initialState.warningItems,

        badPairs: [
          {
            id: 0,
            tag1: "ATCG",
            tag2: "ATCG",
            diff: 0,
            pos: 11,
            completed: false
          }
        ],
        badPairsConcat: [
          {
            id: 1,
            tag1: "ATCGATCG",
            tag2: "ATCGATCG",
            diff: 0,
            completed: false
          }
        ]
      }
    };
    expect(
      reducer(state, {
        type: duck.TOGGLE_TAG_PAIR,
        id: 1
      })
    ).toEqual({
      ...initialState,
      warningItems: {
        ...initialState.warningItems,
        badPairs: [
          {
            id: 0,
            tag1: "ATCG",
            tag2: "ATCG",
            diff: 0,
            pos: 11,
            completed: false
          }
        ],
        badPairsConcat: [
          {
            completed: true,
            diff: 0,
            id: 1,
            tag1: "ATCGATCG",
            tag2: "ATCGATCG"
          }
        ]
      }
    });
  });
});
