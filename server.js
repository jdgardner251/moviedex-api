require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const MOVIEDEX = require('./moviedex.json')


const app = express();

app.use(morgan("dev"));

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')
    
    if (!authToken || authToken.split(" ")[1] !== apiToken) {
        return res.status(401).json({ error: "Unauthorized request" });
      }
    // move to the next middleware
    next()
})

function handleGetMovie(req, res) {
    res.send(MOVIEDEX)
}

app.get('/movie', handleGetMovie)

app.listen(8000, () => {
  console.log("server listening on 8000");
});
