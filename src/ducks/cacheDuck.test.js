import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";

import { reducer } from "./cacheDuck";
import * as duck from "./cacheDuck";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("actions", () => {
  it("should create an action to request a cache fetch", () => {
    const cacheURL = "http://testurl.fetch/cache.json";
    const expectedAction = {
      type: duck.REQUEST_CACHE,
      cacheURL: cacheURL
    };
    expect(duck.requestCache(cacheURL)).toEqual(expectedAction);
  });
  it("should create an action to recieve a cache fetch after the async action to carry out the fetch completes", () => {
    const json = {
      somejsonobject: "somedata"
    };
    const cacheURL = "http://testurl.fetch/cache.json";
    const expectedAction = {
      type: duck.RECIEVE_CACHE,
      cacheURL,
      data: json,
      receivedAt: Date.now()
    };
    expect(duck.recieveCache(cacheURL, json)).toEqual(expectedAction);
  });
});

describe("async actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  beforeEach(() => {
    // fetchMock.get("*", {
    //   body: { somejsonobject: "somedata" },
    //   headers: { "content-type": "application/json" }
    // });
    fetchMock.mock("*", {
      status: 200,
      body: {
        somejsonobject: "somedata"
      },
      headers: {
        "content-type": "application/json"
      }
    });
  });
  it("creates RECIEVE_CACHE when fetching the cache is complete", () => {
    let p = fetch("/cache").then(res => {
      return res.json();
    });
    p.then(j => {
      console.log("Res dump: ", j);
    });

    const expectedActions = [
      {
        type: duck.REQUEST_CACHE,
        cacheURL: "/cache.json"
      },
      {
        type: duck.RECIEVE_CACHE,
        cacheURL: "/cache.json",
        data: {
          body: {
            somejsonobject: "somedata"
          }
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(duck.fetchCache("/cache.json")).then(() => {
      //rebodyturn of async actions
      console.log("store actions: ", store.getActions());
      let gotActions = store.getActions();
      let o = gotActions[1];
      delete o.receivedAt;
      expect(gotActions).toEqual(expectedActions);
    });
  });
});

test("reducers", () => {
  let state;
  state = reducer(
    {
      fileHandler: {
        displayProps: {
          cardTitle: "Get started",
          cardIcon: "copy",
          cardInfo: ["Drop manifest file here"],
          status: 1
        },
        cleanData: [],
        badPairs: [],
        badPairsConcat: []
      },
      cache: {
        isFetching: false,
        didInvalidate: false,
        data: []
      }
    },
    {
      type: "REQUEST_CACHE",
      cacheURL:
        "https://raw.githubusercontent.com/theobarberbany/js_tag_validator/development/src/internal/cache_min.json"
    }
  );
  expect(state).toEqual({
    cache: {
      data: [],
      didInvalidate: false,
      isFetching: false
    },
    didInvalidate: false,
    fileHandler: {
      badPairs: [],
      badPairsConcat: [],
      cleanData: [],
      displayProps: {
        cardIcon: "copy",
        cardInfo: ["Drop manifest file here"],
        cardTitle: "Get started",
        status: 1
      }
    },
    isFetching: true
  });
});
