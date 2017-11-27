/**
 * Created by pc on 2017/10/23.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user');

var resData = {};
router.use(function(req, res, next) {
     resData = {
        code: 0,
        message: ''
    };
    next();
});
router.post('/user/register', function(req, res, next) {
   var data = req.body;
    if (data.username === '') {
        resData.code = 1;
        resData.message = '用户名不能为空';
        res.json(resData);
        return;
    }
    if (data.password === '') {
        resData.code = 2;
        resData.message = '密码不能为空';
        res.json(resData);
        return;
    }
    if (data.repassword === '') {
        resData.code = 3;
        resData.message = '两次密码不一致';
        res.json(resData);
        return;
    }
    User.findOne({
        username: data.username
    }).then(function(userInfo) {
        console.log(userInfo);
        if (userInfo) {
            resData.code = 4;
            resData.message = '用户名已被注册';
            res.json(resData);
            return;
        }
        var user = new User({
            username: data.username,
            password: data.password
        });
        return user.save();
    }).then(function(userInfo) {
        if (userInfo) {
            console.log(userInfo);
            resData.message = '注册成功';
            res.json(resData);
        }
    });

});
router.post('/user/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (username === '' && password === '') {
        resData.code = 1;
        resData.message = '用户名后者密码不能为空';
        res.json(resData);
        return;
    }
    User.findOne({
        username: username,
        password: password
    }).then(function(userInfo) {
        if (!userInfo) {
            resData.code = 2;
            resData.message = '用户名或者密码错误';
            res.json(resData);
            return;
        }
        resData.message = '登录成功';
        resData.userInfo = {
            _id: userInfo._id,
            username: userInfo.username
        }
        req.cookies.set('userInfo', JSON.stringify({
            _id: userInfo._id,
            username: userInfo.username
        }));
        res.json(resData);
        return;
    });
});
router.get('/user/logout', function(req, res) {
    req.cookies.set('userInfo', null);
    res.json(resData);
    return;
});
module.exports = router;