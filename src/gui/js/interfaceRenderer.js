var ipcRenderer = require('electron').ipcRenderer;

// HOOK CONSOLE ...
original_console = window.console;
console = {
  log: function(msg){
    ipcRenderer.send("onLogMessage", msg, "log");
    original_console.log(msg);
  },
  debug: function(msg){
    ipcRenderer.send("onLogMessage", msg, "debug");
    original_console.debug(msg);
  },
  info: function(msg){
    ipcRenderer.send("onLogMessage", msg, "info");
    original_console.info(msg);
  },
  warn: function(msg){
    ipcRenderer.send("onLogMessage", msg, "warning");
    original_console.warn(msg);
  },
  error: function(msg){
    ipcRenderer.send("onLogMessage", msg, "error");
    original_console.error(msg);
  }
}
window.console = console;

function startGame(data){
  console.log("START GAME IPC-RENDERER")
  ipcRenderer.send('onStartGame', data);
}
