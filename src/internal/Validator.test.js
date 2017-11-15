const testArray = [
  ["TAAGGCGA", "CTCTCTAT"],
  ["CGTACTAG", "CTCTCTAT"],
  ["AGGCAGAA", "CTCTCTAT"]
];

const badTestArray = [
  ["TAAGGCGA", "TAAGGCGA"],
  ["TAAGGCGA", "TAAGGCGA"],
  ["TAAGGCGA", "TAAGGCGA"]
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
  it("when both tags are checked, pass", () => {
    expect(Validator.call_check_array(testArray)).toEqual({
      concatenated: { bad_tag_count: 0, bad_tag_pairs: [] },
      normal: { bad_tag_count: 0, bad_tag_pairs: [] }
    });
  });
  it("checks the first tag passes", () => {
    expect(
      Validator.call_check_array(["TAAGGCGA", "CGTACTAG", "AGGCAGAA"])
    ).toEqual({ bad_tag_count: 0, bad_tag_pairs: [] });
  });
  it("checks the second tag fails", () => {
    expect(
      Validator.call_check_array(["CTCTCTAT", "CTCTCTAT", "CTCTCTAT"])
    ).toEqual({
      bad_tag_count: 3,
      bad_tag_pairs: [
        ["CTCTCTAT", "CTCTCTAT", 0],
        ["CTCTCTAT", "CTCTCTAT", 0],
        ["CTCTCTAT", "CTCTCTAT", 0]
      ]
    });
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

describe("Extracting a single tag group from the parsed array", () => {
  it("Extracts the first tag from the test array", () => {
    expect(Validator.extract_from_array(testArray, 0)).toEqual([
      "TAAGGCGA",
      "CGTACTAG",
      "AGGCAGAA"
    ]);
  });
  it("Extracts the second tag group from the test array", () => {
    expect(Validator.extract_from_array(testArray, 1)).toEqual([
      "CTCTCTAT",
      "CTCTCTAT",
      "CTCTCTAT"
    ]);
  });
});

describe("Extracting the first base from every tag in a tag set (oligo)", () => {
  it("Extracts the nth (n=0) base from a given array of single tags", () => {
    expect(
      Validator.extract_base(["TAAGGCGA", "CGTACTAG", "AGGCAGAA"], 0)
    ).toEqual(["T", "C", "A"]);
  });
});

describe("Checking the composition of each 'column' in a given tag set (oligo)", () => {
  it("Returns an object, containing an array for each column with tallies of each base [A,T,C,G]", () => {
    expect(
      Validator.check_tag_set_composition(["TAAGGCGA", "CGTACTAG", "AGGCAGAA"])
    ).toEqual([
      [1, 1, 1, 0],
      [1, 0, 0, 2],
      [1, 1, 0, 1],
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [0, 1, 1, 1],
      [2, 0, 0, 1],
      [2, 0, 0, 1]
    ]);
  });
});

describe("Function to concatenate tags", () => {
  it("Concatenates tag2 to tag1", () => {
    expect(Validator.concatenate_tags([["A", "B"]])).toEqual(["AB"]);
    expect(Validator.concatenate_tags(testArray)).toEqual([
      "TAAGGCGACTCTCTAT",
      "CGTACTAGCTCTCTAT",
      "AGGCAGAACTCTCTAT"
    ]);
  });
});

describe("call_check_tag_set_composition function", () => {
  it("should determine the number of tag groups correctly", () => {
    //1 group
    expect(
      Validator.call_check_tag_set_composition(
        testArray.reduce((acc, cur) => acc.concat(cur), [])
      ).length
    ).toEqual(1);
    //2 groups
    expect(Validator.call_check_tag_set_composition(testArray).length).toEqual(
      2
    );
  });
  it("should return the composition of the tag groups in the array passed", () => {
    expect(Validator.call_check_tag_set_composition(testArray)).toEqual([
      [
        [
          [1, 1, 1, 0],
          [1, 0, 0, 2],
          [1, 1, 0, 1],
          [1, 0, 1, 1],
          [1, 0, 1, 1],
          [0, 1, 1, 1],
          [2, 0, 0, 1],
          [2, 0, 0, 1]
        ],
        [
          [0, 0, 3, 0],
          [0, 3, 0, 0],
          [0, 0, 3, 0],
          [0, 3, 0, 0],
          [0, 0, 3, 0],
          [0, 3, 0, 0],
          [3, 0, 0, 0],
          [0, 3, 0, 0]
        ]
      ]
    ]);
    expect(
      Validator.call_check_tag_set_composition(
        testArray.reduce((acc, cur) => acc.concat(cur), [])
      )
    ).toEqual([
      [1, 1, 4, 0],
      [1, 3, 0, 2],
      [1, 1, 3, 1],
      [1, 3, 1, 1],
      [1, 0, 4, 1],
      [0, 4, 1, 1],
      [5, 0, 0, 1],
      [2, 3, 0, 1]
    ]);
  });
});

describe("run function", () => {
  it("should return an object with the contents of all the validation outputs", () => {
    expect(Validator.run(badTestArray)).toEqual({
      bad_tag_container: {
        concatenated: {
          bad_tag_count: 3,
          bad_tag_pairs: [
            ["TAAGGCGATAAGGCGA", "TAAGGCGATAAGGCGA", 0],
            ["TAAGGCGATAAGGCGA", "TAAGGCGATAAGGCGA", 0],
            ["TAAGGCGATAAGGCGA", "TAAGGCGATAAGGCGA", 0]
          ]
        },
        normal: {
          bad_tag_count: 3,
          bad_tag_pairs: [
            ["TAAGGCGA", "TAAGGCGA", 0, 10],
            ["TAAGGCGA", "TAAGGCGA", 0, 11],
            ["TAAGGCGA", "TAAGGCGA", 0, 12]
          ]
        }
      },
      composition: {
        composition: [
          [
            [0, 3, 0, 0],
            [3, 0, 0, 0],
            [3, 0, 0, 0],
            [0, 0, 0, 3],
            [0, 0, 0, 3],
            [0, 0, 3, 0],
            [0, 0, 0, 3],
            [3, 0, 0, 0]
          ],
          [
            [0, 3, 0, 0],
            [3, 0, 0, 0],
            [3, 0, 0, 0],
            [0, 0, 0, 3],
            [0, 0, 0, 3],
            [0, 0, 3, 0],
            [0, 0, 0, 3],
            [3, 0, 0, 0]
          ]
        ]
      }
    });
    expect(Validator.run(testArray)).toEqual({
      bad_tag_container: {
        concatenated: { bad_tag_count: 0, bad_tag_pairs: [] },
        normal: { bad_tag_count: 0, bad_tag_pairs: [] }
      },
      composition: {
        composition: [
          [
            [1, 1, 1, 0],
            [1, 0, 0, 2],
            [1, 1, 0, 1],
            [1, 0, 1, 1],
            [1, 0, 1, 1],
            [0, 1, 1, 1],
            [2, 0, 0, 1],
            [2, 0, 0, 1]
          ],
          [
            [0, 0, 3, 0],
            [0, 3, 0, 0],
            [0, 0, 3, 0],
            [0, 3, 0, 0],
            [0, 0, 3, 0],
            [0, 3, 0, 0],
            [3, 0, 0, 0],
            [0, 3, 0, 0]
          ]
        ]
      }
    });
  });
});
