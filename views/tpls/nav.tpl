<nav class="nav">
    <ul>
        {{#if email}}
            <li class="email"><a href="/home">{{email}}</a></li> 
            <li class="logout"><a href="/signout">signout</a></li> 
        {{/if}} 
        <li><a href="/">create group</a></li>
        <li><a href="/wikicreate">create wiki</a></li>
        {{#unless email}}
            <li class="logout"><a href="/signin">signin</a></li> 
            <li class="logout"><a href="/signup">signup</a></li> 
        {{/unless}} 
    </ul>
</nav>