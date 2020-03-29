const mongoose = require("mongoose");

let registerSchema = new mongoose.Schema({
  "name": String,
  "telephone": String,
  "password": String
});

module.exports = mongoose.model('User',registerSchema);