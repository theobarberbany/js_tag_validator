const difference = require("./Validator");

test('tests the difference between "TAAGGCGA","CGTACTAG" to be 8', () => {
  expect(difference("TAAGGCGA", "CGTACTAG").toBe(8));
});
