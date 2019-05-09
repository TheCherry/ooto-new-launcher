const logger = require(global.dirsrc + 'OotBizHawk')("UPDATE");

class OotUpdater{
  constructor() {
    logger.info("Init Updater");
  }
  check_update(){
    logger.info("Check for Update ...")
    var getJSON = require('get-json');
    try {
        getJSON('https://nexus.inpureprojects.info/OotOnline/update.json', function (error, response) {
            if (error) {
                logger.error("Failed to get info from update server!")
            } else {
                logger.debug("Server says: " + response.version)
                if (response.version !== VERSION) {
                    var download = require('download-file')
                    var url = response.url;
                    var options = {
                        directory: "./",
                        filename: "update.zip"
                    }
                    download(url, options, function (err) {
                        if (err) throw err
                        options.filename = "update.sig";
                        download(response.sig, options, function (err) {
                            if (err) throw err
                            if (fs.existsSync(process.cwd() + "/update.zip") && fs.existsSync(process.cwd() + "/update.sig")) {
                                let crypto = require('crypto');
                                let hasher = crypto.createHash('sha256');
                                let pathname = path.resolve("./update.zip");
                                let rs = fs.createReadStream(pathname);
                                let signature = fs.readFileSync("./update.sig", 'base64');
                                rs.on('data', data => hasher.update(data))
                                rs.on('end', () => {
                                    let digest = hasher.digest('hex');
                                    let publicKey = fs.readFileSync('./public_key.pem');
                                    let verifier = crypto.createVerify('RSA-SHA256');
                                    verifier.update(digest);
                                    let testSignature = verifier.verify(publicKey, signature, 'base64');
                                    if (testSignature) {
                                        app.relaunch({ args: process.argv.slice(1).concat(['--asar=updater.asar']) })
                                        app.exit()
                                    }
                                });
                            }
                        });
                    });
                }
            }
        });
    } catch (err) {
        if (err) {
            logger.log("Failed to get info from Hylian Modding!", "red")
        }
    }
  }
}
