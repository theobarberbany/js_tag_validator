import React from "react";
import { mount, shallow } from "enzyme";
import OutputItem from "./OutputItem";
import { TableRow, TableData } from "carbon-components-react";

const props = {
  colNo: 1,
  a: 10,
  t: 20,
  c: 30,
  g: 40,
  sum: 100
};

function setupMount() {
  const enzymeWrapper = mount(<OutputItem {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

function setupShallow() {
  const enzymeWrapper = shallow(<OutputItem {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe("Testing shallow renders", () => {
  const { enzymeWrapper } = setupShallow();
  it("Console logs everything as HTML", () => {
    console.log("hello world");
    console.log(enzymeWrapper.html());
  });
});

describe("OutputItem", () => {
  const { enzymeWrapper } = setupShallow();
  it("should render a table item", () => {
    expect(enzymeWrapper.find(".bx--table-row").exists());
  });
  it("should contain a colNo entry that equals 1", () => {
    expect(enzymeWrapper.find(".colNo").exists());
    console.log(enzymeWrapper.debug());
    expect(
      enzymeWrapper.contains(<TableData className="colNo">1</TableData>)
    ).toEqual(true);
  });
  it("should contain an 'a' entry that equals 10.00", () => {
    expect(enzymeWrapper.find(".a").exists());
    expect(
      enzymeWrapper.contains(<TableData className="a">10.0</TableData>)
    ).toEqual(true);
  });
  it("should contain a 't' entry that equals 20.00", () => {
    expect(enzymeWrapper.find(".t").exists());
    expect(
      enzymeWrapper.contains(<TableData className="t">20.0</TableData>)
    ).toEqual(true);
  });
  it("should contain a 'c' entry that equals 30.00", () => {
    expect(enzymeWrapper.find(".c").exists());
    expect(
      enzymeWrapper.contains(<TableData className="c">30.0</TableData>)
    ).toEqual(true);
  });
  it("should contain a 'g' entry that equals 40.00", () => {
    expect(enzymeWrapper.find(".g").exists());
    expect(
      enzymeWrapper.contains(<TableData className="g">40.0</TableData>)
    ).toEqual(true);
  });
});
