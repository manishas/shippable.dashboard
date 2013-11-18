module.exports = function(mongoose) {
    //var Schema = mongoose.Schema;
    var schema = mongoose.Schema({
        githubId : String,
        lastLoginTimeStamp: Date
                           
    });

    return mongoose.model('UserLoginAudit',schema);
}


