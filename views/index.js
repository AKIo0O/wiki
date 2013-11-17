

var B = require("../src/block"),
    T = require("objectmodel").T,
    c = require("./common"), head;

c.head.title = "首页";

var create = function(){
    var page = B.createPage();
    var head = T.mixin({}, c.head);
    var blocks = [].slice.call(arguments);
    for(var i =0; i < blocks.length; i++) page.body.addBlock(blocks[i]);
    page.headconfig = head;
    return page;
};

var index = create(c.nav, c.create);
exports.render = function(req, res){
    index.chunked(req, res);
};

var signup = create(c.nav, T.createtpl("signup"));
signup.headconfig.title = "注册";

exports.signup = function(req, res){
    console.log(req.session)
    if(req.session.user) res.redirect("/");
    signup.chunked(req, res);
};

var signin = create(c.nav, T.createtpl("signin"));
signin.headconfig.title = "登录";

exports.signin = function(req, res){
    if(req.session.user) res.redirect("/");
    signin.chunked(req, res);
};

var tpl = T.createtpl("homepage");

var homepage = create(c.nav, tpl),
    head = homepage.headconfig;

head.title = "我的主页";
head.link.push({href:"/stylesheets/home.css"});
head.link.push({href:"/stylesheets/pure.css"});

homepage.headconfig = head;



var k = require("kmodel"),
    async = require("kasync");
k.connect();

var wikidao = k.load("Wiki"),
    groupdao = k.load("Group");

tpl.chunked = function(callback, req){

    var user = req.session.user, guid = Date.now(),json = {};

    async.done("wikidao"+guid, function(){
        callback(tpl.run(json));
    });


    wikidao.findByUser(user, async.wait("wikidao"+guid, function(err,wikis){
        json.wikis = err ? {} : wikis;
    }));

    groupdao.findByUser(user, async.wait("wikidao"+guid, function(err,groups){
        json.groups = err ? {} : groups;
    }));


};

tpl.async = true;

exports.home = function(req, res){
    if(req.session.user == null) return res.send("请<a href='/signin'>登录</a>");
    homepage.chunked(req, res);
};




















