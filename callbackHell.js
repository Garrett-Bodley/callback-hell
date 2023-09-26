const fs = require("node:fs")
const path = require("node:path")
const readline = require("node:readline")

FILEPATHS = [
  "textfiles/in-search-of-lost-time.txt",
  "textfiles/moby-dick.txt",
  "textfiles/ulysses.txt"
]

function callbackHell(){
  const [inPath, outPath] = parsePath(FILEPATHS[0])
  fs.readFile(inPath, {encoding: 'utf-8'}, (err, data) => {
    if(err) throw err
    data.split(/\n/).forEach(line => {
      console.log(`Line to append:\n${line}`)
      fs.appendFile(outPath, `${line}\n`, {encoding: 'utf-8'}, (err) => {
        if(err) throw err
        console.log(`New line appended to ${outPath}`)
      }) 
    })
  })

}

function parsePath(relativePath){
  const parseObj = path.parse(path.join(__dirname, relativePath))
  const inPath = path.join(parseObj.dir, parseObj.base)
  const outPath = path.join(__dirname, "copied", parseObj.base)
  return [inPath, outPath]
}

callbackHell()