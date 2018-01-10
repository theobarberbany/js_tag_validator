import { reducer } from "./FileHandlerDuck";
import * as duck from "./FileHandlerDuck";
import { CardStatus, Accordion } from "carbon-components-react";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { EventTypes } from "redux-segment";

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
});

describe("File Handler async actions", () => {
  it("should dispatch pushOverview with the overview data, and then dispatch processBadTags", async () => {
    const expectedActions = [
      {
        data: { bad_tag_total: 2, composition: [[1, 2, 3, 4], [1, 2, 3, 4]] },
        type: "PUSH_OVERVIEW"
      },
      {
        diff: 2,
        id: 0,
        pos: 47,
        tag1: "CCGTAGTA",
        tag2: "CCGTAAGA",
        type: "ADD_BAD_TAG_PAIR",
        meta: {
          analytics: {
            eventType: EventTypes.track,
            eventPayload: {
              event: "ADD_BAD_TAG_PAIR",
              properties: {
                tag1: "CCGTAGTA",
                tag2: "CCGTAAGA",
                diff: 2,
                pos: 47
              }
            }
          }
        }
      },
      {
        diff: 0,
        id: 1,
        pos: "56 : 23",
        tag1: "GCGTAGTAGCGTAGTA",
        tag2: "GCGTAGTAGCGTAGTA",
        type: "ADD_BAD_TAG_PAIR_CONCAT",
        meta: {
          analytics: {
            eventType: EventTypes.track,
            eventPayload: {
              event: "ADD_BAD_TAG_PAIR_CONCAT",
              properties: {
                tag1: "GCGTAGTAGCGTAGTA",
                tag2: "GCGTAGTAGCGTAGTA",
                diff: 0,
                pos: "56:23"
              }
            }
          }
        }
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
          bad_tag_pairs: [["GCGTAGTAGCGTAGTA", "GCGTAGTAGCGTAGTA", 0, 56, 23]]
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
});
