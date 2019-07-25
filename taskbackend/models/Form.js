const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Form_Schema = new Schema({
  requestedUserID: { type: String, required: true },
  requestedUserDept: { type: String, required: true },
  req_to_department: { type: String, required: true },
  send_to: { type: String, required: true },
  message: { type: String, required: true },
  status: { default: "PENDING", type: String }
});
module.exports = Form = mongoose.model("Form", Form_Schema, "Form_Collection");
