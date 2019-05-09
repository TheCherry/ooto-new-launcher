class Lobby extends BaseSite {
  constructor() {
    super();
    this.html_file = "lobby.html"
    this.cache = {}; // { "ip": { "last_update": timestamp, "data": {} }}
    this.minimum_loading_time = 500; // we simulate a longer loading time, else the user thinks nothing happend
    this.is_loading = false;
    this.default_servers = {
      "North America (CA)": { ip: "na.oot-online.org", gameport: 8082, lobbyport: 8083 },
      "Europe (DE)": { ip: "eu.oot-online.org", gameport: 8082, lobbyport: 8083 }
    };
    this.user_servers = {
      "OwnServerTest": { ip: "localhost", gameport: 8082, lobbyport: 8083 }
    }; // loaded from CFG ...
    this.current_server = {name: "North America (CA)", ip: "na.oot-online.org", gameport: 8082, lobbyport: 8083 }; // loaded from CFG
  }

  onload(){
  }

  onenter(){
    this.createTable();
    this.refreshServers();
    this.refreshLobbyList(this.current_server.ip, this.current_server.lobbyport);
    $("#btn-join").click(this.joinWindow);
    $("#btn-create").click(this.createWindow);
    $("#btn-refresh").click((function(){
      this.refreshLobbyList(this.current_server.ip, this.current_server.lobbyport);
    }).bind(this));
  }

  createTable(){
    var printIcon = function(cell, formatterParams, onRendered){ //plain text value
       return "<button class=\"btn btn-sm btn-primary\" >JOIN</button> <button class=\"btn btn-sm btn-primary\">INFO</button>";
    };
    this.table = new Tabulator("#table-lobby", {
      //height:"500px",
      height:450,
      layout:"fitColumns",
      responsiveLayout:"hide",
      initialSort:[             //set the initial sort order of the data
  		    {column:"name", dir:"asc"},
  	  ],
      columns:[
        {title:"Name", field:"name"},
        {title:"Description", field:"description"},
        {title:"Private", field:"private"},
        {title:"Players", field:"players"},
        {title:"Mod", field:"mod"},
        {title:"Plugins", field:"plugins"},
        // {title:"Progress", field:"progress", sorter:"number", align:"left", formatter:"progress"  },
        {title:"Actions", field:"icons", formatter:printIcon, align:"center", cellClick:function(e, cell){alert("Printing row data for: " + cell.getRow().getData().name)}}
      ]
    });
    function customFilter(data, filterValue){
      if(typeof(filterValue) !== "string") {return true};
      if(data.description === undefined){
        data.description = "";
      }
      return data.name.toLowerCase().includes(filterValue.toLowerCase()) || data.description.toLowerCase().includes(filterValue.toLowerCase());
    }

    function updateFilter(){
      this.table.setFilter(customFilter, $("#filter-value").val());
    }

    $("#filter-value").keyup(updateFilter.bind(this));
  }

  refreshServers(){
    $("#server-selected").html(this.current_server.name);
    $("#server-list").html("");
    for(let item in this.default_servers){
      $("#server-list").append(this.createServerItem(item, this.default_servers[item], function(){
        // hide the edit and delete buttons, if it is a default server
        $("#server-edit").hide();
        $("#server-delete").hide();
      }));
    }
    if(Object.keys(this.user_servers).length !== 0){
      $("#server-list").append($("<div/>", { class: "dropdown-divider" }));
      for(let item in this.user_servers){
        $("#server-list").append(this.createServerItem(item, this.user_servers[item], function(){
          // display the edit and delete buttons, if it is a user server
          $("#server-edit").show();
          $("#server-delete").show();
        }));
      }
    }
    $("#server-list").append($("<div/>", { class: "dropdown-divider" }));
    $("#server-list").append($("<a/>", {
      href: "#",
      html: "Add Server",
      class: "dropdown-item",
      click: function(){
        bootbox.alert("HIER NEUER SERVER DIALOG");
      }
    }));
  }

  createServerItem(name, server_data, func=function(){}){
    return $("<a/>", {
      href: "#",
      html: name,
      class: "dropdown-item",
      click: (function(){
        $("#server-selected").html(name);
        this.current_server = { name: name, ip: server_data.ip, gameport: server_data.gameport, lobbyport: server_data.lobbyport};
        func();
        this.refreshLobbyList(server_data.ip, server_data.lobbyport, true);
      }).bind(this)
    });
  }

  dialogAddServer(edit){
    bootbox.alert("HIER NEUER SERVER DIALOG");
  }

  lobbyStatus(status){
    if(status === "success"){ // show table
      let lefttime = (Date.now() - this.loading_start_time);
      lefttime = this.minimum_loading_time - lefttime;
      if(lefttime > 0){
        setTimeout(function(){
          $("#table-loading").hide();
          $("#table-lobby").show();
        }, lefttime);
      } else {
        $("#table-loading").hide();
        $("#table-lobby").show();
      }
    } else if (status === "error") {
      $("#table-loading").html('<span class="oi oi-loop-warning"></span> Server offline!');
      $("#table-loading").show();
      $("#table-lobby").hide();
    } else { // hide table, show loading spin
      $("#table-loading").html('<span class="oi oi-loop-circular spin"></span> Loading ...');
      $("#table-loading").show();
      $("#table-lobby").hide();
      this.loading_start_time = Date.now();
    }
  }

  refreshLobbyList(server_ip, lobbyport, force_update=false){
    if(!this.is_loading){
      this.is_loading = true;
      this.lobbyStatus("loading");
      if(!(server_ip in this.cache)){
        force_update = true;
      }
      if(force_update){
          $.getJSON( "http://"+server_ip+":"+lobbyport+"/LobbyBrowser", (function( data ) {
            this.cache[server_ip] = {
              data: data,
              timestamp: Date.now()
            };
            this.setLobbyData(data);
            this.lobbyStatus("success");
            this.is_loading = false;
          }).bind(this)).fail((function(){
            this.lobbyStatus("error");
            this.is_loading = false;
          }).bind(this));
      } else {
        this.setLobbyData(this.cache[server_ip].data);
        this.lobbyStatus("success");
        this.is_loading = false;
      }
    }
  }
  setLobbyData(data){
    this.table.setData(data);
  }

  createWindow(){
    new global.dialogs.RoomCreate();
  }

  joinWindow(name, password){
    new global.dialogs.RoomJoin();
  }
}
new Lobby();
