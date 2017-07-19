var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');


// router.route('/').get(function(req, res, next) {
// console.log("abhishek kumar");
//  res.render('index', { title: 'Express' });
// });

router.route('/').get(function(req, res, next){
    console.log("abhi1");

  // var getHttpClient = utils.getHttpClient();
  // getHttpClient.request('/api/v1/registration', function (err, httpres, body) {

  //   console.log("abhi2");
  //   if(err || httpres.statusCode != 200){
  //     return next(" error getting users playlist for user  " + err);
  //   }
  //   // var data = JSON.parse(body);
  //   // data.notProfile=true;
  //   // res.render('user/my-playlists', {
      
  //   //   });
  //   });
  
});






















module.exports = router;



