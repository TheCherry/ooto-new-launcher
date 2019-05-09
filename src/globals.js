// this is the base file
// we set all globals, for GUI and CLI

const path = require('path');
const process = require('process');

global.dirMain = process.cwd() + path.sep;
global.dirSrc = path.join(global.dirMain,  'src/');
global.dirModloader = path.join(global.dirSrc,  'modloader/');
// we have to load src dynamic later if its a compiled version!
// if release
// global.dirSrc = 'OotOnline.asar'

// const Configuration = require(path.join(global.dirSrc, 'modloader/OotConfig'));
const logger = require(path.join(global.dirSrc, 'modloader/OotLogger'));

// global.cfg = new Configuration();
