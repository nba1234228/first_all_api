const mongoose = require("mongoose");

let bannerSchema = new mongoose.Schema({
  "imageId":{type:Number},
  "imageUrl":String
});

module.exports = mongoose.model('Banner',bannerSchema);