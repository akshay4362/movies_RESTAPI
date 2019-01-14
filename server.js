var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var {
    readFile,
    writeFile
} = require("./file")
app.use(bodyParser.json());
const joi = require('joi');
const schema = joi.object().keys({
    id: joi.number(),
    name: joi.string().min(3)
})

app.get('/api/movies', function (req, res) {
    readFile("./data.json")
        .then(data => data)
        .then(movies => res.send(movies))
        .catch(err => {
            res.status(400).send(err.message);
        })
})

app.get('/api/movies/:id', function (req, res) {
    let ID = parseInt(req.params.id);
    var result = joi.validate({
        id: ID
    }, schema)
    if (result.error === null) {
        readFile("./data.json")
            .then(data => data)
            .then(movies => {
                let parsedMovies = JSON.parse(movies)
                let movieById = parsedMovies.filter(movie => movie.id == ID)
                // console.log(movieById)
                value = movieById.length ? movieById : "Id not found"
                res.send(value)
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
    }, schema)
    if (result.error){
        res.status(400).send("Enter Valid Name")
    }
    readFile("./data.json")
        .then(data => data)
        .then(movies => {
            let parsedMovies = JSON.parse(movies)
            // console.log(parsedMovies)
            let id = Math.floor(Math.random() * (parsedMovies.length + 1234))
            parsedMovies.push({
                id: String(id),
                name: movie
            })
            return JSON.stringify(parsedMovies)
        })
        .then(data => {
            writeFile("./data.json", data, "data added")
                .then(data => res.send(data))
                .catch(err => res.status(400).send(err.message))
        })
        .catch(err => {
            res.status(404).send(err.message);
        })
})
app.put('/api/movies/:id', function (req, res) {
    let id = parseInt(req.params.id)
    // console.log(typeof id)
    let name = req.body.name;
    var result = joi.validate({
        id: id,
        name: name
    }, schema)

    if (result.error === null) {
        readFile("./data.json")
            .then(data => data)
            .then(movies => {
                let parsedMovies = JSON.parse(movies)
                let idExist = parsedMovies.filter(movie => movie.id == id)
                //   console.log(idExist)
                if (idExist.length > 0) {
                    let mappedMovies = parsedMovies.map(movie => {
                        if (movie.id == id) {
                            // console.log(typeof movie.id)
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
                    writeFile("./data.json", data, "movie name updated")
                        .then(data => res.send(data))
                        .catch(err => res.status(400).send(err.message))

                } else {
                    res.status(404).send("Data with given id not found");
                }
            })
            .catch(err => {
                res.status(404).send(err.message);
            })
    } else {
        res.status(400).send("Enter a Valid Id and Name")
    }
})
app.delete('/api/movies/:id', function (req, res) {
    let id = req.params.id;
    var result = joi.validate({
        id: id
    }, schema)
    if (result.error === null) {
        readFile("./data.json")
            .then(data => data)
            .then(movies => {
                let parsedMovies = JSON.parse(movies)
                let filteredMovies = parsedMovies.filter(movie => movie.id != id)
                // console.log(filteredMovies)
                return JSON.stringify(filteredMovies)
            })
            .then(data => {
                writeFile("./data.json", data, `movie with id ${id} got deleted`)
                    .then(data => res.send(data))
                    .catch(err => res.status(404).send(err.message))
            })
    } else {
        res.status(400).send("Enter Valid Id")
    }
})
app.listen(3001, () => console.log("server started "))