import { XMLHttpRequest } from "xmlhttprequest";
global.XMLHttpRequest = XMLHttpRequest;
import "isomorphic-fetch";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import { reducer } from "./cacheDuck";
import * as duck from "./cacheDuck";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import fetchMock from "fetch-mock";

describe("cache actions", () => {
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

describe("async cache actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  beforeEach(() => {
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

  it("creates RECIEVE_CACHE when fetching the cache is complete", async () => {
    const expectedActions = [
      {
        type: duck.REQUEST_CACHE,
        cacheURL: "cache.json"
      },
      {
        type: duck.RECIEVE_CACHE,
        cacheURL: "cache.json",
        data: {
          somejsonobject: "somedata"
        }
      }
    ];
    const store = mockStore({});

    await store.dispatch(duck.fetchCache("cache.json")).then(() => {
      //hack to prevent recievedAt field failing the test
      let gotActions = store.getActions();
      //Action 1
      expect(gotActions[0]).toEqual(expectedActions[0]);
      //Action 2
      ////type
      expect(gotActions[1].type).toEqual(expectedActions[1].type);
      ////cacheURL
      expect(gotActions[1].cacheURL).toEqual(expectedActions[1].cacheURL);
      ////data
      expect(gotActions[1].data).toEqual(expectedActions[1].data);
    });
  });
});

const initialState = {
  isFetching: false,
  didInvalidate: false,
  data: []
};

const cacheURL = "http://testing123.com/cache.json";
const data = { somejson: "somedata" };

describe("Cache reducer", () => {
  it("returns initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it("should handle REQUEST_CACHE", () => {
    expect(
      reducer(undefined, {
        type: duck.REQUEST_CACHE
      })
    ).toEqual({
      ...initialState,
      isFetching: true,
      didInvalidate: false
    });
  });
  it("should handle RECIEVE_CACHE", () => {
    expect(
      reducer(
        {
          ...initialState,
          isFetching: true,
          didInvalidate: false
        },
        {
          type: duck.RECIEVE_CACHE,
          cacheURL,
          data: data,
          receivedAt: 0
        }
      )
    ).toEqual({
      ...initialState,
      isFetching: false,
      didInvalidate: false,
      data: data,
      lastUpdated: 0
    });
  });
});
