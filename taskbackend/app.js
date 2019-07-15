const express = require("express");
const app = express();
const port = 5000;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

var mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/switchon";

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const cors = require("cors");
app.use(cors());

const router = require("./Components/Users/Users");

app.use("/", router);

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
