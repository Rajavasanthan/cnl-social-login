var express = require('express');
var router = express.Router();
const passport = require('passport');
const token = require('../token');
const fetch = require('node-fetch');
require('../auth/jwt');
require('../auth/google');
require('../auth/facebook');
const User = require('../model/user');


var FB_ACCESS_TOKEN = "1018964345278850|XbB8tfbbBQWxWPKuyP6kTSmBsZA"
// Generate the Token for the user authenticated in the request
function generateUserToken(req, res) {
    const accessToken = token.generateAccessToken(req.user.uid);
    res.send('JWT ' + accessToken)
}



router.get('/google/start',
    passport.authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] }));
router.get('/google/redirect',
    passport.authenticate('google', { session: false }),
    generateUserToken);

router.get('/facebook/start',
    passport.authenticate('facebook', { session: false, scope: ['public_profile'] }));

router.post('/facebook/token', async function (req, res) {
    console.log(req.body)

    let fbData = await fetch(`https://graph.facebook.com/debug_token?input_token=${req.body.token}&access_token=${FB_ACCESS_TOKEN}`)

    // let fbData = await fetch(`https://graph.facebook.com/me?access_token=${req.query.token}&fields=id,first_name,last_name,email`)
    // console.log("fbData")
    let fbResponse = await fbData.json()
    if (fbResponse && fbResponse.is_valid) {
        console.log(fbResponse)

        User.findOne({'provider':'facebook','uid':fbResponse.user_id})
        .then((user)=>{
            console.log("\n\n\nuser::",profile.photos[0].value)
            try {
                if (!user) {
                    console.log('user does not exists',user)
                    User.create({
                        name:profile.displayName,
                        provider:'facebook',
                        uid:profile.id,
                        photoUrl:profile.photos[0]
                    }).then((user )=> {
                     return  done(null, user)
                     console.log('eita exec hoy nken!!user')
                    }).catch(e=>{
                        return  done(e, user)
                        console.log('eita exec hoy nken!!user')
                    })
    
                } else {
                console.log('user already exists',user)
                return done(null, user);
                }
            } catch (error) {
                console.log(error);
            }
           
        })

        res.json({
            message: "Success"
        })
    }else{
        res.status(401).json({
            message : "Something went wrong"
        })
    }

})

router.get('/facebook/redirect',
    passport.authenticate('facebook', { session: false }),
    generateUserToken);

module.exports = router;