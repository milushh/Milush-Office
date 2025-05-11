const { Schema, model } = require("mongoose");

const User = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
  roles: [{type: String, ref: "Role"}]
});

module.exports = model("User", User);
