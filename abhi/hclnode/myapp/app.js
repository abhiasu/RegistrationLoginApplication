var express = require('express');
var validator = require('express-validator');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var index = require('./routes/index');
var users = require('./routes/users');
var mongoose = require('./middleware/mongooseAdmin');
var cors = require('cors');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator()); // !!!! VERY IMP !!!! this line should be just after bodyParser.urlencoded.
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// var registration = require('./routes/registration');
// app.use('/registration', registration);
app.use(passport.initialize());
app.use(passport.session());

require('./passport/loginStrategy')(passport);

var registrationApi = require('./api_routes/api/v1/registration')(passport);
app.use('/api/v1/auth', registrationApi);
 var profileupdate = require('./api_routes/api/v1/profileupdate');
  app.use('/api_routes/api/v1/profileupdate', profileupdate);

app.use(function (req, res, next) {
  utils.loadUserInfo(req, res, function(data){
    req.userInfo = data.userInfo;
    res.locals.isUserLoggedIn = data.userInfo.isUserLoggedIn;
    next(); // pass control to the next handler
  });
});

  // var profileget = require('./api_routes/api/v1/profileupdate/getuserdata');
  // app.use('/api_routes/api/v1/profileupdate/getuserdata', profileget);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


// error handler
app.use(function (err, req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
