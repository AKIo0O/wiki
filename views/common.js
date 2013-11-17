
var T = require("objectmodel").T,
    fs = require("fs"),
    k = require('kmodel');


k.connect();
global.debug = 1;

exports.head = {
    script: [],
    link:[
        {href: "/stylesheets/common.css"},
        {href: "/stylesheets/normalize.css"},
    ],
    meta:[
        {content:"charset:utf-8"},
        {name:"viewport",content:"initial-scale=1, width=device-width, maximum-scale=1, user-scalable=no"}
    ],
    title:'aki'
};

exports.nav = T.createtpl('nav');

var userdao = k.load("User"),
    user = T.createtpl('user');

user.chunked = function(callback){
    var me = this, html = "";
    userdao.query({}, function(err, data){
        html = me.run({users: data});
        callback(html);
    });
};

user.async = true;
exports.user = user;

// 创建/index:wiki
var create = T.createtpl("create");
exports.create = create;

var cp = T.createtpl("createpage");
var groupdao = k.load("Group");

cp.chunked = function(callback, req){

    var session = req.session.user, data = {}, me = this;

    userdao.queryOne({_id: session._id}, function(err, user){

        if(err) return callback(me.run({}));

        var groups = user.groups,
            options = [];
        while(groups.length) options.push({_id: groups.shift()});

        groupdao.model.find().or(options).exec(function(err, gs){
            return callback(me.run({groups: gs}));
        });

    });
};

cp.async = true;
exports.cp = cp;





















