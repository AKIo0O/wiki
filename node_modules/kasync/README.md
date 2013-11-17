kasync for mongoose queries
======


##Installation

    $ npm install kasync

##Quick Start
```js
var T = require("kasync");
var res = "";

setTimeout(T.wait("timeout", function(){
    res += "3000ms";
}),3000);

setTimeout(T.wait("timeout", function(){
    res += "3000ms";
}),3000);

T.done("timeout", function(){
    res += "done";
    console.log(res);// 3000ms3000msdone
});
```
```js
var T = require("kasync");
var res = "";

setTimeout(T.wait("timeout", function(){
    res += "4000ms";
}),4000);

setTimeout(T.wait("timeout", function(){
    res += "3000ms";
}),3000);

T.done("timeout", function(){
    res += "done";
    console.log(res);// 4000ms3000msdone
});
```
