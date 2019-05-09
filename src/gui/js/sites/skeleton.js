class Skeleton extends BaseSite {
  constructor() {
    super();
    this.html_file = "file_on_dir_sites.html"
    //called by init
  }

  onload(){
    //called then the site gets first entered
  }

  onenter(){
    //called then the site gets entered
  }
}
new Skeleton();
