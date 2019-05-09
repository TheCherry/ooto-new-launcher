class RoomJoin extends BaseDialog {
  constructor(data, callback=function(){}){
    super();
    this.html_file = "room_join.html";
    this.title = "JOIN GAME";
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
      $("#room-name").val("HI !");
    });
  }
}
global.dialogs.RoomJoin = RoomJoin;
