const mongoose = require('mongoose');

//mongoose-mongodb
mongoose.Promise = global.Promise;
const db = mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database is connected");
    })
    .catch(err => {
        console.log({ database_error: err });
    });

module.exports = db;
