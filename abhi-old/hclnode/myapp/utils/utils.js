
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



