class RoomCreate extends BaseDialog {
  constructor(data, callback=function(){}){
    super();
    this.html_file = "room_create.html";
    this.title = "CREATE GAME";
    this.size = 'extra-large';
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
          startGame({
            room_name: "test-001",
            password: "1234"            
          });
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
      $("#btn-start-game").click(function(){

      });
    });
  }
}
global.dialogs.RoomCreate = RoomCreate;
