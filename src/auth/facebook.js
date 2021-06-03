const passport = require('passport');
const passportFacebook = require('passport-facebook');
const config = require('../config');
const User = require('../model/user');

const passportConfig = {
    clientID: '1018964345278850',
    clientSecret: '56559c918bdf34d8445c11a6cba767ab',
    callbackURL: 'http://localhost:3000/api/authentication/facebook/redirect',
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)']
};

if (passportConfig.clientID) {
    passport.use(new passportFacebook.Strategy(passportConfig, function (accessToken, refreshToken, profile, done) {
        console.log(accessToken);
        console.log(refreshToken)
        User.findOne({'provider':'facebook','uid':profile.id})
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
    }));
  
}