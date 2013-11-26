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
       
      UserManager.findUser(profile.username,function(err,loggedInUser){
        
        /*
         *  if user is found, then we need to go to home page
         *  else error page.
         *
         *  if user is found and is going to redirect to home, save the audit
         *
         * */
        console.log(loggedInUser);
        if(loggedInUser == null)
          {
            console.log("Not an authorized user");
            done(err,null);
          }
        
          else{
            console.log("Recognised User");
               UserManager.auditUserLogin(profile,
                    function(auditUserLoginObject){
                        return done(null,loggedInUser._id);
                    });
              }
        });


    });
    return g;
}
 
