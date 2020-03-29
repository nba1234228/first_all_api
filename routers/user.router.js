const express = require('express');
const router = express.Router();
const Users = require("../models/register.model");

router.post('/', function(req, res, next) {
	Users.findOne({telephone: req.body.telephone},function(err, doc){
		if(err){
			res.json({success: "false", msg: err.message});
		} else {
			res.json({success: "true", msg: "", result: doc});
		}
	});
});

module.exports = router;
