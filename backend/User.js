var k = require('kmodel');

k.connect();

var User = k.load("User");

var validate = function(req, res){

    var email = req.body.email,
        password = req.body.password;

    if(email == "" || /^\S+@\S+\.\S+$/.test(email) == false){
        return res.json({status:1, msg:"Invalid email."});
    }
    if(password == ""){
        return res.json({status:1, msg:"password is empty."});
    }
    return true;
};


exports.signin = function(req, res){

    var body = req.body;

    if(validate(req, res) === true){
        User.signin({ email: body.email, password: body.password}, function(instance){
            if(instance && instance.email){
                req.session.user = instance;
                res.json({status: 0, msg: "welcome back "+ instance.email});
            }
            else res.json({status:1, msg:'Invalid email or password.'});
        });
    }
};

exports.signup = function(req, res){

    var body = req.body;
    if(validate(req, res) === true){
        User.queryOne({email: body.email}, function(err, instance){
            if(instance && instance.email) return res.json({status: 1, msg: "email is unavailable."});
            User.signup({email: body.email, password: body.password}, function(inst){
                if(inst && inst.email){
                    req.session.user = inst;
                    res.json({status: 0, msg: "signup success."+ inst.email});
                }else res.json({status:1, msg:'504.'});
            });
        });

    }
};

exports.signout = function(req, res){
    req.session.user = null;
    res.redirect("/");
};









