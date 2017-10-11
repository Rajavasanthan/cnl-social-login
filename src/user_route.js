var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
    res.json({api:'running'});
});
router.get('/insecure', (req, res) => {
res.send('InSecure response');
});
router.get('/secure',
passport.authenticate(['jwt'], { session: false }),
(req, res) => {
    res.send(req.user);
});

module.exports = router;