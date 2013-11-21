var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var config = require('../config/');
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
        process.nextTick(function() {
            //TODO: Save accesstoken,refreshToken,profile to mongo
            return done(null,profile);
        });
    }
                         );

                         console.log("new strategy.. %j",g);

                         return g;

}

//Expecting the res object to hold the user data
exports.onAuthCompleted=function(res) {

}
