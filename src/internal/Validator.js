// See https://github.com/theobarberbany/tag_validator

// Actually taken *from* stack overflow's website...
//Try "string".formatUnicorn in console when on their website..
String.prototype.formatUnicorn = function() {
  var e = this.toString();
  if (!arguments.length) return e;
  var t = typeof arguments[0],
    n =
      "string" == t || "number" == t
        ? Array.prototype.slice.call(arguments)
        : arguments[0];
  for (var i in n) e = e.replace(new RegExp("\\{" + i + "\\}", "gi"), n[i]);
  return e;
};

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
    let concatenated = concatenate_tags(array);
    console.log(
      "calling check_array_single with concatenated data : ",
      concatenated
    );
  }
  return output;
}

function check_array(array, number_tag_groups) {
  let bad_tags = 0;
  for (let i = 0; i < array.length; i++) {
    let diff = difference(array[i][0], array[i][1]);
    //console.log("Comparing", array[i][0], "to", array[i][1]);
    // to do  :  dispatch an action to add this to a 'checklist'
    diff < 3 ? console.log("Above tag bad!") : null;
    diff < 3 ? bad_tags++ : null;
  }
  return bad_tags;
}

function check_array_single(array) {
  let bad_tags = 0;
  for (let j = 0; j < array.length; j++) {
    for (let k = j + 1; k < array.length; k++) {
      let diff = difference(array[j], array[k]);
      // (diff = difference(array[j][i], array[k][i]));
      console.log("Comparing", array[j], "to", array[k]);
      // to do  :  dispatch an action to add this to a 'checklist'
      diff < 3 ? bad_tags++ : null;
    }
  }
  console.log(bad_tags, "bad tags");
  return bad_tags;
}

function concatenate_tags(array) {
  let concatenated = [];
  for (let i = 0; i < array.length; i++) {
    concatenated.push(
      "{tag1}{tag2}".formatUnicorn({ tag1: array[i][0], tag2: array[i][1] })
    );
  }
  return concatenated;
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
  let proportions = {};

  for (let i = 0; i < tag_length; i++) {
    proportions["Col" + i] = [0, 0, 0, 0]; // A,T,C,G
  }
  for (let i = 0; i < array.length; i++) {
    //For each tag in the array
    for (let j = 0; j < tag_length; j++) {
      // For each base in each tag use a lookup table to increment values
      proportions["Col" + j][universe.indexOf(array[i][j])] += 1;
    }
  }
  return proportions;
}

function run(array) {
  //Function to tie everything together
  console.log("Checking tags differ by at least 3");
  let bad_tags = call_check_array(array);
  console.log("Found ", bad_tags, "bad tags");
  console.log("Checking tag set composition");
  let composotion = call_check_tag_set_composition(array);
  console.log(composotion);
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
