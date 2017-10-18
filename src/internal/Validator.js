// See https://github.com/theobarberbany/tag_validator
function difference(tag1, tag2) {
  //compare two tags - return the degree to which they differ
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

function check_array(array) {
  // check if an array of tags differ by at least 3.
  let number_cols = array[0].length;
  let bad_tags = 0;
  for (let i = 0; i < number_cols; i++) {
    for (let j = 0; j < array.length; j++) {
      for (let k = j + 1; k < array.length; k++) {
        let diff = difference(array[j][i], array[k][i]);
        // to do  :  dispatch an action to add this to a 'checklist'
        diff < 3 ? bad_tags++ : null;
      }
    }
  }
  return bad_tags;
}
module.exports = {
  difference: difference,
  check_array: check_array
};
