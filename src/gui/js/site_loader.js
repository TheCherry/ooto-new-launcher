function load_site(name){
  let site = global.sites[name];
  $.get("views/sites/"+site.html_file, function(data){
    $("#main-window").html(data);
    site.base_onenter();
  });
}
$(function(){
  load_site('Lobby');
});
