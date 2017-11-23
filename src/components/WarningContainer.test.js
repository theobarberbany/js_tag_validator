import React from "react";
import { mount } from "enzyme";
import {
  WarningContainer,
  mapStateToProps,
  getVisibleWarnings
} from "./WarningContainer";

const props = {
  badPairs: [
    {
      id: 0,
      tag1: "CTCTCTAC",
      tag2: "CTCTCTAT",
      diff: 1,
      pos: 16,
      completed: false
    },
    {
      id: 1,
      tag1: "CGGAGCCT",
      tag2: "CTAAGCCT",
      diff: 2,
      pos: 169,
      completed: false
    },
    {
      id: 2,
      tag1: "TAAGGCGA",
      tag2: "TTATGCGA",
      diff: 2,
      pos: 286,
      completed: false
    },
    {
      id: 3,
      tag1: "GCGTAGTA",
      tag2: "GCGTAAGA",
      diff: 2,
      pos: 336,
      completed: false
    }
  ],
  badPairsConcat: [
    {
      id: 2,
      tag1: "CTCTCTACCTCTCTAT",
      tag2: "CTCTCTACCTCTCTAT",
      diff: 0,
      completed: false
    }
  ],
  onClick: jest.fn()
};

const mockState = {
  warningContainer: {
    warningItems: {
      badPairs: props.badPairs,
      badPairsConcat: props.badPairsConcat
    }
  }
};

function setupMount() {
  const enzymeWrapper = mount(<WarningContainer {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe("Testing OutputContainer", () => {
  const { enzymeWrapper } = setupMount();
  //There are two tag (8 base long) groups worth of data passed
  //Hence 16 rows of output should be created
  it("should return 5 WarningItem(s) to test that map() is working correctly", () => {
    const input = enzymeWrapper.find("WarningItem");
    expect(input.length).toEqual(5);
  });
  it("should call onClick when the WarningItem is clicked", () => {
    const { enzymeWrapper, props } = setupMount();

    enzymeWrapper.find("WarningItem").forEach(node => {
      //console.log(node.debug());
      node.simulate("click");
    });
    expect(props.onClick.mock.calls.length).toBe(5);
  });

  describe("Testing mapStateToProps", () => {
    it("returns the correct slice of state", () => {
      console.log(mapStateToProps(mockState));
      expect(mapStateToProps(mockState).badPairs).toEqual(props.badPairs);
      expect(mapStateToProps(mockState).badPairsConcat).toEqual(
        props.badPairsConcat
      );
    });
  });
});

//Can't see a nice way to do this, apparently it's also a bad idea

// describe("Testing mapDispatchToProps", () => {
//   it("Maps onClick to props", () => {
//     expect(mapDispatchToProps(dispatch).onClick).toEqual(props.onClick);
//   });
// });

// const dispatch = () => {};

// console.log(mapDispatchToProps(dispatch));
