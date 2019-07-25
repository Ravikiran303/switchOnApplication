const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
const Form = require("../../models/Form");

router.post("/user/Register", (req, res) => {
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
      res.status(404).send("alredy Registered");
    }
  });
});
process.env.SECRET_KEY = "secret";
router.post("/user/login", (req, res) => {
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
router.get("/department/:department/users", (req, res) => {
  User.find({ department: req.params.department }).then(responce => {
    res.send(responce);
  });
  var id = mongoose.Types.ObjectId(req.params.id);
});
router.post("/form", (req, res) => {
  const submitedForm = {
    requestedUserID: req.body.requested_userID,
    requestedUserDept: req.body.requestedUserDept,
    req_to_department: req.body.department,
    send_to: req.body.selectedUser,
    message: req.body.Message
  };
  Form.create(submitedForm).then(result => {
    res.send(result);
  });
});
router.get("/users/:id", (req, res) => {
  User.findOne({ userID: req.params.id }).then(responce => {
    res.send(responce);
  });
});

router.get("/users/:id/pending", (req, res) => {
  Form.find({ requestedUserID: req.params.id }).then(responce => {
    res.send(responce);
  });
});
router.get("/users/:department/requests", (req, res) => {
  Form.find({
    status: "PENDING",
    req_to_department: req.params.department
  }).then(responce => {
    res.send(responce);
  });
});
router.put("/forms/:id/accept", (req, res) => {
  Form.updateOne({ _id: req.params.id }, { $set: { status: "ACCEPTED" } }).then(
    responce => {
      res.send(responce);
    }
  );
});
router.put("/forms/:id/reject", (req, res) => {
  Form.updateOne({ _id: req.params.id }, { $set: { status: "REJECTED" } }).then(
    responce => {
      res.send(responce);
    }
  );
});
router.get("/users/:id/acceptedBy", (req, res) => {
  Form.find({ status: "ACCEPTED", requestedUserID: req.params.id }).then(
    responce => {
      res.send(responce);
    }
  );
});
module.exports = router;
