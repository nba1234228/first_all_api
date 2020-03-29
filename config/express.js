const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const vertoken = require('./token_vertify');
const expressJwt = require('express-jwt');
const logger = require('morgan');
const ENV = process.env.NODE_ENV;
const registerRouter = require('../routers/register.router');
const loginRouter = require('../routers/login.router');
const bannerRouter = require('../routers/banner.router');
const userRouter = require('../routers/user.router');

module.exports  =function(){
    console.log('init expesss...');
    const app = express();

    app.all('*', function(req, res, next){
    	res.header('Access-Control-Allow-Origin', req.headers.origin);
    	res.header('Access-Control-Allow-Credentials', 'true');
    	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild, Access-Token, token');
    	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    	if (req.method === 'OPTIONS'){
    		res.sendStatus(200);
    	}
    	else{
    		next();
    	}
    });

    // 解析token获取用户信息
    app.use(function(req, res, next) {
        var token = req.headers['authorization'];
        // console.log('authorization', token);
        if(token === undefined){
            return next();
        }else{
            vertoken.verToken(token).then((data)=> {
                console.log('data', data);
                req.data = data;
                return next();
            }).catch((error)=>{
                return next();
            })
        }
    });

    //验证token是否过期并规定哪些路由不用验证
    // app.use(expressJwt({
    // 	secret: 'yousecret'
    // }).unless({
    // 	path: ['/login', '/banners', '/register']
    // }));

    if(ENV != 'production'){
        app.use(logger('dev'));
    }else{
        const logFileName = path.join(path.resolve(__dirname, '..'), 'logs' , 'access.log');
        const writeStream = fs.createWriteStream(logFileName,{flags: 'a'});
        app.use(logger('combined'),{stream: writeStream});
    }
    app.use(bodyParser.json());
    app.use(express.static(path.join(path.resolve(__dirname, '..'), 'public')));
    app.use('/register', registerRouter);
    app.use('/login', loginRouter);
    app.use('/banners', bannerRouter);
    app.use('/users', userRouter);

    // 处理所有未知的请求
    app.use(function(req, res, next){
        res.status(404);
        try {
            return res.json('Not Found');
        } catch(e) {
            console.error('404 set header after sent');
        }
    });

    // 统一处理出错的情况
    app.use(function(err, req, res, next){
        if(!err) {
            return next()
        }
        if (err.status == 401) {
            return res.status(401).send('token失效');
        }
        res.status(500);
        try {
            return res.json(err.message || 'server error');
        } catch(e) {
            console.error('500 set header after sent');
        }
    });

    return app;
};