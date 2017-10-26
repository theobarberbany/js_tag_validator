import { reducer } from "./cacheDuck";

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
      cache: { isFetching: false, didInvalidate: false, data: [] }
    },
    {
      type: "REQUEST_CACHE",
      cacheURL:
        "https://raw.githubusercontent.com/theobarberbany/js_tag_validator/development/src/internal/cache_min.json"
    }
  );
  expect(state).toEqual({
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
    cache: { isFetching: true, didInvalidate: false, data: [] }
  });
});
