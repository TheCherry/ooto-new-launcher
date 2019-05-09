class Lobby extends BaseSite {
  constructor() {
    super();
    this.html_file = "lobby.html"
    this.cache = {}; // { "ip": { "last_update": timestamp, "data": {} }}
    this.default_servers = {
      "North America (CA)": "na.oot-online.org",
      "Europe (DE)": "eu.oot-online.org"
    };
    this.user_servers = {

    };
    this.current_server = {name: "North America (CA)", ip: "na.oot-online.org"};
  }

  onload(){
  }

  onenter(){
    this.createTable();
    this.refreshServers();
    this.refreshLobbyList(this.current_server.ip);
    $("#btn-join").click(this.joinWindow);
    $("#btn-create").click(this.createWindow);
  }

  createTable(){
    var printIcon = function(cell, formatterParams, onRendered){ //plain text value
       return "<button class=\"btn btn-sm btn-primary\" >JOIN</button> <button class=\"btn btn-sm btn-primary\">INFO</button>";
    };
    this.table = new Tabulator("#example-table", {
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
        $("#server-list").append(this.createServerItem(item, this.default_servers[item], function(){
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

  createServerItem(name, ip, func=function(){}){
    return $("<a/>", {
      href: "#",
      html: name,
      class: "dropdown-item",
      click: (function(){
        $("#server-selected").html(name);
        this.current_server = { name: name, ip: ip };
        func();
        this.refreshLobbyList(ip);
      }).bind(this)
    });
  }

  dialogAddServer(edit){
    bootbox.alert("HIER NEUER SERVER DIALOG");
  }

  refreshLobbyList(server_ip, force_update=false){
    if(!(server_ip in this.cache)){
      force_update = true;
    }
    if(force_update){
        $.getJSON( "http://"+server_ip+":8083/LobbyBrowser", (function( data ) {
          this.cache[server_ip] = {
            data: data,
            timestamp: Date.now()
          };
          this.setLobbyData(data);
        }).bind(this));
    } else {
      this.setLobbyData(this.cache[server_ip].data);
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
