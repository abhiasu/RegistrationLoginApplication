var express = require('express');
var User = require('../../../models/appuser');
var cors = require('cors');
var app = express();
app.use(cors());
var auth = require('../../../controllers/auth');
var Utils = require('../../../utils/utils');
var router = express.Router();

module.exports = function (passport) {

    router.route('/login').post(function (req, res, next) {
        auth.validateLogin(req, res);
        var errors = req.validationErrors();
        if (errors) {
            res.send(400, "Error processing request. " + errors[0].msg);
            return;
        }

        var loginResponse = {};
        passport.authenticate('local',
            function (err, success, user) {
                if (err) {
                    logger.error(new Error("error authenticating user error is " + err.message));
                    code = 500;
                    loginResponse.message = "Error processing request. " + err.message;
                } else if (!success) {
                    code = 400;
                    loginResponse.message = "Invalid username or password.";
                    res.send(code, loginResponse);
                } else {
                                       
                    res.cookie('authuser_1', Utils.createUserCookieValue(user),
                        { maxAge: (172800 * 1000) });
                    var resp = {
                        email: user.email,
                        dob: user.dob
                    };
                    code = 200;

                }
                res.send(code, resp);
            }
        )(req, res, next);
    });

    router.route('/logout').post(function(req, res, next) {
        auth.logout(req, res, function(err, success, resp) {
          res.status(200).send({});
        });
    }); // end of post func

    router.route('/register').post(function (req, res, next) {
        var registerResponse = {};
        auth.register(req, res, function (err, success, resp) {
            if (err) {
                registerResponse.message = err;
                code = 400
            } else {
                registerResponse = resp;
                code = 200;
            }
            console.log("a67");
            res.send(code, registerResponse);
        });
    }); // end of post func
   

    return router;
} // end of module exports
