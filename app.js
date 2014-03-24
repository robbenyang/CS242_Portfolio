
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var loader = require('./routes/loader');
var database = require('./routes/database');
var loadPages = require('./routes/loadPages');
var http = require('http');
var path = require('path');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/test');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Handle all the requests
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/footer', loader.footer);
app.get('/header', loader.header);
app.get('/about', loadPages.about);
app.post('/svn_list.json', loader.load_list);
app.post('/svn_log.json', loader.load_log);
app.get('/assignment0', loadPages.assignment0);
app.get('/assignment10', loadPages.assignment10);
app.get('/assignment11', loadPages.assignment11);
app.get('/assignment12', loadPages.assignment12);
app.get('/assignment20', loadPages.assignment20);
app.get('/assignment21', loadPages.assignment21);
app.post('/addcomment', database.insert(db));
app.post('/getcomments', database.find(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
