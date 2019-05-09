console.log("Loading main.js");

console.log(global.cfg);

var printIcon = function(cell, formatterParams, onRendered){ //plain text value
   return "<button class=\"btn btn-sm btn-primary\" >JOIN</button> <button class=\"btn btn-sm btn-primary\">INFO</button>";
};

var data = [
  {"id": 1, "name": "Lydia", "description": "Randomizer", "private": false, "mod": "", "plugins": "OoT Online 1.0", "progress": 55, "icons": ""},
  {"id": 2, "name": "Todd Little", "description": "Fun Game", "private": true, "mod": "", "plugins": "OoT Online 1.0", "progress": 53, "icons": ""},
  {"id": 2, "name": "Kevin Brooks", "description": "Fun Game", "private": true, "mod": "", "plugins": "OoT Online 1.0", "progress": 56, "icons": ""},
  {"id": 2, "name": "Claudia Castro", "description": "Fun Game", "private": true, "mod": "", "plugins": "OoT Online 1.0", "progress": 1, "icons": ""},
  {"id": 2, "name": "Sue Stevens", "description": "Fun Game", "private": true, "mod": "", "plugins": "OoT Online 1.0", "progress": 45, "icons": ""},
  {"id": 2, "name": "Ivan Conner", "description": "Fun Game", "private": true, "mod": "", "plugins": "OoT Online 1.0", "progress": 23, "icons": ""},
  {"id": 2, "name": "Troy Welch", "description": "Fun Game", "private": true, "mod": "", "plugins": "OoT Online 1.0", "progress": 2, "icons": ""},
  {"id": 2, "name": "Todd Little", "description": "Fun Game", "private": true, "mod": "", "plugins": "OoT Online 1.0", "progress": 80, "icons": ""},
  {"id": 2, "name": "Todd Little", "description": "Fun Game", "private": true, "mod": "", "plugins": "OoT Online 1.0", "progress": 99, "icons": ""},
  {"id": 2, "name": "Todd Little", "description": "Fun Game", "private": true, "mod": "", "plugins": "OoT Online 1.0", "progress": 24, "icons": ""},
  {"id": 2, "name": "Todd Little", "description": "Fun Game", "private": true, "mod": "", "plugins": "OoT Online 1.0", "progress": 56, "icons": ""},
  {"id": 2, "name": "Todd Little", "description": "Fun Game", "private": true, "mod": "", "plugins": "OoT Online 1.0", "progress": 56, "icons": ""},
  {"id": 2, "name": "Todd Little", "description": "Fun Game", "private": true, "mod": "", "plugins": "OoT Online 1.0", "progress": 56, "icons": ""},
  {"id": 2, "name": "Todd Little", "description": "Fun Game", "private": true, "mod": "", "plugins": "OoT Online 1.0", "progress": 56, "icons": ""},
  {"id": 2, "name": "Todd Little", "description": "Fun Game", "private": true, "mod": "", "plugins": "OoT Online 1.0", "progress": 56, "icons": ""},
  {"id": 2, "name": "Todd Little", "description": "Fun Game", "private": true, "mod": "", "plugins": "OoT Online 1.0", "progress": 56, "icons": ""},
  {"id": 3, "name": "TEST-3", "description": "", "private": true, "mod": "", "plugins": "OoT Online 1.0", "progress": 40.0, "icons": ""}
];


$(window).on('load', function() {
  console.log("START ....");
  // bootbox.alert("Hello world!", function() {
  //     console.log("Alert Callback");
  // });
  table = new Tabulator("#example-table", {
    //height:"500px",
    height:450,
    layout:"fitColumns",
    data:data,
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
      // {title:"Task Progress", field:"progress", minWidth:80, align:"left", formatter:"progress", editor:true},
      {title:"Progress", field:"progress", sorter:"number", align:"left", formatter:"progress"  },
      {title:"Actions", field:"icons", formatter:printIcon, align:"center", cellClick:function(e, cell){alert("Printing row data for: " + cell.getRow().getData().name)}}
    ]
  });



  function customFilter(data, filterValue){
    if(typeof(filterValue) !== "string") {return true};

    return data.name.toLowerCase().includes(filterValue.toLowerCase()) || data.description.toLowerCase().includes(filterValue.toLowerCase());
  }

  function updateFilter(){
    table.setFilter(customFilter, $("#filter-value").val());
  }

  $("#filter-value").keyup(updateFilter);
});

function joinWindow(name, password){
  if(name !== undefined){

  }
  if(password !== undefined){

  }
  var dialog = bootbox.dialog({
    title: 'JOIN GAME',
    message: `
      <form>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Profile</label>
          <div class="col-sm-5">
            <select class="form-control">
              <option>TheCherry</option>
            </select>
          </div>
          <div class="col-sm-5">
            <button class="btn btn-sm btn-info"><span class="oi oi-pencil"></span> Edit</button>
          </div>
        </div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="room-name" value="test-room-01">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
          <div class="col-sm-5">
            <input type="password" class="form-control" id="password" placeholder="Password" value="1234">
          </div>
          <div class="col-sm-5">
            <button class="btn btn-warning"><span class="oi oi-eye"></span> Password</button>
          </div>
        </div>

      </form>
    `,
    buttons: {
        cancel: {
            label: "CANCEL",
            className: 'btn-danger',
            callback: function(){
                console.log('Custom cancel clicked');
            }
        },
        ok: {
            label: "START GAME",
            className: 'btn-success',
            callback: function(){
                console.log('Custom OK clicked');
            }
        }
    }
  });
}
