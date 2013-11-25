var config = require('../config');
var models;
module.exports=function(mongoose){
    if(!models) {
        mongoose.connect("mongodb://"+config.database.mongo.server+"/"+config.database.mongo.databaseName);

        models = {
            "UserLoginAudit": require('./UserLoginAudit')(mongoose),
            "UserLogin":require('./UserLogin')(mongoose)
        }
    }

    return models;
}

