<section class="box">
    <ul class="wikis">
        <li class="title">Groups</li>
        {{#groups}}<li class="group item">{{name}}</li>{{/groups}}
        <li class="title">Wiki</li>
        {{#wikis}}<li class=" wiki item" data-id="{{_id}}">{{name}}</li>{{/wikis}}
    </ul>
    <section class="article">
        <h3></h3>
        <section class="content"></section>
    </section>
</section>
<script type="text/javascript" src="/javascripts/jquery-1.10.2.min.js"></script>
<script type="text/javascript">
void function(){

    var wikis = $(".wikis"),
        article = $(".article");

    wikis.on("click", ".wiki", function(){

        var id = this.dataset.id;

        $.get("/wiki/"+id, function(json){

            var data = json.data,
                h = article.find("h3"),
                c = article.find(".content");

            h.html(data.name);
            c.html(data.content);
        });
    });

    wikis.find(".wiki").first().trigger("click");

}();
</script>
