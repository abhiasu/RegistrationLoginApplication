
var User = require('../models/appuser');

var jwt = require('jsonwebtoken');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            done(null, user);
        });

        // passport.serializeUser(User.serializeUser());
        //passport.deserializeUser(User.deserializeUser());

        passport.use('local', new LocalStrategy({
                usernameField: 'email',
                usernameQueryFields: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            function(req, email, password, done) {
                User.authenticate()(email, password, function(err, user) {
                  var email = user.email;
                    if (err) return done(err);
                    if (!user) {
                        User.findOne({email : email, is_migrated : true}, function(err, migratedUser){
                          console.log("migrated user found");
                          if(err || !migratedUser){
                            return done(null, false, {
                                code: 400,
                                message: 'Invalid email or password.'
                            });
                          }else{
                            return done(null, true, {
                                is_migrated : true
                            });
                          }
                        });
                    }else{
                    User.update({ email : user.email
                        }, {
                            $set: {lastLoginDate: new Date()}
                          }, function(err, doc){
                            console.log(err);

                          });

                    return done(null, true, user);
                  }

                });

            })
          ); // end of passport use


    } // end of module exports
