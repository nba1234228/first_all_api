const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/first_all_data");

mongoose.connection.on("connected", function(){
    console.log("MongoDB connected success");
});

mongoose.connection.on("error", function(){
    console.log("MongoDB error fail");
});

mongoose.connection.on("disconnected", function(){
    console.log("MongoDB connected disconnected");
});

module.exports = mongoose;
