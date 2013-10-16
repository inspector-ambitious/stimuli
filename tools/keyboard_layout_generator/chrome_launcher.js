'use strict';

var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;

var ChromeLauncher =  function() {

    return {

        startCmd: {
            linux: 'google-chrome',
            darwin: 'open',
            win32: process.env.ProgramFiles + '\\Mozilla Chrome\\chrome.exe'
        },

        startArgs: {
            linux: [],
            darwin: ['-n', '/Applications/Google Chrome.app','--args'],
            win32: []
        },

        start: function(url) {
            var env = process.env;
            this.tempDir = path.normalize((env.TMPDIR || env.TMP || env.TEMP || '/tmp') + '/brute-' + (new Date).getTime());
            fs.mkdirSync(this.tempDir);
            var args = this.startArgs[process.platform].concat([
                '--user-data-dir=' + this.tempDir,
                '--no-default-browser-check',
                '--no-first-run',
                '--disable-default-apps',
                '--disable-hang-monitor',
                url
            ]);
            this.process = spawn(this.startCmd[process.platform], args, function() {
                console.log(arguments);
            });
            return this;
        },

        kill: function() {
            var self = this;
            if (process.platform === 'darwin') {
                spawn('killall', ['-9', 'Google Chrome'], function() {
                    self.destroyTmpDir();
                });
            }
            if (process.platform === 'linux') {
                spawn('killall', ['-9', 'chrome'], function() {
                    self.destroyTmpDir();
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

module.exports = ChromeLauncher;
