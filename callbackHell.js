const fs = require("node:fs")
const path = require("node:path")
const readline = require("node:readline")

FILEPATHS = [
  "textfiles/in-search-of-lost-time.txt",
  "textfiles/moby-dick.txt",
  "textfiles/ulysses.txt"
]

function callbackHell(){
  debugger
  const [inPath, outPath] = parsePath(FILEPATHS[0])
  fs.readFile(inPath, {encoding: 'utf-8'}, (err, data) => {
    debugger
    if(err) throw err
    fs.writeFile(outPath, data, {encoding: 'utf-8'}, (err) => {
      if(err) throw err
    }) 
  })

}

function parsePath(relativePath){
  const parseObj = path.parse(path.join(__dirname, relativePath))
  debugger
  const inPath = path.join(parseObj.dir, parseObj.base)
  const outPath = path.join(__dirname, "copied", parseObj.base)
}

callbackHell()