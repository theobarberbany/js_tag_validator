const Validator = require("./Validator");

test('tests the difference between "TAAGGCGA","CGTACTAG" to be 8', () => {
  expect(Validator.difference("TAAGGCGA", "CGTACTAG")).toBe(8);
});

test("checks an error is thrown on tag length mismatch", () => {
  // pass an anonymous function so the function gets executed,
  //and it's result is thrown to expect() instead of just the
  //result of the error being thrown
  expect(() => Validator.difference("TAAGGCGA", "CGTACTA")).toThrowError(Error);
});
