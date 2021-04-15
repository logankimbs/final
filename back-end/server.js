const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const users = require('./users.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// connection to database
mongoose.connect('mongodb://localhost:27017/final-project', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use(cookieParser());

app.use(cookieSession({
    name: 'session',
    keys: [
        'secretValue'
    ],
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// connection to users
app.use('/api/users', users.routes);

app.listen(3002, () => console.log('Server listening on port 3002'));