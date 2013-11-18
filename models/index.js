var models;
module.exports=function(mongoose){
    if(!models) {
        models = {
            "UserLoginAudit": require('./UserLoginAudit')(mongoose)
        }
    }

    return models;
}

