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

describe("Check_array function", () => {
  it("when both tags are checked, fail", () => {
    expect(Validator.check_array(testArray)).toBe(3);
  });
  it("checks the first tag passes", () => {
    expect(Validator.check_array(["TAAGGCGA", "CGTACTAG", "AGGCAGAA"])).toBe(0);
  });
  it("checks the second tag fails", () => {
    expect(Validator.check_array(["CTCTCTAT", "CTCTCTAT", "CTCTCTAT"])).toBe(3);
  });
});

describe("reverse_compliment function", () => {
  it("checks the reverse compliment of : TAAGGCGA", () => {
    expect(Validator.reverse_compliment("TAAGGCGA")).toBe("TCGCCTTA");
  });
  it("checks the reverse compliment of : CGTACTAG", () => {
    expect(Validator.reverse_compliment("CGTACTAG")).toBe("CTAGTACG");
  });
  it("checks the reverse compliment of : AGGCAGAA", () => {
    expect(Validator.reverse_compliment("AGGCAGAA")).toBe("TTCTGCCT");
  });
});

describe("Extracting a single tag from the parsed array", () => {
  it("Extracts the first tag from the test array", () => {
    expect(Validator.extract_from_array(testArray, 0)).toEqual([
      "TAAGGCGA",
      "CGTACTAG",
      "AGGCAGAA"
    ]);
  });
  it("Extracts the second tag from the test array", () => {
    expect(Validator.extract_from_array(testArray, 1)).toEqual([
      "CTCTCTAT",
      "CTCTCTAT",
      "CTCTCTAT"
    ]);
  });
});
