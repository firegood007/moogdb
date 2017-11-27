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
    //�������Կͻ��˵�cookies
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
//���þ�̬�ļ�
app.use('/public', express.static(__dirname + '/public'));
//����ģ��
app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html');
swig.setDefaults({cache: false});
//���ݲ�ͬ���ܻ��ֹ���
app.use('/admin', require('./routers/admin.js')); //��̨
app.use('/api', require('./routers/api')); // api
app.use('/', require('./routers/main')); //ǰ̨չʾ
//���ݿ����ӳɹ���
mongoose.connect('mongodb://localhost:27018/blog',{useMongoClient:true}, function(err) {
    if(err) {
        console.log('fail');
    } else {
        console.log('sucess');
        app.listen(8081);
    }
});
