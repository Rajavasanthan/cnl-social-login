var express = require('express');
var router = express.Router();
const passport = require('passport');
const token = require('../token');
const fetch = require('node-fetch');
require('../auth/jwt');
require('../auth/google');
require('../auth/facebook');


// Generate the Token for the user authenticated in the request
function generateUserToken(req, res) {
    const accessToken = token.generateAccessToken(req.user.uid);
    res.send('JWT '+accessToken)
}



router.get('/google/start',
passport.authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] }));
router.get('/google/redirect',
passport.authenticate('google', { session: false }),
generateUserToken);

router.get('/facebook/start',
passport.authenticate('facebook', { session: false, scope: ['public_profile'] }));

router.get('/facebook/token',async function(req,res){
    console.log(req.query.token)

    let fbData = await fetch(`https://graph.facebook.com/oauth/access_token
    ?client_id=1018964345278850
    &client_secret=56559c918bdf34d8445c11a6cba767ab
    &grant_type=client_credentials`)

    // let fbData = await fetch(`https://graph.facebook.com/me?access_token=${req.query.token}&fields=id,first_name,last_name,email`)
    // console.log("fbData")
    let data = await fbData.json()
    console.log(data)
    // res.json({
    //     message : "Success"
    // })
})

router.get('/facebook/redirect',
passport.authenticate('facebook', { session: false }),
generateUserToken);

module.exports = router;