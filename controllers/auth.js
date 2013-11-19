var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
exports.onAuthCompleted = function(githubObj) {
    
    //Saves the entry to the database
};

exports.performLogin = function(passport) {

    passport.use(new GitHubStrategy({
        clientID: "fb4327a96260c37ed1e0",
        clientSecret:"39232925feb85e169443813c577f8d131da271e7",
        callbackURL:"http://192.168.1.245:3000/auth/github/callback"
    }, function(accessToken,refreshToken,profile,done) {
        console.log('Got access token...'+accessToken);
        process.nextTick(function() {
            //TODO: Save accesstoken,refreshToken,profile to mongo
            return done(null,profile);
        });
    }
                                   
                                   ));

    passport.authenticate('github',function(req,res) { });
}
