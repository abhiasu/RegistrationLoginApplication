var User = require('../models/appuser');
var Utils = require('../utils/utils');
var encryptor = require('../utils/encryptor');
// var mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');

//var validator = require('../validator/apiValidator');

var jwt = require('jsonwebtoken');

// exports.validateLogin = function(req, res) {
//     validator.validateLogin(req, res);
// }



exports.register = function(req, res, done) {
    // validator.validateRegistration(req, res);
    // var errors = req.validationErrors();
    // if (errors) {
    //     return done({
    //         code: config.http_status.BAD_REQUEST,
    //         message: errors[0].msg
    //     });
    // }
console.log("a2");
    var registerUser = {
        
        email : req.body.email,
        dob: req.body.dob,
        creationDate: new Date(),
        lastModifiedDate: new Date(),
        lastLoginDate: new Date(),

    }
    var kp = new User(registerUser);
console.log("a2"+ JSON.stringify(registerUser)+  req.body.password);
    User.register(new User(registerUser), req.body.password, function(err, user) {
        console.log("a3");
        if (err) {
            if (err.toString().indexOf('UserExistsError:') > -1) {
                return done("An account is already registered with email " + req.body.email, false);
            }

          console.log("Failed to register user with email " + req.body.email + " and error is " + err.toString());
          return done("An error occured proccessing your registration. Please try again", false);
        }

         if (!user) {
          console.log("Failed to get user info after registration with email " + req.body.email + " and error is " + err.toString());
          return done("Please login to proceed.", false);
        }
        console.log("a4");
        res.cookie('authuser_1', Utils.createUserCookieValue(user),
           { maxAge : (172800 * 1000) });
        var resp = {
           
            email : user.email
        };
console.log("a5");
        return done(null, true, resp);
      });
    }


exports.logout = function(req, res, done) {
  res.clearCookie('authuser_1');
  return done();
} // end of export.logout
