var mongoose = require('mongoose');
var models = require('../models/')(mongoose);

exports.saveUser = function(accessToken,refreshToken,profile,callback) {

    
    var user = new models.UserLogin();
             
        user.githubId = profile.username;
        user.accessToken= accessToken;
        user.refreshToken= refreshToken;
      

    //console.log("User.. %j",user);
    user.save(function(err) {
        if(err)
            throw err;
        if(callback)
            callback(user);
    });
}

exports.auditUserLogin = function(profile,callback) {

    var user = new models.UserLoginAudit();
        
        user.githubId=  profile.username;
        user.lastLoginTimeStamp= Date.now();
   
    


    user.save(function(err) {
        if(err)
            throw err;
        if(callback)
            callback(user);
    });

}


