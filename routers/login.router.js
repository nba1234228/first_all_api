const express = require('express');
const router = express.Router();
const Logins = require("../models/register.model");
const settoken = require('../config/token_vertify');

router.post('/', function(req, res, next) {
	Logins.find({telephone: req.body.telephone,password: req.body.password},function(err, doc){
		if(err){
			res.json({success: "false", msg: err.message});
		} else if(doc.length <= 0){
			res.json({success: "false", msg: "账号或密码不对", result: ""});
		} else {
			settoken.setToken(req.body.telephone,req.body.password).then((data)=>{
				return res.json({success: "true", msg: "登陆成功", result:{token: data,phone: req.body.telephone}});
			})
		}
	});
});

module.exports = router;
