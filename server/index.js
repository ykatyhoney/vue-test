if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const history = require('connect-history-api-fallback')
require('./db/connection');

const app = express();
app.use(history({
    rewrites: [
        {
            from: /^\/api\/.*$/,
            to: function (context) {
                return context.parsedUrl.path
            }
        }
    ]
}))
app.use(morgan('dev'));
app.use(cors(
    //   { origin: process.env.BACK_ORIGIN }
));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// initialize passport
app.use('/api/auth', require('./routes/auth'));

app.use('/', require('./routes/index'))
// catch 404 errors
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
})

// error handler function
app.use((err, req, res, next) => {

    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    //respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });
    // respond to server
    console.error(err);
})


//start the server
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`listening on ${port}...`) });