var mongoose = require('mongoose');
var dbConfig = require('../db.js');

var dbURI = dbConfig.url;

if (dbConfig.env == "dev") {
   dbURI = dbConfig.devUrl;

} else {
    dbURI = dbConfig.localUrl;
}

var poolSize = dbConfig.poolSize;
var  user = dbConfig.user;
var password = dbConfig.password;
var replicaSetName = dbConfig.replicaSetName;

var optionsDevelopment = {
  db: { native_parser: true },
  server: {  
  	 poolSize: poolSize,
  	 auto_reconnect: true,
  	 reconnectTries: Number.MAX_VALUE,
  	 socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 },
  	 ssl: false,
     sslValidate: false, 

  	},

  user: user,
  pass: password
}

mongoose.connect(dbURI,optionsDevelopment);



// ---------------- Make a conenction to MongoDB -----------------------------//

mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to -----------------??' + dbURI);
    console.log('Mongoose default connection open. db config -----------------??' + JSON.stringify(mongoose.connection.options.db));
    console.log('Mongoose default connection open. server config -----------------??' + JSON.stringify(mongoose.connection.options.server));

});

mongoose.connection.on('error', function(err) {
    throw(new Error('Mongoose default connection error: ' + err));
});



mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
});

mongoose.connection.on('reconnected', function() {
    console.log('Mongoose connection reconnected.' + dbURI);
});

mongoose.connection.once('open', function() {
    console.log('Mongoose connected once.' + dbURI);
});


// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});


//------------------------------End -----------------------------//

exports.mongoose = mongoose;

