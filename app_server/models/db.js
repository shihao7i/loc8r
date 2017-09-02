let mongoose = require('mongoose');
let gracefulShutDown;
let dbURI = 'mongodb://localhost/loc8r';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log(`Mongoose connected to ${dbURI}`)
});

mongoose.connection.on('error', function (err) {
  console.log(`Mongoose connection error: ${error}`)
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected')
});

gracefulShutDown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log(`Mongoose disconnected through ${msg}`)
    callback();
  });
};
