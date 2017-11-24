import React from "react";
import { mount, shallow } from "enzyme";
import {
  cardProps,
  overflowMenuItemProps,
  overflowMenuProps,
  visitInfo,
  boxTarget
} from "./FileHandler";

//Mock console.log()
global.console = {
  log: jest.fn()
};

//Mock window.location.assign()
window.location.assign = jest.fn();

describe("Testing cardProps", () => {
  it("On click console logs 'click' ", () => {
    cardProps.onClick();
    expect(global.console.log).toHaveBeenCalledWith("click");
  });
  it("On focus console logs 'focus' ", () => {
    cardProps.onFocus();
    expect(global.console.log).toHaveBeenCalledWith("focus");
  });
});

describe("Testing overFlowMenuProps", () => {
  it("On click console logs 'click' ", () => {
    overflowMenuProps.onClick();
    expect(global.console.log).toHaveBeenCalledWith("click");
  });
  it("On focus console logs 'focus' ", () => {
    overflowMenuProps.onFocus();
    expect(global.console.log).toHaveBeenCalledWith("focus");
  });
});

describe("Testing overflowMenuItemProps", () => {
  it("On focus console logs 'focus' ", () => {
    overflowMenuItemProps.onFocus();
    expect(global.console.log).toHaveBeenCalledWith("focus");
  });
});

describe("Test visitInfo calls window.location to the github page", () => {
  it("goes to the github page", () => {
    visitInfo();
    expect(window.location.assign).toHaveBeenCalledWith(
      "https://github.com/theobarberbany/js_tag_validator/"
    );
  });
});
