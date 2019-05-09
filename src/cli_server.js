const path = require('path');

const { app, BrowserWindow } = require('electron');

require("./globals");
console.log(global.dirname);

const client = require(global.dirModloader + 'OotClient')
const Master = require(global.dirModloader + 'OotMasterServer')
const Endpoint = require(global.dirModloader + 'OotEndpoint');

master = new Master()
master.setup();
lb.setup();
