import { reducer } from "./FileHandlerDuck";
import * as duck from "./FileHandlerDuck";
import { CardStatus } from "carbon-components-react";

describe("actions", () => {
  it("should create an action to load an object into the store", () => {
    const data = { text: "asdf" };
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
      tag1: tag1,
      tag2: tag2,
      diff: diff,
      pos: pos
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
      tag1: tag1,
      tag2: tag2,
      diff: diff
    };
    expect(duck.addBadTagPairConcat(tag1, tag2, diff)).toEqual(expectedAction);
  });
});

test("reducers", () => {
  let state;
  state = reducer(undefined, {});
  expect(state.displayProps).toEqual({
    cardTitle: "Get started",
    cardIcon: "copy",
    cardInfo: ["Drop manifest file here"],
    status: 1
  });
  state = reducer(undefined, { type: "DROP_FILE" });
  expect(state.displayProps).toEqual({
    cardTitle: "Crunching Numbers",
    cardIcon: "copy",
    cardInfo: ["Won't be a minute"],
    status: 0
  });
});
