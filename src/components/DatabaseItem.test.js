import React from "react";
import { mount } from "enzyme";
import DatabaseItem from "./DatabaseItem";
import { TableRow, TableData } from "carbon-components-react";

function setup() {
  const props = {
    name: "Tag Group",
    id: 0,
    matches: 42
  };

  const enzymeWrapper = mount(<DatabaseItem {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe("DatabaseItem", () => {
  const { enzymeWrapper } = setup();
  console.log(enzymeWrapper.html());
  it("should render a table item", () => {
    expect(enzymeWrapper.find(".bx--table-row").exists());
  });
  it("should contain a name entry that equals tag group", () => {
    expect(enzymeWrapper.find(".name").exists());
    expect(
      enzymeWrapper.contains(<TableData className="name">Tag Group</TableData>)
    ).toEqual(true);
  });
  it("should contain an id entry that equals 0", () => {
    expect(enzymeWrapper.find(".id").exists());
    expect(
      enzymeWrapper.contains(<TableData className="id">{0}</TableData>)
    ).toEqual(true);
  });
  it("should contain a matches entry that equals 42", () => {
    expect(enzymeWrapper.find(".matches").exists());
    expect(
      enzymeWrapper.contains(<TableData className="matches">{42}</TableData>)
    ).toEqual(true);
  });
});
