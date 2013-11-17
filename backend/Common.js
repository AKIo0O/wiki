


exports.error = function(res, msg){
    return res.json({status:1, msg: msg})
};


exports.json = function(res, data){
    return res.json({status:0, data: data})
};