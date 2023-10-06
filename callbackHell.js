const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");

const TEXT_PATHS = [
  "textfiles/in-search-of-lost-time.txt",
  "textfiles/moby-dick.txt",
  "textfiles/ulysses.txt",
];

const OUTPUT_PATH = "output/output.txt";

function callbackHell() {

  const [proustPath, melvillePath, joycePath, absOutputPath] = bundlePaths(TEXT_PATHS, OUTPUT_PATH)

  let proustData;
  let melvilleData;
  let joyceData;

  fs.readFile(proustPath, { encoding: "utf-8" }, (err, data) => {
    if (err) throw Error(err.message);
    proustData = data;
    console.log('there')
    fs.readFile(melvillePath, { encoding: "utf-8" }, (err, data) => {
      if (err) throw Error(err.message);
      melvilleData = data;
      fs.readFile(joycePath, { encoding: "utf-8" }, (err, data) => {
        if (err) throw Error(err.message);
        joyceData = data;
        let megaData = [proustData, melvilleData, joyceData].join("");
        fs.writeFile(absOutputPath, '', (err) => {
          if(err) throw Error(err.message)
          let count = 0
          function checkFile(count){
            if(count < 3) return
            fs.readFile(absOutputPath, { encoding: "utf-8" }, (err, data) => {
              if (err) throw Error(err.message);
              if (data === megaData) console.log("Test Passed!");
              else console.log("Lengths do not match!");
            });
          }
          fs.appendFile(absOutputPath, proustData, () => checkFile(++count))
          fs.appendFile(absOutputPath, melvilleData, () => checkFile(++count))
          fs.appendFile(absOutputPath, joyceData, () => checkFile(++count))
        })
      });
    });
  });

  console.log('here')
}

function promisePurgatory(){
  const [proustPath, melvillePath, joycePath, absOutputPath] = bundlePaths(TEXT_PATHS, OUTPUT_PATH)
  let proustData;
  let melvilleData;
  let joyceData;
  let megaData;

  return fs.promises.readFile(proustPath, {encoding: 'utf-8'})
    .then(data => {
      proustData = data
      // return Promise.resolve()
    }).then(() => {
      return fs.promises.readFile(melvillePath, {encoding: 'utf-8'})
    }).then(data => {
      melvilleData = data
    }).then(() => {
      return fs.promises.readFile(joycePath, {encoding: 'utf-8'})
    }).then(data => {
      joyceData = data
    }).then(() => {
      megaData = proustData + melvilleData + joyceData
    }).then(() => {
      return fs.promises.writeFile(absOutputPath, '')
    }).then(() => {
      // this does not write in order
      // return Promise.all([
      //   fs.promises.appendFile(absOutputPath, proustData),
      //   fs.promises.appendFile(absOutputPath, melvilleData),
      //   fs.promises.appendFile(absOutputPath, joyceData)
      // ])

      // You must chain fs.promises.appendFile for sequential writes
      return fs.promises.appendFile(absOutputPath, proustData)
      .then(() => fs.promises.appendFile(absOutputPath, melvilleData))
      .then(() => fs.promises.appendFile(absOutputPath, joyceData))
    }).then(() => {
      return fs.promises.readFile(absOutputPath, {encoding: 'utf-8'})
    }).then((data) => {
      if(data === megaData) console.log('Files Match!')
      else console.log("Lengths do not match!")
    }).catch(err => {
      console.log(err.message)
    })
}


function bundlePaths(textPaths, outputPath){
  const proustPath = getAbsolutePath(textPaths[0]);
  const melvillePath = getAbsolutePath(textPaths[1]);
  const joycePath = getAbsolutePath(textPaths[2]);
  const absOutputPath = getAbsolutePath(outputPath);

  return [proustPath, melvillePath, joycePath, absOutputPath]
}

function getAbsolutePath(relativePath) {
  return path.join(__dirname, relativePath);
}

// callbackHell();
promisePurgatory()
