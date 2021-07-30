const mongoose = require('mongoose');

const client = process.env.MONGODB_URI || 'mongodb://localhost:27017/streamercito';

mongoose.connect(client, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = mongoose.connection;
connect.on('error', console.error.bind(console, 'connection error:'));
connect.once('open', function () {
  console.log('connected');
});

const commentSchema = new mongoose.Schema({
    movie: String,
    time: String,
    username: String,
    comment: String
  });
  const userSchema = new mongoose.Schema({
    username: String
  });
  
  const comment = mongoose.model('Comment', commentSchema);
  const user = mongoose.model('User', userSchema);

  module.exports = {
      client,
      comment,
      user
  }