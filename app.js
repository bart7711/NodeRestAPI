const express = require("express");
const app = express();
app.use(express.json());
let id = 0;
const defaultRout = "/movie";
let movieArray = [];

function generateId() {
  return ++id;
}

function getMovieIndexByID(id) {
  return movieArray.findIndex((movie) => movie.id === parseInt(id));
}

function getMovieByID(id) {
  return movieArray.find((movie) => {
    return movie.id === parseInt(id);
  });
}

app.get(defaultRout, (req, res) => {
  res.send(movieArray);
});

app.get(defaultRout + "/:id", (req, res) => {
  res.send(getMovieByID(req.params.id));
});

app.post(defaultRout, (req, res) => {
  const movie = req.body;
  movie.id = generateId();
  movieArray.push(movie);
  res.send(movie);
});

app.put(defaultRout + "/:id", (req, res) => {
  const editedMovie = req.body;
  const id = req.params.id;
  editedMovie.id = parseInt(id);
  movieArray[getMovieIndexByID(id)] = editedMovie;
  res.send(editedMovie);
});

app.patch(defaultRout + "/:id", (req, res) => {
  const id = req.params.id;
  const movieToEdit = getMovieByID(id);
  const newMovieInfo = req.body;
  for (let key in newMovieInfo) {
    movieToEdit[key] = newMovieInfo[key];
  }
  movieToEdit.id = parseInt(id);
  movieArray[getMovieIndexByID(id)] = movieToEdit;
  res.send(movieToEdit);
});

app.delete(defaultRout + "/:id", (req, res) => {
  //Maybe there is a better way that will allow
  //me to create the movie array intself with const not let...
  movieArray = movieArray.filter((movie) => {
    return movie.id !== parseInt(req.params.id);
  });
  res.send("");
});

//This works. Allows me to delete by id while keeping movieArray as const
//There are some bugs though. For example deleting with id that doesn't exist
//Will delete the last object from array.
//TODO: Fix it with some coditional checks before it deletes anything.

// app.delete(defaultRout + "/:id", (req, res) => {
//     movieArray.splice(getMovieIndexByID(req.params.id), 1)
//     res.send("");
// });

app.listen(8080);
