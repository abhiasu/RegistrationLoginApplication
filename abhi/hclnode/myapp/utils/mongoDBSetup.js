var mongoose = require('mongoose');
mongoose.Promise = Promise;
//mongoose.Promise = require('bluebird');
// Connect to mongodb
var dbConfig = require('../db.js');
var dbURI = dbConfig.url;

console.log("the url --------------------" + dbURI);

mongoose.connect(dbConfig.url);
mongoose.connection.on('connected', function() {
	console.log('Mongoose default connection open to ' + dbURI);

});
mongoose.connection.on('error', function(err) {
	console.log('Mongoose default connection error-------------------- ' + err);
});
mongoose.connection.on('disconnected', function() {
	console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log('Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});

module.exports = mongoose;
