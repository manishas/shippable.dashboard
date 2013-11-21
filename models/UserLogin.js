module.exports = function(mongoose) {
    //var Schema = mongoose.Schema;
    var schema = mongoose.Schema({
        githubId : String,
        accessToken: String,
        refreshToken: String
                           
    });

    return mongoose.model('UserLogin',schema);
}
