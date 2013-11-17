<section id="start">
    <div class="form">
    <div><label for="grouptext">创建属于你的 wiki group：</label></div>
    <input type="text" id="grouptext"/>
    </div>
</section>
<script type="text/javascript" src="/javascripts/jquery-1.10.2.min.js"></script>
<script type="text/javascript">
void function(){
    var gt = $("#grouptext"), submit = true;
    gt.on("keydown", function(e){
        if(submit && e.keyCode == 13){
            $.post("/group", {name: gt.val()}, function(data){
                if(data.status==2){
                    location.href="/signin";
                }else{
                    location.href= "/group/"+data.data['_id'];
                }
            });
        }
    });
}();
</script>

