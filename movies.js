var movies = require('./data')

function getMovies() {
    let movie = movies.map(movie => movie.name)
    if (movies.length > 0) {
        return movie;
    } else {
        throw new Error("No Movies");
    }
}

function getMoviesById(id) {
    let movieById = movies.filter(movie => movie.id == id)
    if (movieById.length) {
        return movieById;
    } else {
        throw new Error("Id Not Found");
    }
}

function insertNewMovie(movie) {
    var newid = ((movies.length) + 1)
    movies.push({
        id: newid,
        name: movie
    })
    return movies
}

function newUpdated(id, movie) {
    var index = movies.map(function (movie) {
        return movie.id;
    }).indexOf(parseInt(id))
    console.log(index)
    if (index !== -1) {
        movies[index].name = movie
        return movies
    } else {
        throw new Error("Id not Exisited");
    }
}

function removeMovie(id) {
    var index = movies.map(function (movie) {
        return movie.id;
    }).indexOf(parseInt(id)); //Gets us the index of movie with given id.

    if (index === -1) {

        throw new Error("Id Not Existed ");
    } else {
        movies.splice(index, 1);
        return movies
    }
}
module.exports = {
    getMovies,
    getMoviesById,
    insertNewMovie,
    newUpdated,
    removeMovie
};