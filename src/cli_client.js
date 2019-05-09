const path = require('path');

require("./globals");
console.log(global.dirname);

const modloader = require(global.dirModloader + 'OotModloader')
modloader.start()
modloader.startBizHawk()
