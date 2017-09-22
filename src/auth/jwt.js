const passport = require('passport');
const passportJwt = require('passport-jwt');
const config = require('../config');
const User = require('../user');

const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
    secretOrKey: 'secretone',
    issuer: 'knight3rrant',
    audience: 'public'
};

passport.use(new passportJwt.Strategy(jwtOptions, (payload, done) => {
    User.findOne({uid:parseInt(payload.sub)}).then((user)=>{
        console.log('jwt user found!',user)
        if (user) {
            return done(null, user, payload);
        }
        return done();
    })
    
}));
