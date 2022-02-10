const express = require("express");
const app = express();
app.use(express.json());
let id = 0;
const defaultRout = "/movie";
let movieArray = [];

function generateId() {
  return ++id;
}

function getMovieIndexByID(id){
    return movieArray.findIndex(movie => movie.id ===parseInt(id));
}

app.get(defaultRout, (req, res) => {
  res.send(movieArray);
});

app.get(defaultRout + "/:id", (req, res) => {
  res.send(movieArray.find((movie) => {
    return movie.id === parseInt(req.params.id);
  }));
});

app.post(defaultRout, (req, res) => {
  const movie = req.body;
  movie.id = generateId();
  movieArray.push(movie);
  res.send(movie);
});

app.put(defaultRout + "/:id", (req,res)=>{
    const editedMovie = req.body
    const id = req.params.id;
    editedMovie.id = parseInt(id)
    movieArray[getMovieIndexByID(id)]=editedMovie;

    res.send(req.body)
});

app.patch(defaultRout + "/:id", (req, res) => {
    const editedMovie = req.body;
    const id = req.params.id;
  });

app.delete(defaultRout + "/:id", (req, res) => {
    movieArray = movieArray.filter((movie)=>{ 
        return movie.id !== parseInt(req.params.id);
    });
    res.send("");
});

app.listen(8080);
