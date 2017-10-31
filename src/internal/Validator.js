// See https://github.com/theobarberbany/tag_validator

function difference(tag1, tag2) {
  //compare two tags - return the degree to which they differ
  try {
    if (tag1.length !== tag2.length) {
      throw "Tag Length Mismatch";
    }
    let counter = 0;
    for (let i = 0; i < tag1.length; i++) {
      if (tag1[i] !== tag2[i]) {
        counter += 1;
      }
    }
    return counter;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
}

function call_check_array(array) {
  // If Two Cols : Check against adjacent col
  let number_tag_groups;
  let output;
  let concatenated;
  //Determine how many tag groups there are
  if (Array.isArray(array[0])) {
    number_tag_groups = array[0].length;
  } else {
    number_tag_groups = 1;
  }
  // Call the appropriate function
  //Single Tag set
  if (number_tag_groups === 1) {
    console.log("calling check_array_single with data : ", array);
    output = check_array_single(array);
    return output;
  } else {
    // More than one  - so compare tag1 -> tag2
    console.log(
      "calling check_array with data : ",
      array,
      "and ",
      number_tag_groups,
      "tag sets"
    );
    output = check_array(array, number_tag_groups);
    //next check the concatenation as a single tag
    concatenated = concatenate_tags(array);
    console.log(
      "calling check_array_single with concatenated data : ",
      concatenated
    );
    concatenated = check_array_single(concatenated);
  }
  return { normal: output, concatenated: concatenated };
}

function check_array(array, number_tag_groups) {
  console.log(
    "check_array recieved data:",
    array,
    "number tag groups: ",
    number_tag_groups
  );
  let bad_tag_count = 0;
  let bad_tag_pairs = [];
  for (let i = 0; i < array.length; i++) {
    let diff = difference(array[i][0], array[i][1]);
    //console.log("Comparing", array[i][0], "to", array[i][1]);
    diff < 3
      ? bad_tag_pairs.push([array[i][0], array[i][1], diff, i + 10])
      : null;
    diff < 3 ? bad_tag_count++ : null;
  }
  return { bad_tag_count, bad_tag_pairs };
}

function check_array_single(array) {
  console.log("check_array_single recieved data:", array);
  let bad_tag_count = 0;
  let bad_tag_pairs = [];
  for (let j = 0; j < array.length; j++) {
    for (let k = j + 1; k < array.length; k++) {
      let diff = difference(array[j], array[k]);
      // (diff = difference(array[j][i], array[k][i]));
      //console.log("Comparing", array[j], "to", array[k]);
      diff < 3 ? bad_tag_pairs.push([array[j], array[k], diff]) : null;
      diff < 3 ? bad_tag_count++ : null;
    }
  }
  return { bad_tag_count, bad_tag_pairs };
}

// todo: use reduce instead. remove unicorn
function concatenate_tags(array) {
  return array.map(e => {
    return e.join("");
  });
}

function reverse_compliment(tag) {
  let complimentArray = [["A", "T"], ["C", "G"], ["G", "C"], ["T", "A"]];
  let complimentMap = new Map(complimentArray);
  let compliment = tag.split("");
  compliment = compliment.map(base => complimentMap.get(base));
  compliment = compliment.reverse();
  return compliment.join("");
}

function extract_from_array(array, colno) {
  // extract a tag group (oligo) from the parsed array
  let extracted = [];
  for (let i = 0; i < array.length; i++) {
    extracted.push(array[i][colno]);
  }
  return extracted;
}

function extract_base(array, n) {
  //returns an array with the nth base of every tag in the array.
  let data = [];
  for (let i = 0; i < array.length; i++) data.push(array[i][n]);
  return data;
}

function call_check_tag_set_composition(array) {
  // call the func
  let output = [];
  let number_tag_groups = 0;
  if (Array.isArray(array[0])) {
    number_tag_groups = array[0].length;
  } else {
    number_tag_groups = 1;
  }
  for (let i = 0; i < number_tag_groups; i++) {
    let data = extract_from_array(array, i);
    //console.log("calling check_tag_set_composition with data : ", data);
    output[i] = check_tag_set_composition(data);
  }
  return output;
}

function check_tag_set_composition(array) {
  // treat each tag set as a 2d matrix, the first column
  // represents the first base of each tag in the set.
  let tag_length = array[0].length;
  let universe = "ATCG";
  console.log(
    "check_tag_set_composition recieved data: ",
    array,
    "tag length: ",
    tag_length
  );
  let proportions = [];

  for (let i = 0; i < tag_length; i++) {
    proportions[i] = [0, 0, 0, 0]; // A,T,C,G
  }
  for (let i = 0; i < array.length; i++) {
    //For each tag in the array
    for (let j = 0; j < tag_length; j++) {
      // For each base in each tag use a lookup table to increment values
      proportions[j][universe.indexOf(array[i][j])] += 1;
    }
  }
  return proportions;
}

//Not sure if its best to export  all functions separately and call them there,
// or keep this function here to run everything at once

function run(array) {
  //Function to tie everything together
  console.log("Checking tags differ by at least 3");
  let bad_tag_container = call_check_array(array);
  console.log("Checking tag set composition");
  let composition = call_check_tag_set_composition(array);
  return {
    bad_tag_container: bad_tag_container,
    composition: { composition }
  };
}

module.exports = {
  difference: difference,
  check_array_single: check_array_single,
  reverse_compliment: reverse_compliment,
  extract_from_array: extract_from_array,
  check_tag_set_composition: check_tag_set_composition,
  extract_base: extract_base,
  call_check_tag_set_composition: call_check_tag_set_composition,
  call_check_array: call_check_array,
  concatenate_tags: concatenate_tags,
  run: run
};
