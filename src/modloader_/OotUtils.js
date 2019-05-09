const path = require("path");
const fs = require("fs");

const rom_dir = path.join(global.dirname, '/rom/');
const rom_extensions = ["z64", "n64", "v64"];
const rom_regex_check = new RegExp(rom_extensions.join("|"));

function mkdir(dirname){
  base = global.dirname;
  dirname.split("/").forEach(item => {
    if(item !== ""){
      base += item + path.sep
      if (!fs.existsSync(base)) {
          fs.mkdirSync(base);
      }
    }
  });
}

function getRoms(){
  let roms_list = [];
  fs.readdirSync(rom_dir).forEach(file => {
      if (rom_regex_check.test(file)) {
          roms_list.push(path.join(rom_dir + file));
      }
  });
  return roms_list;
}
