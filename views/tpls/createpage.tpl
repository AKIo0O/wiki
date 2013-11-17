<section id="createpage">
    <input type="text" class="title" id="wikiname"/><select class="select">
        {{#groups}}
            <option value="{{_id}}">{{name}}</option>
        {{/groups}}
    </select>
    <textarea hidden id = "wiki"></textarea>
    <script type="text/javascript" src="/javascripts/codemirror.js"></script>
    <script type="text/javascript">
        var text = document.getElementById('wiki');
        text.value =  localStorage.wikis || "";
        var editor = CodeMirror.fromTextArea(text, {
            mode: "text/x-markdown",
            extraKeys: {
                "Ctrl-S": function (instance) {
                    return false;
                },
                "Cmd-S": function (instance) {
                    return false;
                }
           }
        });
        editor.on("change", function(instance){
            var value = instance.getValue();
            local(value);
        });

        var name = document.getElementById("wikiname");
        name.value = localStorage.text || "";
        name.oninput = function(){
            local(this.value, "text");
        };
        function local(v, key){
            var key = key || "wikis";
            localStorage[key] = v;
        }
    </script>
    </script>
    <link rel="stylesheet" type="text/css" href="/stylesheets/codemirror.css"/>
    <input type="submit" value="submit" class="submit">
</section>
<script type="text/javascript" src="/javascripts/jquery-1.10.2.min.js"></script>
<script type="text/javascript">
void function(){

    var submit = $(".submit"),
        name = $(".title"),
        select = $(".select");

    submit.on("click", function(){

        $.post("/wiki", {name: name.val(), group: select.val(), content:editor.getValue()},function(data){

            if(data.status == 0){
                alert("wiki 已经保存");
                local("");
                local("", "text");
                location.href = "/wikicreate";
            }

        });
    });

}();
</script>