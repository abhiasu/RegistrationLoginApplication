var mongoose = require('mongoose');
mongoose.Promise = Promise;

Schema = mongoose.Schema;
passportLocalMongoose = require('passport-local-mongoose');

// create a schema
var userSchema = new Schema({
        email: {
            type: String
        },
        password: {
            type: String,
        },
        creationDate: {
            type: Date
        },
        lastModifiedDate :{
          type: Date
        },
        lastLoginDate :{
          type: Date
        },        
       jwtToken : {
            type: String 
        },        
        dob: {
            type: Date
        }
        ,
        local: {

            // type: Object,

            // properties: {
            //     firstName: {
            //         type: String
            //     },
            //     lastName: {
            //         type: String
            //     },
            //     email: {
            //         type: String
            //     },
            //     username: {
            //         type: String
            //     },
            //     profilePhotoUrl: {
            //         type: String
            //     },
            //     country: {
            //         type: String
            //     },
            //     gender: {
            //         type: String
            //     },
            //     dob: {
            //         type: Date
            //     },
            //     address1: {
            //         type: String
            //     },
            //     address2: {
            //         type: String
            //     },
            //     city: {
            //         type: String
            //     },
            //     state: {
            //         type: String
            //     },
            //     zip: {
            //         type: Number
            //     },
            //     lastModifiedDate: {
            //         type: Date
            //     },
            //     creationDate: {
            //         type: Date
            //     },
            //     lastLoginDate :{
            //       type: Date
            //     }


            // }
        }
    }, {
        collection: 'users'
    }

);

userSchema.plugin(passportLocalMongoose, {usernameField: "email"});
var User = mongoose.model('user', userSchema, 'users');

module.exports = User;
