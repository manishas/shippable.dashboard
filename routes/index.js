
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
  
};

exports.home = function(req,res) {
    res.render('home',{user: req.user});
};
exports.error = function(req,res) {
    res.render('error');
}
