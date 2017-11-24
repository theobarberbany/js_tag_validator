import React from "react";
import { mount } from "enzyme";
import WarningItem from "./WarningItem";
import {
  StructuredListInput,
  StructuredListCell,
  Icon
} from "carbon-components-react";

const props = {
  onClick: jest.fn(),
  tag1: "ATCG",
  tag2: "CGTA",
  diff: 30,
  pos: 40
};

function setupMount() {
  const enzymeWrapper = mount(<WarningItem {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe("Testing full renders", () => {
  const { enzymeWrapper } = setupMount();
  it("Console logs everything as HTML", () => {
    console.log("hello world");
    console.log(enzymeWrapper.debug());
  });
});

describe("WarningItem Tests", () => {
  const { enzymeWrapper } = setupMount();

  it("should render a StructuredListRow item", () => {
    expect(enzymeWrapper.find(".bx--structured-list-row").exists());
  });
  it("should contain a StructuredListInput entry", () => {
    expect(
      enzymeWrapper.contains(
        <StructuredListInput
          id="warning"
          value="warning"
          title="warning"
          name="warning"
        />
      )
    ).toEqual(true);
  });
  it("should contain a StructuredListCell that contains an Icon", () => {
    expect(
      enzymeWrapper.contains(
        <StructuredListCell>
          <Icon
            className="bx--structured-list-svg"
            name="checkmark--glyph"
            description="Check off a warning once fixed"
          />
        </StructuredListCell>
      )
    ).toEqual(true);
  });
  it("should contain a StructuredListCell that contains tag 1", () => {
    expect(
      enzymeWrapper.contains(<StructuredListCell>ATCG</StructuredListCell>)
    ).toEqual(true);
  });
  it("should contain a StructuredListCell that contains tag 2", () => {
    expect(
      enzymeWrapper.contains(<StructuredListCell>CGTA</StructuredListCell>)
    ).toEqual(true);
  });
  it("should contain a StructuredListCell that contains diff", () => {
    expect(
      enzymeWrapper.contains(<StructuredListCell>{30}</StructuredListCell>)
    ).toEqual(true);
  });
  it("should contain a StructuredListCell that contains pos", () => {
    expect(
      enzymeWrapper.contains(<StructuredListCell>{40}</StructuredListCell>)
    ).toEqual(true);
  });
  //Check onClick() is called when  the row is clicked.
  it("should call onClick when the row is clicked", () => {
    const { enzymeWrapper, props } = setupMount();
    const input = enzymeWrapper.find("StructuredListRow");
    input.props().onClick("");
    expect(props.onClick.mock.calls.length).toBe(1);
  });
});
