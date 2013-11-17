

var k = require('kmodel'),
    c = require("./Common");

k.connect();


var wikidao = k.load("Wiki"),
    userdao = k.load("User"),
    markdown = require("markdown").markdown;


exports.create = function(req, res){

    var data = req.body;

    if(!req.session.user) return c.error(res, "请登录");

    if(!data.name) return c.error(res, "请填写标题");

    if(!data.content) return c.error(res, "请填写内容");

    if(!data.group) return c.error(res, "选择所属group");

    data.user = req.session.user;

    wikidao.insertOne(data, function(err, wiki){
        if(err) return c.error(res, "服务器错误.502"); 
        c.json(res, wiki);
    });

};

exports.get = function(req, res){

    var id = req.params.id;

    if(!req.session.user) return c.error(res, "请登录");
    if(!id) return c.error(res, "请求参数有误");

    wikidao.queryOne({_id: id}, function(err, wiki){
        if(err) c.error(res, "wiki is not found");
        wiki.content = markdown.toHTML(wiki.content);
        c.json(res, wiki);
    });
};









