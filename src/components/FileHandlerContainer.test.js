import React from "react";
import { shallow } from "enzyme";
import { FileHandlerContainer } from "./FileHandlerContainer";

const props = {
  fetchCache: jest.fn(),
  processOverview: jest.fn(),
  pushData: jest.fn()
};

function setupShallow() {
  const enzymeWrapper = shallow(<FileHandlerContainer {...props} />);

  return {
    enzymeWrapper
  };
}

it("fetches the cache on mount", () => {
  const { enzymeWrapper } = setupShallow();
  expect(props.fetchCache.mock.calls.length).toBe(1);
  props.fetchCache.mockReset();
});

describe("runValidation function testing", () => {
  it("calls processOverview", () => {
    const { enzymeWrapper } = setupShallow();
    let testArray = [["ATCG", "GCTA"]];
    enzymeWrapper.instance().runValidation(testArray);
    expect(props.processOverview.mock.calls.length).toBe(1);
    props.processOverview.mockReset();
    props.fetchCache.mockReset();
  });
  it("calls run", () => {
    //mock the  specific module function within jest.
    jest.unmock("../internal/Validator.js");
    const validator = require("../internal/Validator");
    validator.run = jest.fn();
    const { enzymeWrapper } = setupShallow();
    let testArray = [["ATCG", "GCTA"]];
    enzymeWrapper.instance().runValidation(testArray);
    expect(validator.run.mock.calls.length).toEqual(1);
  });
  it("Determines dual indexing correctly", () => {
    const { enzymeWrapper } = setupShallow();
    let testArray = [["ATCG", "GCTA"]];
    enzymeWrapper.instance().runValidation(testArray);
    expect(enzymeWrapper.state("indexing")).toEqual("dual");
  });
  it("determines single indexing correctly", () => {
    const { enzymeWrapper } = setupShallow();
    let testArray = [["ATCG", "gibberish"]];
    enzymeWrapper.instance().runValidation(testArray);
    expect(enzymeWrapper.state("indexing")).toEqual("single");
  });
  it("hides the fileHandler drop zone", () => {
    const { enzymeWrapper } = setupShallow();
    let testArray = [["ATCG", "GCTA"]];
    enzymeWrapper.instance().runValidation(testArray);
    expect(enzymeWrapper.state("hideFileHandler")).toEqual(true);
  });
});
