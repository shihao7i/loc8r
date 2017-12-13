let mongoose = require('mongoose');
let gracefulShutDown;
let dbURI = 'mongodb://localhost/loc8r';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log(`Mongoose connected to ${dbURI}`)
});

mongoose.connection.on('error', function (err) {
  console.log(`Mongoose connection error: ${err}`)
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

// For nodemon restarts
process.once('SIGUSR2', function () {
  gracefulShutDown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// For app termination
process.on('SIGINT', function () {
  gracefulShutDown('app termination', function () {
    process.exit(0);
  });
});

// For Heroku app termination
process.on('SIGTERM', function () {
  gracefulShutdown('Heroku app shutdown', function () {
    process.exit(0);
  });
});