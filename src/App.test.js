import React from "react";
import ReactDOM from "react-dom";
import Raven from "raven-js";
import { shallow } from "enzyme";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

//Can't get the following working either.

// function setupMount() {
//   const enzymeWrapper = shallow(<App />).instance();

//   return {
//     enzymeWrapper
//   };
// }

// Raven.captureException = jest.fn();

// describe("Component lifecycle methods", () => {
//   it("calls ravenjs on catching an error", () => {
//     const wrapper = setupMount();
//     wrapper.componentDidCatch("Test Error", "This is deliberately broken");
//   });
// });
