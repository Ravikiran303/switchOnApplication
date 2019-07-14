const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User_Schema = new Schema({
  userID: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  department: { type: String, required: true }
});
module.exports = User = mongoose.model("Users", User_Schema, "Users");
