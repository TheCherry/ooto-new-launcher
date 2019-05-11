const { ipcMain } = require('electron');
const logger = require(global.global.dirModloader + 'OotLogger')("GUI");
const ootModLoader = require(global.global.dirModloader + 'OotModLoader');
let api = require(global.global.dirModloader + 'OotAPI');

ipcMain.on('onLogMessage', (event, msg, type) => {
  if(type === "log"){
    logger.log(msg);
  } else if (type === "debug") {
    logger.debug(msg);
  } else if (type === "info") {
    logger.info(msg);
  } else if (type === "warning") {
    logger.warn(msg);
  } else if (type === "error") {
    logger.error(msg);
  }
})

ipcMain.on('onStartGame', (event, data) => {
  console.info("Start Game");
  console.info(data);
  ootModLoader.start();
  console.info("==== MOD LOADER INITED ====");
  api.postEvent({ id: "GUI_StartButtonPressed", start: true, rom: "" });
});
