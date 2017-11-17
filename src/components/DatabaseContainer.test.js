import React from "react";
import { mount } from "enzyme";
import {
  DatabaseContainer,
  mapStateToProps,
  filterCache,
  filterCacheConcat
} from "./DatabaseContainer";

const props = {
  tags: { AAGGCTAT: [[1, "Testing Set 1"], [2, "Testing set 2"]] },
  tagsConcat: { ACTCGCTAAAGGCTAT: [[3, "Testing Set 3"], [4, "Testing set 4"]] }
};

const cache = {
  item1: [[1, "item 1 correspondence 1"], [2, "Item 1 correspondence 2"]],
  item2: [[3, "item 2 correspondence 1"], [4, "Item 3 correspondence 2"]],
  item3: [[42, "the answer to life, the universe and everything"]],
  item1item2: [[5, "concatenated item 1 correspondence 1"]]
};

const tags1 = [["item1", "item2"]];
const tags2 = [["item2", "item3"]];

const mockState = {
  fileHandler: {
    cleanData: tags1
  },
  cache: {
    data: {
      tag_db: cache
    }
  }
};

function setupMount() {
  const enzymeWrapper = mount(<DatabaseContainer {...props} indexing="dual" />);

  return {
    props,
    enzymeWrapper
  };
}

describe("Testing DatabaseContainer", () => {
  const { enzymeWrapper } = setupMount();

  it("should return 4 DatabaseItem(s) to test that map() is working correctly", () => {
    const input = enzymeWrapper.find("DatabaseItem");
    expect(input.length).toEqual(4);
  });
  it("should return one for each item", () => {
    enzymeWrapper.find("DatabasdItem").forEach(node => {
      expect(node.prop("matches")).toEqual(1);
    });
  });
});

describe("Testing filterCache", () => {
  it("should return an object where the keys are the tags provided and the values are the corresponding entries in the cache", () => {
    expect(filterCache(cache, tags1)).toEqual({
      item1: [[1, "item 1 correspondence 1"], [2, "Item 1 correspondence 2"]],
      item2: [[3, "item 2 correspondence 1"], [4, "Item 3 correspondence 2"]]
    });
    expect(filterCache(cache, tags2)).toEqual({
      item2: [[3, "item 2 correspondence 1"], [4, "Item 3 correspondence 2"]],
      item3: [[42, "the answer to life, the universe and everything"]]
    });
  });
});

describe("Testing filterCacheConcat", () => {
  it("should return an object where the keys are the concatenation of the tags provided and the values are the corresponding entries in the cache", () => {
    expect(filterCacheConcat(cache, tags1)).toEqual({
      item1item2: [[5, "concatenated item 1 correspondence 1"]]
    });
  });
});

describe("Testing mapStateToProps", () => {
  it("returns filtered and filteredConcat results in the correct form", () => {
    expect(mapStateToProps(mockState)).toEqual({
      length: 1,
      tags: {
        item1: [[1, "item 1 correspondence 1"], [2, "Item 1 correspondence 2"]],
        item2: [[3, "item 2 correspondence 1"], [4, "Item 3 correspondence 2"]]
      },
      tagsConcat: { item1item2: [[5, "concatenated item 1 correspondence 1"]] }
    });
  });
});
