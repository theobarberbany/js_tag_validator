const testarray = [
  ["TAAGGCGA", "CTCTCTAT"],
  ["CGTACTAG", "CTCTCTAT"],
  ["AGGCAGAA", "CTCTCTAT"]
];

function difference(tag1, tag2) {
  //Check the difference between two tags
  try {
    if (tag1.length != tag2.length) {
      throw "Tag Length Mismatch";
    }
    let counter = 0;
    for (let i = 0; i < tag1.length; i++) {
      if (tag1[i] != tag2[i]) {
        counter += 1;
      }
    }
    return counter;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
}

module.exports = { difference: difference };
