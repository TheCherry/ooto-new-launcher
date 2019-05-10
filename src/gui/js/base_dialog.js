global.dialogs = {};

class BaseDialog{
  constructor(){

  }

  create(init=function(){}){
    this.size    = (this.size === undefined)    ? "small" : this.size;
    this.buttons = (this.buttons === undefined) ? {}      : this.buttons;
    $("#main-window").hide()
    $.get("views/dialogs/"+this.html_file, (function(data){
      this.dialog = bootbox.dialog({
        title: this.title,
        message: data,
        buttons: this.buttons,
        size: this.size
      });
      init();
    }).bind(this));

  }
}
$(document).on("hidden.bs.modal", ".bootbox.modal", function (e) {
  $("#main-window").show();
});
