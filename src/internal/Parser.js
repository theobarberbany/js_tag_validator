import Papa from "papaparse";

//todo: Wrap this export in a promise? So the actual promise constructor is not required to be defined at every use
const parseData = (path, delimiter, callback) => {
  Papa.parse(path, {
    download: true,
    delimiter: delimiter,
    newline: "\n",
    quotes: false,
    fastMode: true,
    skipEmptyLines: true,
    complete: callback
  });
};

const now = () => {
  return typeof window.performance !== "undefined"
    ? window.performance.now()
    : 0;
};

const parseData2 = (path, delimiter) => {
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

export { parseData, parseData2, now };
