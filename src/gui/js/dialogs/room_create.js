class RoomCreate extends BaseDialog {
  constructor(data, callback=function(){}){
    super();
    this.html_file = "room_create.html";
    this.title = "CREATE GAME";
    this.size = 'large';
    this.buttons = {
      cancel: {
        label: "CANCEL",
        className: 'btn-danger',
        callback: function(){
        }
      },
      ok: {
        label: "START GAME",
        className: 'btn-success',
        callback: function(){
          // START GAME !
          callback({});
        }
      }
    }
    this.create(function(){
      // modify HTML
      $("#room-name").val(hri.random());
      $("#generate-name").click(function() {
        $("#room-name").val(hri.random());
      });
    });
  }
}
global.dialogs.RoomCreate = RoomCreate;
