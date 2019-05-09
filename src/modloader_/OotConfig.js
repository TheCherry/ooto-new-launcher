/*
    OotModLoader - Adding networking functions and mod loading capability to Ocarina of Time.
    Copyright (C) 2019  Team Ooto

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
const path = require('path');
const hri = require('human-readable-ids').hri;
const crypto = require('crypto');
const fs = require("fs");
const logger = require(path.join(global.dirModloader + 'OotLogger'))("Config")

// if the structure changes, we set the version up and do some processes in #versionsUpgrade
const version = "0.2";

// Config
class Configuration {

    constructor() {
        let tmp_cfg = {};
        this._my_uuid = "";
        this.file = global.dirname + 'OotModLoader-config.json';
        this.cfg = {};
        if (fs.existsSync(this.file)) {
            this.cfg = JSON.parse(fs.readFileSync(this.file));
            versionsUpgrade();
        } else {
            this.cfg = JSON.parse(fs.readFileSync(global.dirSrc + 'OotModLoader-config.json.default'));
        }
    }

    versionsUpgrade(){
      if(!('version' in tmp_cfg))
        this.cfg.version = "0.1";
      if(this.cfg.version !== version){
        switch (this.cfg.version) {
          case "0.1":
            // we have to upgrade some things later here!
            // i will add server history as example
          case "0.2":
            // for future ...
        }
      }
    }

    setPluginDefaultValue(category, key, value) {
        if (!this._plugins.hasOwnProperty(category)) {
            this._plugins[category] = {};
        }
        if (!this._plugins[category].hasOwnProperty(key)) {
            this._plugins[category][key] = value;
        }
    }

    setPluginValue(category, key, value) {
        if (!this._plugins.hasOwnProperty(category)) {
            this._plugins[category] = {};
        }
        if (!this._plugins[category].hasOwnProperty(key)) {
            this._plugins[category][key] = value;
        }
        this._plugins[category][key] = value;
    }

    getPluginValue(category, key) {
        if (!this._plugins.hasOwnProperty(category)) {
            this._plugins[category] = {};
        }
        if (!this._plugins[category].hasOwnProperty(key)) {
            this._plugins[category][key] = "";
        }
        return this._plugins[category][key];
    }

    set master_server_udp(value) {
        this._master_server_udp = value;
    }

    get master_server_udp() {
        return this._master_server_udp;
    }

    get game_password() {
        return this._game_password;
    }

    set game_password(value) {
        this._game_password = value;
    }

    get my_uuid() {
        return this._my_uuid;
    }

    set my_uuid(value) {
        this._my_uuid = value;
    }

    get master_server_ip() {
        return this._master_server_ip;
    }

    set master_server_ip(value) {
        this._master_server_ip = value;
    }

    get master_server_port() {
        return this._master_server_port;
    }

    set master_server_port(value) {
        this._master_server_port = value;
    }

    get isMaster() {
        return this._isMaster;
    }

    set isMaster(value) {
        this._isMaster = value;
    }

    get isClient() {
        return this._isClient;
    }

    set isClient(value) {
        this._isClient = value;
    }

    get nickname() {
        return this._nickname;
    }

    set nickname(value) {
        this._nickname = value;
    }

    get GAME_ROOM() {
        return this._GAME_ROOM;
    }

    set GAME_ROOM(value) {
        this._GAME_ROOM = value;
    }

    get PatchFile() {
        return this._patchFile;
    }

    get TunicColors() {
        return this._tunic_colors;
    }

    getPasswordHash() {
        return crypto.createHash('md5').update(this.game_password).digest("hex");
    }

    save() {
        this.cfg.SERVER["master_server_ip"] = this._master_server_ip;
        this.cfg.SERVER["master_server_port"] = this._master_server_port;
        this.cfg.SERVER["isMaster"] = this._isMaster;
        this.cfg.CLIENT["isTracker"] = this._isTracker;
        this.cfg.CLIENT["isClient"] = this._isClient;
        this.cfg.CLIENT["nickname"] = this._nickname;
        this.cfg.CLIENT["game_room"] = this._GAME_ROOM;
        this.cfg.CLIENT["game_password"] = this._game_password;
        this.cfg.PLUGINS = this._plugins;
        this.cfg.CLIENT["ROM"] = this._rom;
        this.cfg.CLIENT["patchFile"] = this._patchFile;
        this.cfg.CLIENT["tunic_colors_enabled"] = this._tunic_colors_enabled;
        fs.writeFileSync(this.file, JSON.stringify(this.cfg, null, 2));
    }
}

module.exports = Configuration;
