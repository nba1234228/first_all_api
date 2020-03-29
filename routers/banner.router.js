const express = require('express');
const router = express.Router();
const Banners = require("../models/banner.model");

router.post('/', function(req, res, next) {
	Banners.find({}, function(err, doc){
		if(err){
			res.json({success: "false", msg: err.message});
		} else {
			res.json({success: "true", msg: "", result: {count: doc.length, list: doc}});
		}
	});
});

module.exports = router;
