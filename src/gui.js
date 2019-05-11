const path = require('path');

const { app, BrowserWindow } = require('electron');

require("./globals");
require(global.dirGui + 'js/interfaceMain');


function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1200,
    height: 900,
    transparent: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  // win.loadFile('src/gui/index.html')
  win.loadURL(`file://${__dirname}/gui/index.html`);
}

// hier laden wir nun den modloader, pre-init

app.on('ready', createWindow);
