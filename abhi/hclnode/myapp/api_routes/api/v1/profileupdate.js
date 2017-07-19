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


//module.exports = function () {
    
router.route('/').put(function(req, res, next) {
    console.log("put caall-------------------------------------------------------------");
    var email = req.body.email;
    var dob = req.body.dob;
    var query = { email: email };
    console.log("email----------------------",JSON.stringify(req.body.email));
    console.log("dob----------------------",JSON.stringify(req.body.dob));

    User.update(query, { dob : dob}, function(err, data) {
        if (err) {
            logger.error(new Error("Error in updating date of birth " + err.message));
            
            return res.send(500, {
                message: "Error in updating a User having date of birthdate  "  + err.message
            });

        } else {    
            return res.send(200, {
                        status: true,
                        message: "done"
                    }); // end of res send
         }  

    });



});



// router.route('/').get(function(req, res, next) {
//     console.log("put caall-------------------------------------------------------------");
//     var email = req.query.email;
//     var dob = req.query.dob;
//     var query = { email: email };
//     console.log("email----------------------",JSON.stringify(req.body.email));
//     console.log("dob----------------------",JSON.stringify(req.body.dob));

//     User.find(query, { dob : dob}, function(err, data) {
//         if (err) {
//             logger.error(new Error("Error in updating date of birth " + err.message));
            
//             return res.send(500, {
//                 message: "Error in updating a User having date of birthdate  "  + err.message
//             });

//         } else {    
//             return res.send(200, {
//                         status: true,
//                         message: "done"
//                     }); // end of res send
//          }  

//     });



// });
    module.exports = router;

//} 
