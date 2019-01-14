let fs = require('fs')

function readFile(srcPath) {
    return new Promise(function (resolve, reject) {
        let context = fs.openSync(srcPath, "r")
        // console.log(context)
        if (context) {
            let buffer = fs.readFileSync(context)
            let content = String(buffer)
            resolve(content)
            fs.closeSync(context)
        } else {
            reject("Something went wrong")
        }
    })
}

function writeFile(srcPath, data, success) {
    return new Promise(function (resolve, reject) {
        let context = fs.openSync(srcPath, "w")
        if (context) {
            fs.writeFileSync(context, data)
            resolve(success)
            fs.closeSync(context)
        } else {
            reject("something went wrong")
        }
    })
}

module.exports = {
    readFile,
    writeFile
}