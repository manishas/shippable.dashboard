var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var config = require('../config/');
var UserManager= require('../managers/user');
passport.serializeUser(function(user,done) {
    done(null,user);
});

passport.deserializeUser(function(o,d) {
    d(null,o);
});

//Passport stuff
exports.init = function() {

    passport.use(getGithubStrategy());
}

function getGithubStrategy() {

var g =  new GitHubStrategy({
        clientID: config.passport.github.clientId,
        clientSecret:config.passport.github.secret,
        callbackURL:config.passport.github.callbackUrl
    }, function(accessToken,refreshToken,profile,done) {
        console.log('Got access token...'+accessToken);
        
        UserManager.saveUser(accessToken,refreshToken,profile
            ,function(user) {

                var sessionObj = user.Id;
                return done(null,sessionObj);
            });

    }
    );
    return g;
}

