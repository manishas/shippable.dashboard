var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var config = require('../config/');
var UserManager= require('../managers/user');
passport.serializeUser(function(Id,done) {
    done(null,Id);
});

passport.deserializeUser(function(Id,done) {
UserManager.findUserById(Id,function(err,user) {
    if(err)
    done(err,null);
  done(null,user);
});
  
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
                console.log(user._id);
                //var sessionObj = user.Id;
                return done(null,user._id);
            });

    }
    );
    return g;
}
 
