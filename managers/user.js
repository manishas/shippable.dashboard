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
    //TODO: Finds teh user based on Id
  //
  //
 var user = models.UserLogin.findById(Id,function(err,doc){
 if(callback)   
   callback(err,doc);
 });
// console.log(user); 


}
