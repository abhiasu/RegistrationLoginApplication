var express = require('express');
var jwt = require('jsonwebtoken');
var User = require('../../../models/appuser');
var cors = require('cors');

var app = express();
app.use(cors());
var auth = require('../../../controllers/auth');
var Utils = require('../../../utils/utils');
var router = express.Router();

var encryptor = require('../../../utils/encryptor');


module.exports = function(passport) {
                // For this to work:
        // TURN 'ON' the lesser secure settings at :: https://www.google.com/settings/u/3/security/lesssecureapps
        console.log("aabhi--------------------------");
        router.route('/login').post(function(req, res, next) {
            // auth.validateLogin(req, res);
            // var errors = req.validationErrors();
            // if (errors) {
            //     res.send(config.http_status.BAD_REQUEST, "Error processing request. " + errors[0].msg);
            //     return;
            // }

            var loginResponse = {};
            passport.authenticate('local',
                function(err, success, user) {
                    if (err) {
                        logger.error(new Error("error authenticating user error is " + err.message));
                        code = 500;
                        loginResponse.message = "Error processing request. " + err.message;
                    } else if (!success) {
                        code = 400;
                        loginResponse.message = "Invalid username or password.";
                        res.send(code, loginResponse);
                    } else {
                      if(user.is_migrated){
                        loginResponse.sendToResetPage = true;
                        loginResponse.email = req.body.email;
                        return res.send(200, loginResponse);
                      }
                      // if(!user.isActive){
                      //   code = 400;
                      //   loginResponse.message = "Your account is deactivated. Please contact adminstrator.";
                      //   return res.send(200, loginResponse);
                      // }
                      console.log("abhi------------------------");
                      res.cookie('authuser_1', Utils.createUserCookieValue(user),
                         { maxAge : (172800 * 1000) });
                      var resp = {
                          email: user.email
                      };
                      code = 200;
                      console.log("abhi------------------1------");

                    }
                    res.send(code, resp);
                }
            )(req, res, next);
        });

        // router.route('/logout').post(function(req, res, next) {
        //     auth.logout(req, res, function(err, success, resp) {
        //       res.status(config.http_status.OK).send({});
        //     });
        // }); // end of post func

        router.route('/register').post(function(req, res, next) {
        	console.log("a1");

            var registerResponse = {};
            auth.register(req, res, function(err, success, resp) {
                if (err) {
                    registerResponse.message = err;
                    code = 400
                } else {
                    registerResponse = resp;
                    code =200;
                }
                console.log("a67");
                res.send(code, registerResponse);
            });
        }); // end of post func

         
        return router;
    } // end of module exports
