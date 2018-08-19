$(document).ready(function(){
    var cid =config.client_id
    var cs = config.client_secret
    $('#searchUser').on('keyup', function(e){
        let username = e.target.value
// Make request to github
        $.ajax({
            url:'https://api.github.com/users/'+username,
            data:{
                client_id:cid,
                client_secret:cs
            }
        }).done(function(user){
            $.ajax({
            url:'https://api.github.com/users/'+username+'/repos',
            data:{
                client_id:cid,
                client_secret:cs,
                sort: 'created: asc',
                per_page: 5
            }
                }).done(function(repos){
                    $.each(repos, function(index, repo){
                        $('#repos').append(`
                        <div class = "well"> 
                            <div class="row">
                                <div class= "col-md-7">
                                    <strong> ${repo.name}</strong>: ${repo.description}
                                </div>
                                <div class= "col-md-3">
                                    <span class="badge badge-primary">Forks: ${repo.forks_count}</span>
                                    <span class="badge badge-warning">Stars: ${repo.stargazers_count}</span>                            
                                    <span class="badge badge-dark"> Watchers: ${repo.watchers_count}</span>
                                </div>
                                <div class= "col-md-2">
                                    <a href="${repo.html_url}" target = "_blank" class ="btn"> Repo Page</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            });
            $('#profile').html(`
            <div class="card">
                <div class="card-header">${user.name}</div>
            <div class="card-body">
                <div class ="row">
                    <div class="col-md-3">
                        <img class= "thumbnail avatar" src="${user.avatar_url}">
                        <a target="_blank" href=${user.html_url} class="btn btn-primary btn-block" >View Profile</a>
                    </div>
                    <div class="col-md-9">
                    <span class="badge badge-dark">Public Repos: ${user.public_repos}</span>
                    <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
                    <span class="badge badge-success">Followers: ${user.followers}</span>
                    <span class="badge badge-info">Following: ${user.following}</span>        
                    <br><br>
                    <ul class = "list-group">
                    <li class ="list-group-item"> Company: ${user.company}</li>
                    <li class ="list-group-item"> Website/blog: ${user.blog}</li>
                    <li class ="list-group-item"> Location: ${user.location}</li>
                    <li class ="list-group-item"> Member Since: ${user.create_at}</li>
                    </ul>            
                    </div>
                </div>
                </div>
                </div>                        
            <h3 class="page-header">Latest Repos</h3>
            <div id="repos"> <div>
            `);
        });
    }); 
});