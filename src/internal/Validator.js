const testarray = [
  ["TAAGGCGA", "CTCTCTAT"],
  ["CGTACTAG", "CTCTCTAT"],
  ["AGGCAGAA", "CTCTCTAT"]
];

function difference(tag1, tag2) {
  //Check the difference between two tags
  try {
    let counter = 0;
    for (let i = 0; i < tag1.length; i++) {
      if (tag1[i] != tag2[i]) {
        counter += 1;
      }
    }
    return counter;
  } catch (e) {
    console.log(e);
  }
}

module.exports = { difference: difference };
