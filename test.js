// import { promises } from "fs";
// import { fileURLToPath } from "url";
const  {readFile, writeFile} = require("./file")

readFile('./main.json')
.then(data => data)
.then(console.log)
// let movies = [
//   {
//       id: 1,
//       name: 'The Departed'
//   },
//   {
//       id: 2,
//       name: 'The Intern'
//   }
//  ]
//  id=2
//  var updateIndex = movies.map(function(movie){
//   return movie.id;
// }).indexOf((id));
// console.log(updateIndex)

// // function newMoive(movie){
// //   var newid=((movies.length)+1)
// // movies.push({
// //   id:newid,
// //   name:movie
// // })

// // return newMoive
// // }
// // newMoive("F&F")
// // console.log(movies)






// let readFile=new promise(
//     function(resolve,reject){
//         if("api requestto read file"){
//             file.open("w")
//             file.wr
//         }
//     }
// )




function readFile(srcPath) {
    return new Promise(function (resolve, reject) {
                let context = fs.open(srcPath, "r")
                // console.log(context)
                if (context) {
                    let buffer = fs.readFile(context)
                    let content = String(buffer)
                    resolve(content)
                    fs.close(context)
                } else {
                    reject("Something went wrong")
                }
            })
        }