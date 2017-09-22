const express = require('express');
const mustacheExpress = require('mustache-express');
const config = require('./config');
const passport = require('passport');
const token = require('./token');
const User = require('./user');
require('./auth/jwt');
require('./auth/google');
require('./auth/facebook');

// Generate the Token for the user authenticated in the request
function generateUserToken(req, res) {
    const accessToken = token.generateAccessToken(req.user.uid);
    res.json(accessToken)
}

const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost/jwtLearn';

mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(passport.initialize());


app.get('/api/authentication/google/start',
    passport.authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] }));
app.get('/api/authentication/google/redirect',
    passport.authenticate('google', { session: false }),
    generateUserToken);

app.get('/api/authentication/facebook/start',
    passport.authenticate('facebook', { session: false }));
app.get('/api/authentication/facebook/redirect',
    passport.authenticate('facebook', { session: false }),
    generateUserToken);

    app.get('/', (req, res) => {
        res.send('Home response');
    });
app.get('/api/insecure', (req, res) => {
    res.send('InSecure response');
});
app.get('/api/secure',
    passport.authenticate(['jwt'], { session: false }),
    (req, res) => {
        res.send(req.user);
    });

const port = config.get('http.port');
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
