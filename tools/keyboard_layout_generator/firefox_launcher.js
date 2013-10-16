'use strict';

var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;

var FirefoxLauncher =  function() {

    return {
        prefs: 'user_pref("browser.shell.checkDefaultBrowser", false);\n' +
               'user_pref("browser.bookmarks.restore_default_bookmarks", false);\n',
        startCmd: {
            linux: 'firefox',
            darwin: 'open',
            win32: process.env.ProgramFiles + '\\Mozilla Firefox\\firefox.exe'
        },

        startArgs: {
            linux: [],
            darwin: ['-n', '/Applications/Firefox.app','--args'],
            win32: []
        },

        start: function(url) {
            var env = process.env;

            this.tempDir = path.normalize((env.TMPDIR || env.TMP || env.TEMP || '/tmp') + '/brute-' + (new Date).getTime());
            fs.mkdirSync(this.tempDir);
            fs.createWriteStream(this.tempDir + '/prefs.js', {flags: 'a'}).write(this.prefs);
            this.process = spawn(this.startCmd[process.platform], this.startArgs[process.platform].concat([url, '-profile', this.tempDir, '-no-remote']), {
                detached: true
            });
            return this;
        },

        kill: function() {
            if (process.platform === 'darwin' || process.platform === 'linux') {
                spawn('killall', ['-9', 'firefox'], function() {
                    this.destroyTmpDir();
                });
            }

        },

        destroyTmpDir: function() {

            var destroyFolder = function(path) {
                var files = [];
                if(fs.existsSync(path)) {
                    files = fs.readdirSync(path);
                    files.forEach(function(file,index){
                        var curPath = path + "/" + file;
                        if(fs.statSync(curPath).isDirectory()) { // recurse
                            destroyFolder(curPath);
                        } else { // delete file
                            fs.unlinkSync(curPath);
                        }
                    });
                    fs.rmdirSync(path);
                }
            };

            destroyFolder(this.tempDir);
        }
    };

};

module.exports = FirefoxLauncher;
