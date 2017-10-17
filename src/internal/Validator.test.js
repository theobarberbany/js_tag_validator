const Validator = require("./Validator");

test('tests the difference between "TAAGGCGA","CGTACTAG" to be 8', () => {
  expect(Validator.difference("TAAGGCGA", "CGTACTAG")).toBe(8);
});
