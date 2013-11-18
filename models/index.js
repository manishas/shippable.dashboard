var models;
module.exports=function(mongoose){
    models = {
    "UserLoginAudit": require('./UserLoginAudit')(mongoose)
    }

    return models;
}

