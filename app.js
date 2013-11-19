
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

//Custom
var passport = require('passport');
//var auth = require('./controllers/auth');

passport.serializeUser(function(user,done) {
    done(null,user);
});

passport.deserializeUser(function(o,d) {
    d(null,o);
});

var GitHubStrategy = require('passport-github').Strategy;
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
 
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/home',routes.home);
app.get('/error',routes.error);
app.get('/users', user.list);
app.get('/auth/github',
      passport.authenticate('github'),function(req,res) { });
app.get('/auth/github/callback',
        passport.authenticate('github',{ failureRedirect: '/' }),
        function(req,res) {
            res.redirect('/home');
        }
        );

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
