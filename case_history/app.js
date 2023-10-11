let express = require('express');
let path = require('path');
let favicon = require('static-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let routes = require('./routes');
let users = require('./routes/users');
let identify = require('./routes/identify');
let register=require('./routes/register');
let accessRecord=require('./routes/accessRecord');
let caseNotes=require('./routes/caseNotes');
let access=require('./routes/access');
let userinfo_change=require('./routes/userinfo_change');
const cors = require('cors');
let app = express();
// 允许跨域资源共享
app.use(cors());
app.use(bodyParser.json())  // 解析json数据
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',require('express-art-template'));
app.set('view engine', 'html');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const secretKey = require("./constant/constant")
const session = require('express-session')
app.use(
    session({
        secret:secretKey.secretKey ,
        resave: false,
        saveUninitialized: true,
    })
)
app.use('/', routes);
app.use('/home',users);
app.use('/home/identify',identify);
app.use('/home/register',register);
app.use('/home/accessRecord',accessRecord);
app.use('/home/caseNotes',caseNotes);
app.use('/home/access',access);
app.use('/home/userinfo_change',userinfo_change);

const fabric = require("./fabric/fabric");
app.use('/e', function (req, res) {
    fabric.EnrollAdmin(function (result) {
        res.json(result);
    }).then((r) => {
        console.log(r)
    });
});
app.use('/r', function (req, res) {
    fabric.RegisterUser(function (result) {
        res.json(result);
    }).then((r) => {
        console.log(r)
    });
});
app.use('/q', function (req, res) {
    let param={
        name:"xxx"
    }
    fabric.Query(param,function (result){
        res.json(result)
    }).then((r)=>{
        console.log(r)
    })
});
app.use('/i', function (req, res) {
    let param={
            name: 'createMedicalHistory',
            id: '33867c5b-487b-4c38-9c7c-9b9ee1acd3da',
            mainSuit: '11111111111111111',
            anamnesis: '111111111111111',
            personalHistory: '111111111111',
            familyHistory: '1111111111111111',
            healthCheckup: '111111111111111111111=',
            auxiliaryExamination: '111111111111111111=',
            westernDiagnostics: '11111111111111111==',
            tcmDiagnosis: '11111111111111==',
            diagnose: '111111111111111111111111111111111=',
            casesOfDetails: '11111111111111111111==',
            medicalDetial: '11111111111111111=='
    }
    fabric.Invoke(param,function (result){
        res.json(result)
    }).then((r)=>{
        console.log(r)
    })
});
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
