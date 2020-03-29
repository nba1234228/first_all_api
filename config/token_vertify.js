var jwt = require('jsonwebtoken');
var signkey = 'secret';

exports.setToken = function(username,password){
	return new Promise((resolve,reject)=>{
		const token = jwt.sign({
			telephone:username,
			psd:password
		}, signkey, { expiresIn: '0.1h' });
		resolve(token);
	})
}

exports.verToken = function(token){
	return new Promise((resolve,reject)=>{
		var info = jwt.verify(token, signkey);
		// console.log('info', info);
		resolve(info);
	})
}