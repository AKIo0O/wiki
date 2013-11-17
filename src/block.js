

var T = require("objectmodel").T,
    async = require("kasync");

var head = function(){

    return T.create({

        head: T.wrap("head"),

        title: T.wrap("title"),

        script: '<script type="text/javascript" src="{{src}}"></script>',

        meta: '<meta name="{{name}}" content="{{content}}">',

        link: '<link href="{{href}}" rel="stylesheet" type="text/css">',

        style: T.wrap("style"),

        compilelist: ['script', 'meta', 'link'],

        process: function(data){

            var me = this, head,
                opts = ['meta','link','script','style'];

            head = me.title(data.title);
            head += '<link rel="icon" href="/images/wiki.ico">';

            T.each(opts, function(opt){
                T.each(data[opt], function(data){
                    if(data) head += me[opt](data);
                });
            });

            return me.head(head);
        },

        xtype: "head"
    });
};


// body 
var body = function(){
    return T.create({}, 'body');
};

var createPage = function(){

    return T.create({

        headconfig: {},

        head: head(),

        body: body(),

        process: function(){
            var html = '<!DOCTYPE html>';
            if(!this.body || !this.head) console.error("HTMLElement is need config head and body!");
            this.append(this.head.run(this.headconfig));
            this.append(this.body.getBlockString());
            html += this.html;
            this.clear();
            return html;
        },

        chunked: function(req, res){

            var head = '<!DOCTYPE html>' + this.head.run(this.headconfig),
                body = this.body, isasync = false,
                guid = Date.now()+Math.random();
            
            var token = res.locals.token;

            res.write(head);
            async.done('block'+ guid, end);
            res.write(body.prefix());
            T.each(body.blocks, function(block){
                if(block.async) {
                    isasync = true;
                    block.chunked(async.wait('block'+guid, function(str){
                        res.write(str);
                    }), req);
                }else {
                    var session = req.session.user;
                    res.write(block.run(session));
                }
            });

            if(isasync == false){
                end();
            }

            function end(){
                res.write("<input type='hidden' id='crsftoken' value='"+token+"'>");
                res.write(body.subfix());
                res.end('</html>');
            }
        }

    },'html');
};

exports.createPage = createPage;




















