
var HTTPClient = require('httpclient');
var encryptor = require('../utils/encryptor');
var jwt = require('jsonwebtoken');


exports.getHttpClient = function(method, body) {
  if(!method){
    method = 'GET';
  }

    var options = {
    host: { HOST : 'localhost', PORT : 3000 },
    path: '/',
    port: { HOST : 'localhost', PORT : 3000 },
    secure: false,
    method: method,
    "content-type": 'application/json',
  }

  if(body){
    options.body = body;
  }
  return new HTTPClient(options);

}


exports.generateToken = function(email, secret, expirationInSecs) {

    var token = jwt.sign({
        email: email
    }, secret, {
        expiresIn: expirationInSecs
    });
    return token

}
exports.loadUserInfo = function(req, res, done) {

  var userCookie = 'authuser_1';
  var userDataEncrypted = req.cookies[userCookie];
  var userData = encryptor.decrypt(userDataEncrypted);
  var authToken = '';
  if(userData && userData.token){
    authToken = userData.token;
  }else{
    if(req.headers && req.headers.authorization){
      var parts = req.headers.authorization.split(' ');
      if(parts && parts.length ==2)
      {   var scheme = parts[0],
          credentials = parts[1];
          if (/^Bearer$/i.test(scheme)) {
            authToken = credentials;
          }
      }
    }
  }
  if(!authToken){
    return done({userInfo :{
                  isUserLoggedIn : false
                }
              });
  }
  var decodedValue = jwt.verify(authToken, 'laboratoryoftechnoicalexperiemntsandinnovation');
  if(decodedValue){
    return done({"userInfo": {
      isUserLoggedIn : true,

    }});

  }

  res.clearCookie('authuser_1');
  return done({userInfo :{
                isUserLoggedIn : false
                }
            });

}

exports.createUserCookieValue = function(user){
  console.log("a75");
  var token = exports.generateToken(user.email, 'laboratoryoftechnoicalexperiemntsandinnovation', 172800);
  var userData = {
    token : token,
    tokenExpiryInSec : 172800,
    dob : user.dob,
    email : user.email
  };

  return encryptor.encrypt(userData);
}



