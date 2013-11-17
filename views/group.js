

var B = require("../src/block"),
    T = require("objectmodel").T,
    c = require("./common"),
    k = require("kmodel");

k.connect();

var create = function(){
    var page = B.createPage();
    var head = T.mixin({}, c.head);
    var blocks = [].slice.call(arguments);
    for(var i =0; i < blocks.length; i++) page.body.addBlock(blocks[i]);
    page.headconfig = head;
    return page;
};


exports.view = function(req, res){
    var id = req.params.id;

    if(!id) return res.end("页面不存在。Not found！");

    groupdao.queryOne({_id: id}, function(err, instance){
        if(err) return res.end("服务器错误。502！");
        groupview(req, res, instance);
    });

};

var groupdao = k.load("Group");
var view = T.createtpl("groupview");
var grouppage = create(c.nav, view);

grouppage.headconfig.title = "group";
grouppage.headconfig.link.push({href:"/stylesheets/group.css"});
grouppage.headconfig.link.push({href:"/stylesheets/pure.css"});
function groupview(req, res, instance){
    view.datas = instance;
    view.reset = false;
    grouppage.chunked(req, res);
    view.datas = {};
};



