
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
  
};

exports.home = function(req,res) {
    res.render('home');
};
exports.error = function(req,res) {
    res.render('error');
}
