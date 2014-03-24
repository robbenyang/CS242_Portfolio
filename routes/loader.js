/*
 * Load footer and header .
 */
exports.header = function(req, res){
	res.render('header.html');
};

exports.footer = function(req, res){
	res.render('footer.html');
};

/*
 * Load json files
 */
exports.load_list = function(req, res){
	res.sendfile('./public/json/svn_list.json');
};

exports.load_log = function(req, res){
	res.sendfile('./public/json/svn_log.json');
};