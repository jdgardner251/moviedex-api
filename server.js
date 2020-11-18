require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const helmet = require('helmet')
const cors = require('cors')
const MOVIEDEX = require('./moviedex.json')


const app = express();

app.use(morgan("dev"));
app.use(helmet())
app.use(cors())

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')
    
    if (!authToken || authToken.split(" ")[1] !== apiToken) {
        return res.status(401).json({ error: "Unauthorized request" });
      }
    // move to the next middleware
    next()
})

app.get('/movie', (req, res) => {
    const { genre = "", country = "", avg_vote = "" } = req.query;
    let response = MOVIEDEX;

    // filter movies by genre if genre query param is present
    if (genre) {
        response = response.filter(movie =>
            movie.genre.toLowerCase().includes(genre.toLowerCase()))
    }

    // filter movies by country if country query param is present
    if (country) {
        response = response.filter(movie =>
            movie.country.toLowerCase().includes(country.toLowerCase()) )
    }

    // filter movies by vote if vote param is present
    if (avg_vote) {
        const voteNum = parseFloat(avg_vote);
        response = response.filter(movie => movie.avg_vote >= voteNum)
    }

   res.json(response)
});


app.listen(8000, () => {
  console.log("server listening on 8000");
});
