var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var {
    readFile,
    writeFile
} = require("./file")
app.use(bodyParser.json());
const joi = require('joi');
const idSchema = joi.object().keys({
    id: joi.number()
})
const nameSchema = joi.object().keys({
    name: joi.string().min(3)
})
const schema = joi.object().keys({
    id: joi.number(),
    name: joi.string().min(3)
})

app.get('/api/movies', function (req, res) {
    readFile("./data.json")
        .then(movies => {
            if (movies.length > 0) {
                res.send(movies)
            } else {
                throw new Error("Movies not Found")
            }
        })
        .catch(err => {
            //console.log(err)
            res.status(404).send(err.message);
        })
})

app.get('/api/movies/:id', function (req, res) {
    let movieId = parseInt(req.params.id);
    var result = joi.validate({
        id: movieId
    }, idSchema)
    if (result.error === null) {
        readFile("./data.json")
            .then(movies => {
                let movieById = movies.filter(movie => movie.id == movieId)
                if (movieById.length > 0) {
                    res.send(movieById)
                } else {
                    throw new Error("id not found")
                }
                // movie = movieById.length ? movieById : "Id not found"
            })
            .catch(err => {
                res.status(404).send(err.message);
            })
    } else {
        res.status(400).send("Entered ID is Incorrect")
    }
})

app.post('/api/movies', function (req, res) {
    let movie = req.body.name;
    var result = joi.validate({
        name: movie
    }, nameSchema)
    if (result.error) {
        res.status(400).send("Enter Valid Name")
    }
    readFile("./data.json")
        .then(movies => {
            let id = Math.floor(Math.random() * (movies.length + 1234))
            movies.push({
                id: String(id),
                name: movie
            })
            return JSON.stringify(movies)
        })
        .then(data => {
            return writeFile("./data.json", data, "data added")
            //.catch(err => res.status(404).send(err.message))
        })
        .then(data => res.send(data))
        .catch(err => {
            res.status(404).send(err.message);
        })
})
app.put('/api/movies/:id', function (req, res) {
    let movieId = parseInt(req.params.id)
    let name = req.body.name;
    var result = joi.validate({
        id: movieId,
        name: name
    }, schema)

    if (result.error === null) {
        readFile("./data.json")
            .then(movies => {
                let idExist = movies.filter(movie => movie.id == movieId)
                //   console.log(idExist)
                if (idExist.length > 0) {
                    let mappedMovies = movies.map(movie => {
                        if (movie.id == movieId) {
                            return { ...movie,
                                name: name
                            }
                        } else {
                            return movie
                        }
                    })
                    return JSON.stringify(mappedMovies)

                } else {
                    return null
                }
            })
            .then(data => {
                if (data) {
                    return writeFile("./data.json", data, "movie name updated")
                    // .catch(err => res.status(400).send(err.message))
                } else {
                    res.status(404).send("Data with given id not found");
                }
            })
            .then(data => res.send(data))
            .catch(err => {
                res.status(404).send(err.message);
            })
    } else {
        res.status(400).send("Enter a Valid Id and Name")
    }
})
app.delete('/api/movies/:id', function (req, res) {
    let movieId = req.params.id;
    var result = joi.validate({
        id: movieId
    }, idSchema)
    if (result.error) {
        res.status(400).send("Enter Valid id")
    }
    readFile("./data.json")
        .then(movies => {
            let len = movies.length;
            let filteredMovies = movies.filter(movie => movie.id != movieId)
            return Promise.resolve({
                data: filteredMovies,
                size: len
            })
        })
        .then(data => {
            console.log(data)
            if (data.data.length == data.size) {
                res.send("Id does not exist")
            } else {
                writeFile("./data.json", JSON.stringify(data.data), `movie with id ${movieId} got deleted`)
                    .then(data => res.send(data))
                    .catch(err => res.send(err))
            }
        })
        .catch(err => res.status(404).send(err.message))
})
app.listen(3001, () => console.log("server started "))