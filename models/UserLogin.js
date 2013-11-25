module.exports = function(mongoose) {
    //var Schema = mongoose.Schema;
    var schema = mongoose.Schema({
        githubId : String
                           
    });

    return mongoose.model('UserLogin',schema);
}
