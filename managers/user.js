var mongoose = require('mongoose');
var models = require('../models/')(mongoose);

exports.saveUser = function(profile,callback) {

    
    var user = new models.UserLogin();
             
    user.githubId = profile.username;

    user.save(function(err) {
        if(err)
            throw err;
        if(callback)
            callback(user);
    });
}

exports.auditUserLogin = function(profile,callback) {

    var user = new models.UserLoginAudit();
       console.log("Auditing");
        user.githubId=  profile.username;
        user.lastLoginTimeStamp= Date.now();
   
    


    user.save(function(err) {
        if(err)
            throw err;
        if(callback)
            callback(user);
    });

}

exports.findUserById = function(Id,callback) {
    // Finds the user based on Id
  //
  //
 var user = models.UserLogin.findById(Id,function(err,doc){
 if(callback)   
   callback(err,doc);
 });

}

exports.findUser = function(id,callback){
var user = models.UserLogin.find({'githubId':id},function(err,doc){
if(callback)
  callback(err,doc);
});

}
