import Papa from "papaparse";

const now = () => {
  return typeof window.performance !== "undefined"
    ? window.performance.now()
    : 0;
};

const parseCSV = (path, delimiter) => {
  return new Promise((resolve, reject) => {
    Papa.parse(path, {
      download: true,
      delimiter: delimiter,
      newline: "\n",
      quotes: false,
      fastMode: true,
      skipEmptyLines: true,
      complete: results => {
        resolve(results);
      },
      error: function(err, file, inputElem, reason) {
        console.log("error " + file + " " + reason);
        reject(err);
      }
    });
  });
};

const parseData = (data, re, headers) => {
  return new Promise((resolve, reject) => {
    console.log("calling findHeaders with headers, data", headers, data);
    let rowCols = findHeaders(data, headers);
    console.log("rowCols is : ", rowCols);
    if (rowCols.length === 0) {
      reject("Can't find headers");
    }
    let data1 = data.slice(rowCols[0] + 1, data.len); // cut off everything, headers and above
    console.log(data1);
    let data2 = [];
    let firstColumn = rowCols[1][0];
    let secondColumn = rowCols[1][1];
    for (let i = 0; i < data1.length; i++) {
      let row = data1[i];
      let pair = [row[firstColumn].trim(), row[secondColumn].trim()];
      if (pair[0] !== "" && pair[1] !== "") {
        data2.push(pair);
      }
    }
    console.log("clean tags : ", data2);
    resolve(data2);
  });
};

// Find any cols with headers.
const findHeaders = (data, headers) => {
  for (let row = 0; row < data.length; row++) {
    let cols = checkRow(data[row], headers);
    if (cols.length > 0) {
      return [row, cols]; //return row and col of headers.
    }
  }
};

// Check if a row contains any headers
const checkRow = (row, headers) => {
  let cols = [];
  for (let i = 0; i < row.length; i++) {
    if (headers.includes(row[i])) {
      cols.push(i);
    }
  }
  return cols; // return the position in the row of the headers.
};

export { parseData, parseCSV, now };
