const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));
let id = 0;
const defaultRout = "/movies";
let movieArray = [];

function getMovieIndexByID(id) {
  return movieArray.findIndex((movie) => movie.id === parseInt(id));
}

function getMovieByID(id) {
  return movieArray.find((movie) => {
    return movie.id === parseInt(id);
  });
}

app.get(defaultRout, (req, res) => {
  res.send({data: movieArray});
});

app.get(defaultRout + "/:id", (req, res) => {
  res.send(getMovieByID(req.params.id));
});

app.get("", (req,res)=>{
  res.sendFile(__dirname+"/public/main/main.html");
})

app.post(defaultRout, (req, res) => {
  const movie = req.body;
  movie.id = ++id;
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

// app.patch(defaultRout + "/:id", (req, res) => {
//   const id = req.params.id;
//   const movieToEdit = getMovieByID(id);
//   const newMovieInfo = req.body;
//   for (let key in newMovieInfo) {
//     movieToEdit[key] = newMovieInfo[key];
//   }
//   movieToEdit.id = parseInt(id);
//   movieArray[getMovieIndexByID(id)] = movieToEdit;
//   res.send(movieToEdit);
// });

app.patch(defaultRout + "/:id", (req, res) => {
  const movieToEdit = getMovieByID(id);
  const id = req.params.id;
  const movieToUpdateWith ={ ...movieToEdit, ...req.body, id:id}
  movies[movieArray.id]=movieToUpdateWith;
  res.send(movieToUpdateWith);
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

app.listen(8080,()=>{
  console.log("App hasad been started")
});
