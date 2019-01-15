let fs = require('fs')

function readFile(srcPath) {
    return new Promise((resolve, reject) => {
        fs.readFile(srcPath, (err, data) => {
            if (err) {
                reject("Something went Wrong");
            } else {
                content = String(data)
                content = JSON.parse(content)
                resolve(content)
            }

        })
    })
}

function writeFile(srcPath, data, success) {
    return new Promise((resolve, reject) => {
        fs.writeFile(srcPath, data, (err, cont) => {
            if (err) {
                reject("Error in Writting  the File")
            } else {
                resolve(success)
            }
        })
    })
}

module.exports = {
    readFile,
    writeFile
}