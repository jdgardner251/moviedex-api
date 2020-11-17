const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.use((req, res) => {
  res.send("Hello Express");
});

app.listen(8000, () => {
  console.log("server listening on 8000");
});
