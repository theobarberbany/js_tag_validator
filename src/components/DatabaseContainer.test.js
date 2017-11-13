import React from "react";
import { mount } from "enzyme";
import {
  DatabaseContainer,
  mapStateToProps,
  arrayCompare,
  equal,
  arrayEqual,
  includesArray,
  distinctArray,
  getCount,
  filterCache,
  filterCacheConcat
} from "./DatabaseContainer";

import {
  Accordion,
  AccordionItem,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
  ModalWrapper
} from "carbon-components-react";

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
  const enzymeWrapper = mount(<DatabaseContainer {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe("Testing full renders", () => {
  const { enzymeWrapper } = setupMount();
  it("Console logs everything as HTML", () => {
    console.log("hello world");
    //console.log(enzymeWrapper.debug());
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
      tags: {
        item1: [[1, "item 1 correspondence 1"], [2, "Item 1 correspondence 2"]],
        item2: [[3, "item 2 correspondence 1"], [4, "Item 3 correspondence 2"]]
      },
      tagsConcat: { item1item2: [[5, "concatenated item 1 correspondence 1"]] }
    });
  });
});
