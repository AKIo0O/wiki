var k = require('kmodel');

k.connect();


var groupdao = k.load("Group"),
    userdao = k.load("User");

exports.create = function(req, res){

    if(req.session.user == null){
        return res.json({status:2, msg:"请登录"});
    }
    groupdao.queryOne({name: req.body.name}, function(err, inst){
        if(err){
            res.json({status:1, msg:"服务器错误"});
        }else if(inst&&inst.id){
            res.json({status:1, msg:"group已经存在"});      
        }else{
           creategroup(req, res); 
        }
    });
};

function creategroup(req, res){
    var user = req.session.user,
        group = {name: req.body.name,createtime: Date.now(),right: 0};

    group.wikis = {};
    group.users = {};
    group.users[user._id] = user;
    group.user = user;
    groupdao.insertOne(group,function(err, instance){
        if(err) res.json({status:1, msg:"创建失败"});
        else{
            userdao.queryOne({_id: user._id}, function(err, u){
                if(u.groups.indexOf(instance._id) == -1) u.groups.push(instance._id);
                u.save();
            });
            res.json({status:0, data:instance});
        }
    });
}
































