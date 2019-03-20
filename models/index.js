const mongoose = require('mongoose');

//TODO: Remove in Deployment
mongoose.set('debug', true);

mongoose.Promise = Promise;
mongoose.connect(`mongodb://${process.env.DB_HOST}/warbler`, {useNewUrlParser: true, useCreateIndex: true});

module.exports.User = require('./user');
module.exports.Message = require('./message');