const express = require("express");
const app = express();
app.use(express.json());
let id = 0;
const movieArray = [];

function generateId(){
    return ++id;
}