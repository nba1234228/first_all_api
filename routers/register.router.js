const express = require('express');
const router = express.Router();
const Registers = require("../models/register.model");

router.post('/', function(req, res, next) {
	Registers.find({telephone: req.body.telephone},function(err, doc){
		if(err){
			res.json({success: "false", msg: err.message});
		} else if(doc.length <= 0) {
			Registers.create({
				name: req.body.name,
				telephone: req.body.telephone,
				password: req.body.password,
			}, function(err, doc){
				if(err){
					res.json({success: "false", msg: err.message});
				} else {
					res.json({success: "true", msg: "register success", result: ""});
				}
			});
		} else {
			res.json({success: "false", msg: "该手机号码已被注册", result: ""});
		}
	});
});

module.exports = router;
