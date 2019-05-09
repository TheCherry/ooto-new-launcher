class Server extends BaseSite {
  constructor() {
    super();
    this.html_file = "server.html"
    //called by init
  }

  onload(){
    //called then the site gets first entered
  }

  onenter(){
    //called then the site gets entered
  }
}
new Server();
