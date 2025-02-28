const express = require("express");
const mdb = require("mongoose");
const dotenv=require('dotenv')
const app = express();
const PORT = 3001;
dotenv.config()
mdb
  .connect("mongodb://localhost:27017/Meme-App")
  .then(() => {
    console.log("MBD sucess");
  })
  .catch((err) => {
    console.log("cheack you string", err);
  });

app.get("/", (req, res) => {
  res.send("<h1>welcome back<h1>");
});

app.listen(PORT, () => console.log("server started successfully"));