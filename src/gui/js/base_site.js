global.sites = {};

class BaseSite{
  constructor(){
    this.first_load = true;
    if(this.constructor.name !== "BaseSite"){
      global.sites[this.constructor.name] = this;
    }
  }
  base_onload(){
    this.first_load = false;
    this.onload();
  }
  base_onenter(){
    console.log("Base onenter")
    if(this.first_load){
      this.base_onload();
    }
    this.onenter();
  }
}
