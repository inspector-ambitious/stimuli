'use strict';

var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;

var IELauncher =  function() {

    return {

        start: function(url) {
            spawn(process.env.ProgramFiles + '\\Internet Explorer\\iexplore.exe', [url]);
            return this;
        },

        kill: function() {
            spawn('C:\\windows\\system32\\taskkill.exe', ['/F', '/IM', 'iexplore.exe']);
        }

    };

};

module.exports = IELauncher;
