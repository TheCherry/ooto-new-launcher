class Report extends BaseDialog {
  constructor(data, callback=function(){}){
    super();
    this.html_file = "report.html";
    this.title = "REPORT";
    this.size = 'large';
    this.buttons = {
      ok: {
        label: "CLOSE",
        className: 'btn-success',
        callback: function(){
          // START GAME !
          callback({});
        }
      }
    }
    this.create(function(){
      // modify HTML
      // $("#room-name").val(hri.random());
      // $("#generate-name").click(function() {
      //   $("#room-name").val(hri.random());
      // });
    });
  }
}
global.dialogs.Report = Report;
