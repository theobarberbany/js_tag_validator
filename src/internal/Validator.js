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
  let number_tag_groups = 0;
  if (Array.isArray(array[0])) {
    number_tag_groups = array[0].length;
  } else {
    // assume there's only one tag.
    number_tag_groups = 1;
  }
  console.log(number_tag_groups, "tag groups");
  let bad_tags = 0;
  for (let i = 0; i < number_tag_groups; i++) {
    for (let j = 0; j < array.length; j++) {
      for (let k = j + 1; k < array.length; k++) {
        let diff;
        number_tag_groups = 1
          ? (diff = difference(array[j], array[k]))
          : (diff = difference(array[j][i], array[k][i]));
        // to do  :  dispatch an action to add this to a 'checklist'
        diff < 3 ? bad_tags++ : null;
      }
    }
  }
  console.log(bad_tags, "bad tags");
  return bad_tags;
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
  let number_tag_groups = 0;
  if (Array.isArray(array[0])) {
    number_tag_groups = array[0].length;
  } else {
    number_tag_groups = 1;
  }
  for (let i = 0; i < number_tag_groups; i++) {
    let data = extract_from_array(array, i);
    console.log("calling check_tag_set_composition with data : ", data);
    check_tag_set_composition(data);
  }
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

test = ["TAAGGCGA", "CGTACTAG", "AGGCAGAA"];

console.log(check_tag_set_composition(test));

module.exports = {
  difference: difference,
  check_array: check_array,
  reverse_compliment: reverse_compliment,
  extract_from_array: extract_from_array,
  check_tag_set_composition: check_tag_set_composition,
  extract_base: extract_base,
  call_check_tag_set_composition: call_check_tag_set_composition,
  check_tag_set_composition: check_tag_set_composition
};
