const express = require("express");
const app = express();
app.use(express.json());
let id = 0;
const defultRout = "/movie";
const movieArray = [];

function generateId() {
  return ++id;
}

function getMovieByID(id) {
  return movieArray.find((movie) => {
    return movie.id === parseInt(id);
  });
}

app.get(defultRout, (req, res) => {
  res.send(movieArray);
});

app.get(defultRout + "/:id", (req, res) => {
    const movie = getMovieByID(req.params.id);
  res.send(getMovieByID(req.params.id))
});

app.post(defultRout, (req, res) => {
  const movie = req.body;
  movie.id = generateId();
  movieArray.push(movie);
  res.send(movie);
});

app.delete(defultRout + "/:id", (req, res) => {
    const index = getMovieByID
});

app.listen(8080);
