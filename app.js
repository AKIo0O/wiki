/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var group = require('./routes/group');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.cookieSession({secret:"aki", cookie: {maxAge: 60*60*1000}}));
app.use(express.csrf());
app.use(function(req, res, next){
    res.locals.token = req.csrfToken();
    next();
});
app.use(app.router);
app.use(express.methodOverride());
app.use(express.compress());
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


app.get('/', routes.index);
app.get('/signin', routes.signin);
app.get('/signup', routes.signup);
app.get('/home', routes.home);
app.get('/group', group.group);
app.get('/wikicreate', group.wikicreate);
app.get('/wiki', group.wiki);

var user = require("./backend/User");

app.post('/signin', user.signin);
app.post('/signup', user.signup);
app.get('/signout', user.signout);

var groupdao = require("./backend/Group"),
    groupview = require("./views/group");
app.post('/group', groupdao.create);
app.get('/group/:id', groupview.view);

var wikidao = require("./backend/Wiki");

app.post('/wiki', wikidao.create);
app.get('/wiki/:id', wikidao.get);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});






