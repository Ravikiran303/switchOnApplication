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

const User = require("./models/User");

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/user/Register", (req, res) => {
  const details = {
    userID: req.body.userID,
    password: req.body.password,
    userName: req.body.userName,
    department: req.body.department
  };
  User.findOne({ userID: req.body.userID }).then(newuser => {
    if (!newuser) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        details.password = hash;
        User.create(details)
          .then(newuser => {
            res.json({ status: newuser.userID + " registered" });
          })
          .catch(err => {
            res.send(err);
          });
      });
    } else {
      res.json({ error: err });
    }
  });
});
process.env.SECRET_KEY = "secret";
app.post("/user/login", (req, res) => {
  User.findOne({
    userID: req.body.userID
  })
    .then(user => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const payload = {
          _id: user._id,
          userID: user.userID
        };
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 3220
        });
        res.send({ auth_token: token });
      } else {
        res.status(401).json({ error: "User does not exist" });
      }
    })
    .catch(err => {
      res.status(404).send("error" + err);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
