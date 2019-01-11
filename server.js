var express = require('express')
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());
const joi = require('joi');
const schema = joi.object().keys({
    id: joi.number(),
    name: joi.string().alphanum().min(3).max(20)
})
var {
    getMovies,
    getMoviesById,
    insertNewMovie,
    newUpdated,
    removeMovie
} = require('./movies')
app.get('/api/movies', function (req, res) {

    try {
        const movies = getMovies()
        res.send(movies)
    } catch (err) {
        res.status(400).send(err.message);
    }
})

app.get('/api/movies/:id', function (req, res) {
    let ID = parseInt(req.params.id);
    var result = joi.validate({
        id: ID
    }, schema)
    console.log(result)
    if (result.error === null) {
        try {
            res.send(getMoviesById(ID))

        } catch (err) {
            res.status(404).send(err.message);
        }
    } else {
        res.send("Entered ID is Incorrect")
    }
})
app.post('/api/movies', function (req, res) {
    let movie = req.body.name;
    var result = joi.validate({
        name: movie
    }, schema)
    if (result.error === null) {
        try {
            res.send(insertNewMovie(movie))
        } catch (err) {
            res.status(404).send(err.message);
        }
    } else {
        res.send("Enter Valid Name")
    }
})
app.put('/api/movies/:id', function (req, res) {
    let id = parseInt(req.params.id)
    let movie = req.body.name;
    var result = joi.validate({
        id: id,
        name: movie
    }, schema)
    console.log(result)
    if (result.error === null) {
        try {
            res.send(newUpdated(id, movie))
        } catch (err) {
            res.status(404).send(err.message);
        }
    } else {
        res.send("Enter a Valid Id and Name")
    }
})
app.delete('/api/movies/:id', function (req, res) {
    let id = req.params.id;
    var result = joi.validate({
        id: id
    }, schema)
    if (result.error === null) {
        try {
            res.send(removeMovie(id))
        } catch (err) {
            console.log(err)
            res.status(404).send(err.message);
        }
    } else {
        res.send("Enter Valid Id")
    }
})
app.listen(3001, () => console.log("server started "))