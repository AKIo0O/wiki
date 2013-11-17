
var B = require("../src/block"),
    T = require("objectmodel").T,
    c = require("../views/common"), head;


var create = function(){
    var page = B.createPage();
    var head = T.mixin({}, c.head);
    var blocks = [].slice.call(arguments);
    for(var i =0; i < blocks.length; i++) page.body.addBlock(blocks[i]);
    page.headconfig = head;
    return page;
};


var group = create(c.nav);
group.headconfig.title = "all groups";
group.headconfig.link.push({href: "/stylesheets/group.css"});

exports.group = function(req, res){
    group.chunked(req, res);
};

exports.wiki = function(req, res){

    if(req.method == "GET"){
        group.chunked(req, res);
    }

};

exports.wikicreate = createWiki;


/// 创建 wiki 的 page 页

var creaeteWikiPage = create(c.nav, c.cp),
    head = creaeteWikiPage.headconfig;

head.link.push({href: "/stylesheets/create.css"})
head.meta.push({name:"description",content:"创建wiki"});
head.title = "创建新的wiki";

function createWiki(req, res){
    if(req.session.user == null)return res.redirect("/signin");
    creaeteWikiPage.chunked(req, res);
}

