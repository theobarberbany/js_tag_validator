import { reducer } from "./FileHandlerDuck";
import * as duck from "./FileHandlerDuck";
import { CardStatus } from "carbon-components-react";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const data = { somejson: "somedata" }; // some dummy data

describe("File Handler actions", () => {
  it("should create an action to load an object into the store", () => {
    const expectedAction = {
      type: duck.PUSH_DATA,
      data
    };
    expect(duck.pushData(data)).toEqual(expectedAction);
  });
  it("should create an action to toggle a tag pair completed", () => {
    const id = 1;
    const expectedAction = {
      type: duck.TOGGLE_TAG_PAIR,
      id
    };
    expect(duck.toggleTagPair(id)).toEqual(expectedAction);
  });
  it("should create an action to change ui state when a file is dropped", () => {
    const fileHandlerState = {
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
    const expectedAction = {
      type: duck.DROP_FILE,
      fileHandlerState
    };
    expect(duck.dropFile(fileHandlerState)).toEqual(expectedAction);
  });
  it("should create an action to push an overview array to the store", () => {
    const data = [1, 2, 3, 4];
    const expectedAction = {
      type: duck.PUSH_OVERVIEW,
      data
    };
    expect(duck.pushOverview(data)).toEqual(expectedAction);
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
      pos
    };
    expect(duck.addBadTagPair(tag1, tag2, diff, pos)).toEqual(expectedAction);
  });
  it("Should create an action to add a new concatenated bad tag pair to the store", () => {
    let nextTagPairId = 1;
    const tag1 = "GGAGCTAC";
    const tag2 = "TCGACTAG";
    const diff = 2;
    const expectedAction = {
      type: duck.ADD_BAD_TAG_PAIR_CONCAT,
      id: nextTagPairId++,
      tag1,
      tag2,
      diff
    };
    expect(duck.addBadTagPairConcat(tag1, tag2, diff)).toEqual(expectedAction);
  });
});

describe("File Handler async actions", () => {
  it("should dispatch pushOverview with the overview data, and then dispatch processBadTags", async () => {
    const expectedActions = [
      {
        type: duck.PUSH_OVERVIEW,
        data: { bad_tag_total: 2, composition: [[1, 2, 3, 4], [1, 2, 3, 4]] }
      },
      {
        type: duck.ADD_BAD_TAG_PAIR,
        id: 2,
        tag1: "CCGTAGTA",
        tag2: "CCGTAAGA",
        diff: 2,
        pos: 47
      },
      {
        type: duck.ADD_BAD_TAG_PAIR_CONCAT,
        id: 3,
        tag1: "GCGTAGTAGCGTAGTA",
        tag2: "GCGTAGTAGCGTAGTA",
        diff: 0
      }
    ];
    const object = {
      bad_tag_container: {
        normal: {
          bad_tag_count: 1,
          bad_tag_pairs: [["CCGTAGTA", "CCGTAAGA", 2, 47]]
        },
        concatenated: {
          bad_tag_count: 1,
          bad_tag_pairs: [["GCGTAGTAGCGTAGTA", "GCGTAGTAGCGTAGTA", 0, 56]]
        }
      },
      composition: {
        bad_tag_total: 1,
        composition: [[1, 2, 3, 4], [1, 2, 3, 4]]
      }
    };
    const store = mockStore(duck.initialState);
    await store.dispatch(duck.processOverview(object));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe("File Handler reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(duck.initialState);
  });
  it("should change the UI when DROP_FILE is handled", () => {
    expect(reducer(undefined, { type: duck.DROP_FILE }).displayProps).toEqual({
      cardTitle: "Crunching Numbers",
      cardIcon: "copy",
      cardInfo: ["Won't be a minute"],
      status: 0
    });
  });
  it("should handle PUSH_DATA", () => {
    expect(
      reducer(undefined, {
        type: duck.PUSH_DATA,
        data
      })
    ).toEqual({
      ...duck.initialState,
      cleanData: data
    });
  });
  it("should handle PUSH_OVERVIEW", () => {
    expect(
      reducer(undefined, {
        type: duck.PUSH_OVERVIEW,
        data
      })
    ).toEqual({
      ...duck.initialState,
      overview: data
    });
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
      ...duck.initialState,
      badPairs: [
        ...duck.initialState.badPairs,
        {
          id: 0,
          tag1: "ATCG",
          tag2: "ATCG",
          diff: 0,
          pos: 11,
          completed: false
        }
      ]
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
      ...duck.initialState,
      badPairsConcat: [
        ...duck.initialState.badPairsConcat,
        {
          id: 1,
          tag1: "ATCGATCG",
          tag2: "ATCGATCG",
          diff: 0,
          completed: false
        }
      ]
    });
  });
  it("should handle TOGGLE_TAG_PAIR with a normal tag", () => {
    const state = {
      ...duck.initialState,
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
      badParisConcat: [
        {
          id: 1,
          tag1: "ATCGATCG",
          tag2: "ATCGATCG",
          diff: 0,
          completed: false
        }
      ]
    };
    expect(
      reducer(state, {
        type: duck.TOGGLE_TAG_PAIR,
        id: 0
      })
    ).toEqual({
      ...state,
      badPairs: [
        {
          id: 0,
          tag1: "ATCG",
          tag2: "ATCG",
          diff: 0,
          pos: 11,
          completed: true
        }
      ]
    });
  });
  it("should handle TOGGLE_TAG_PAIR with a concatenated tag", () => {
    const state = {
      ...duck.initialState,
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
    };
    expect(
      reducer(state, {
        type: duck.TOGGLE_TAG_PAIR,
        id: 1
      })
    ).toEqual({
      ...state,
      badPairsConcat: [
        {
          id: 1,
          tag1: "ATCGATCG",
          tag2: "ATCGATCG",
          diff: 0,
          completed: true
        }
      ]
    });
  });
});
