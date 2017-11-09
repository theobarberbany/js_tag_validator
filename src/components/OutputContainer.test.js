import React from "react";
import { mount, shallow } from "enzyme";
import { OutputContainer, mapStateToProps } from "./OutputContainer";

const props = {
  composition: [
    [
      [23, 30, 22, 16],
      [16, 8, 37, 30],
      [15, 22, 15, 39],
      [29, 15, 23, 24],
      [23, 0, 30, 38],
      [7, 16, 38, 30],
      [23, 37, 16, 15],
      [22, 15, 38, 16]
    ],
    [
      [12, 31, 24, 24],
      [24, 32, 35, 0],
      [20, 12, 12, 47],
      [23, 44, 12, 12],
      [24, 12, 35, 20],
      [36, 35, 8, 12],
      [35, 12, 12, 32],
      [32, 36, 0, 23]
    ]
  ]
};

const mockState = {
  fileHandler: {
    overview: {
      composition: props.composition
    }
  }
};

function setupShallow() {
  const enzymeWrapper = shallow(<OutputContainer {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe("Testing OutputContainer", () => {
  const { enzymeWrapper } = setupShallow();
  //There are two tag (8 base long) groups worth of data passed
  //Hence 16 rows of output should be created
  it("should return 16 OutputItem(s) to test that map() is working correctly", () => {
    const input = enzymeWrapper.find("OutputItem");
    expect(input.length).toEqual(16);
  });
  it("should calculate the sum correctly", () => {
    enzymeWrapper.find("OutputItem").forEach(node => {
      expect(node.prop("sum")).toEqual(91);
    });
  });
});

describe("Testing mapStateToProps", () => {
  it("returns the correct slice of state", () => {
    expect(mapStateToProps(mockState)).toEqual(props);
  });
});
