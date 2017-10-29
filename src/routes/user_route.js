var express = require('express');
var router = express.Router();
const passport = require('passport');

const User = require('../model/user');

router.get('/',passport.authenticate(['jwt'], { session: false }), (req, res) => {
           res.status(200).json(req.user)
});


router.get('/secure',
passport.authenticate(['jwt'], { session: false }),
(req, res) => {
    res.send(req.user);
});

module.exports = router;