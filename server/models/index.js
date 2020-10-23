const mongoose = require('mongoose');
const User = require('./auth');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })

module.exports = { User };