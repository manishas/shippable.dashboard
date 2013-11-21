var models;
module.exports=function(mongoose){
    if(!models) {
        mongoose.connect("mongodb://localhost/test");

        models = {
            "UserLoginAudit": require('./UserLoginAudit')(mongoose),
            "UserLogin":require('./UserLogin')(mongoose)
        }
    }

    return models;
}

