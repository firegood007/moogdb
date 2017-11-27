/**
 * Created by pc on 2017/10/23.
 */
var express = require('express');
var swig = require('swig');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookies = require('cookies');
var User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
    //接收来自客户端的cookies
    console.log(req.Headers.cookies);
    req.cookies = new cookies(req, res);
    req.userInfo = {
    };
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            User.findById(req.userInfo._id).then(function(userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        } catch(e) {
            next();
        }
    } else {
        next();
    }

});
//设置静态文件
app.use('/public', express.static(__dirname + '/public'));
//设置模板
app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html');
swig.setDefaults({cache: false});
//根据不同功能划分功能
app.use('/admin', require('./routers/admin.js')); //后台
app.use('/api', require('./routers/api')); // api
app.use('/', require('./routers/main')); //前台展示
//数据库连接成功。
mongoose.connect('mongodb://localhost:27018/blog',{useMongoClient:true}, function(err) {
    if(err) {
        console.log('fail');
    } else {
        console.log('sucess');
        app.listen(8081);
    }
});
