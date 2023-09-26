const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");

TEXT_PATHS = [
  "textfiles/in-search-of-lost-time.txt",
  "textfiles/moby-dick.txt",
  "textfiles/ulysses.txt",
];

OUTPUT_PATH = "output/output.txt";

function callbackHell() {
  const proustPath = getAbsolutePath(TEXT_PATHS[0]);
  const melvillePath = getAbsolutePath(TEXT_PATHS[1]);
  const joycePath = getAbsolutePath(TEXT_PATHS[2]);
  const absOutputPath = getAbsolutePath(OUTPUT_PATH);
  debugger;

  let proustData;
  let melvilleData;
  let joyceData;
  let megaDataLength = 0;

  fs.readFile(proustPath, { encoding: "utf-8" }, (err, data) => {
    if (err) throw Error(err.message);
    proustData = data;
    fs.readFile(melvillePath, { encoding: "utf-8" }, (err, data) => {
      if (err) throw Error(err.message);
      melvilleData = data;
      fs.readFile(joycePath, { encoding: "utf-8" }, (err, data) => {
        if (err) throw Error(err.message);
        joyceData = data;
        let megaData = [proustData, melvilleData, joyceData].join("\n");
        megaDataLength = megaData.length;
        debugger;
        // megaData.split(/\n/).length = 157918
        fs.writeFile(absOutputPath, megaData, (err) => {
          if (err) throw Error(err.message);
          fs.readFile(absOutputPath, { encoding: "utf-8" }, (err, data) => {
            if (err) throw Error(err.message);
            if ((data.length = megaDataLength)) console.log("Lengths Match!");
            else console.log("Lengths do not match!");
          });
        });
      });
    });
  });
}

function getAbsolutePath(relativePath) {
  return path.join(__dirname, relativePath);
}

callbackHell();
