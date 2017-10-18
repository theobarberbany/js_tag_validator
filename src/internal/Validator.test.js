const testArray = [
  ["TAAGGCGA", "CTCTCTAT"],
  ["CGTACTAG", "CTCTCTAT"],
  ["AGGCAGAA", "CTCTCTAT"]
];

const Validator = require("./Validator");

describe("Difference function", () => {
  it('tests the difference between "TAAGGCGA","CGTACTAG" to be 8', () => {
    expect(Validator.difference("TAAGGCGA", "CGTACTAG")).toBe(8);
  });
  it("checks an error is thrown on tag length mismatch", () => {
    // pass an anonymous function so the function gets executed,
    //and it's result is thrown to expect() instead of just the
    //result of the error being thrown
    expect(() => Validator.difference("TAAGGCGA", "CGTACTA")).toThrowError(
      Error
    );
  });
});

describe("Check an array of tags", () => {
  it("checks the test array fails", () => {
    expect(Validator.check_array(testArray)).toBe(3);
  });
});
